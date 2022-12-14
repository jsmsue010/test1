package our.portfolio.devspace.domain.post.controller;

import static com.epages.restdocs.apispec.MockMvcRestDocumentationWrapper.document;
import static com.epages.restdocs.apispec.ResourceDocumentation.parameterWithName;
import static com.epages.restdocs.apispec.ResourceDocumentation.resource;
import static com.epages.restdocs.apispec.Schema.schema;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.anyLong;
import static org.mockito.BDDMockito.given;
import static org.springframework.restdocs.mockmvc.RestDocumentationRequestBuilders.get;
import static org.springframework.restdocs.mockmvc.RestDocumentationRequestBuilders.post;
import static org.springframework.restdocs.payload.PayloadDocumentation.fieldWithPath;
import static org.springframework.security.test.web.servlet.request.SecurityMockMvcRequestPostProcessors.csrf;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.content;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import com.epages.restdocs.apispec.ConstrainedFields;
import com.epages.restdocs.apispec.FieldDescriptors;
import com.epages.restdocs.apispec.ResourceSnippetParameters;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.restdocs.AutoConfigureRestDocs;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.context.annotation.Import;
import org.springframework.http.MediaType;
import org.springframework.restdocs.payload.JsonFieldType;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.ResultActions;
import our.portfolio.devspace.common.dto.HttpResponseBody;
import our.portfolio.devspace.domain.post.dto.CreatePostRequest;
import our.portfolio.devspace.domain.post.dto.CreatePostResponse;
import our.portfolio.devspace.domain.post.dto.GetPostsQuery;
import our.portfolio.devspace.domain.post.dto.GetPostsQuery.PostFilter;
import our.portfolio.devspace.domain.post.dto.GetPostsQuery.PostSort;
import our.portfolio.devspace.domain.post.dto.GetPostsResponse;
import our.portfolio.devspace.domain.post.service.PostService;
import our.portfolio.devspace.domain.post.service.pagination.PostPaginationService;
import our.portfolio.devspace.domain.post.service.pagination.PostPaginationServiceFactory;
import our.portfolio.devspace.utils.CommonTestUtils;
import our.portfolio.devspace.utils.ControllerTestUtils;
import our.portfolio.devspace.utils.ControllerTestUtils.WebSecurityTestConfiguration;
import our.portfolio.devspace.utils.factory.PostFactory;

@AutoConfigureRestDocs
@WebMvcTest(PostController.class)
@Import(WebSecurityTestConfiguration.class)
class PostControllerTest {

    @Autowired
    MockMvc mockMvc;

    @MockBean
    PostService postService;

    @MockBean
    PostPaginationServiceFactory factory;

    @MockBean
    PostPaginationService service;

    @Test
    @DisplayName("????????? ?????? ????????? ???????????? HTTP status 201?????? ??????, ????????? ID??? ????????????.")
    @WithMockUser(username = "1")
    public void createPost() throws Exception {
        // ** Given **
        // Mock ????????? PostService??? createPost??? ???????????? requestDto??? ????????????.
        CreatePostResponse responseDto = new CreatePostResponse(1L);
        given(postService.createPost(anyLong(), any(CreatePostRequest.class))).willReturn(responseDto);

        // ** When **
        ResultActions resultActions = postCreationResultActions();

        // ** Then **
        // HTTP Status Code 201, ?????? ???????????? ResponseEntity??? ????????? ????????? ID??? ????????????.
        HttpResponseBody<CreatePostResponse> body = new HttpResponseBody<>("?????????????????????.", responseDto);
        resultActions.andExpectAll(
            status().isCreated(),
            content().json(CommonTestUtils.valueToString(body))
        );

        // ** API Docs **
        resultActions.andDo(
            document("???????????? ??????????????? ????????????", resource(ResourceSnippetParameters.builder()
                .summary("????????? ??????")
                .tag("Post")
                .requestSchema(schema("PostCreationRequest"))
                .requestHeaders(
                    ControllerTestUtils.authorizationHeader(),
                    ControllerTestUtils.contentTypeApplicationJsonHeader())
                .requestFields(postCreationDescriptors())
                .responseSchema(schema("PostCreationResponse"))
                .responseFields(ControllerTestUtils.fieldDescriptorsWithMessage(
                    new FieldDescriptors(fieldWithPath("id").description("????????? ????????? ID").type(JsonFieldType.NUMBER))))
                .build())));
    }

    @Test
    @DisplayName("????????? ?????? ????????? ???????????? HTTP status 200?????? ??????, ????????? ????????? ????????????.")
    public void getPostsShouldReturnResponseEntityWithGetPostsResponse() throws Exception {
        // ** Given **
        GetPostsQuery query = new GetPostsQuery();
        query.setSort(PostSort.RECENT);
        query.setFilter(PostFilter.NONE);

        GetPostsResponse responseDto = new PostFactory().getPostsResponse(query, 10);

        given(factory.getService(any(PostFilter.class))).willReturn(service);
        given(service.getPosts(any(GetPostsQuery.class))).willReturn(responseDto);

        // ** When **
        ResultActions resultActions = mockMvc.perform(
            get("/api/posts")
        );

        // ** Then **
        HttpResponseBody<GetPostsResponse> body = new HttpResponseBody<>("?????????????????????.", responseDto);
        resultActions.andExpectAll(
            status().isOk(),
            content().json(CommonTestUtils.valueToString(body))
        );

        // ** API Docs **
        resultActions.andDo(
            document("????????? ????????? ????????? ????????????.", resource(ResourceSnippetParameters.builder()
                .tag("Post")
                .requestSchema(schema("GetPostsQuery"))
                .requestParameters(
                    parameterWithName("sort").description("??????: recent").optional(),
                    parameterWithName("filter").description("??????: none").optional()
                )
                .responseSchema(schema("GetPostsResponse"))
                .responseFields(ControllerTestUtils.fieldDescriptorsWithMessage(
                        new FieldDescriptors(
                            fieldWithPath("count").description("????????? ???????????? ??????").type(JsonFieldType.NUMBER),
                            fieldWithPath("nextRequestUri").description("?????? ????????? ?????? URI").type(JsonFieldType.STRING),
                            fieldWithPath("posts").description("????????? ????????? ??????").type(JsonFieldType.ARRAY),
                            fieldWithPath("posts[].id").description("????????? ID").type(JsonFieldType.NUMBER),
                            fieldWithPath("posts[].profile").description("????????? ?????????").type(JsonFieldType.OBJECT),
                            fieldWithPath("posts[].profile.id").description("????????? ????????? ID").type(JsonFieldType.NUMBER),
                            fieldWithPath("posts[].profile.name").description("????????? ??????").type(JsonFieldType.STRING),
                            fieldWithPath("posts[].profile.job").description("????????? ??????").type(JsonFieldType.STRING),
                            fieldWithPath("posts[].profile.company").description("????????? ??????").type(JsonFieldType.STRING),
                            fieldWithPath("posts[].profile.image").description("????????? ????????? ?????????").type(JsonFieldType.STRING).optional(),
                            fieldWithPath("posts[].createdDate").description("????????? ????????????").type(JsonFieldType.STRING),
                            fieldWithPath("posts[].hashtags").description("????????? ????????????").type(JsonFieldType.ARRAY),
                            fieldWithPath("posts[].title").description("????????? ??????").type(JsonFieldType.STRING),
                            fieldWithPath("posts[].content").description("????????? ??????").type(JsonFieldType.STRING),
                            fieldWithPath("posts[].likeCount").description("????????? ????????? ???").type(JsonFieldType.NUMBER),
                            fieldWithPath("posts[].commentCount").description("????????? ?????? ???").type(JsonFieldType.NUMBER)
                        )
                    )
                )
                .build()
            ))
        );
    }

    private ResultActions postCreationResultActions() throws Exception {
        return mockMvc.perform(
            post("/api/posts")
                .content(CommonTestUtils.valueToString(new PostFactory(1L).createPostRequest()))
                .contentType(MediaType.APPLICATION_JSON)
                .header("Authorization", ControllerTestUtils.authorizationToken())
                .with(csrf())
        );
    }

    private FieldDescriptors postCreationDescriptors() {
        ConstrainedFields postCreationDtoField = new ConstrainedFields(CreatePostRequest.class);
        return new FieldDescriptors(
            postCreationDtoField.withPath("title").description("????????? ??????").type(JsonFieldType.STRING),
            postCreationDtoField.withPath("content").description("????????? ??????").type(JsonFieldType.STRING),
            postCreationDtoField.withPath("secret").description("?????? ?????? ??????").type(JsonFieldType.BOOLEAN),
            postCreationDtoField.withPath("hashtags").description("???????????? ??????").type(JsonFieldType.ARRAY),
            postCreationDtoField.withPath("categoryId").description("???????????? ID").type(JsonFieldType.NUMBER)
        );
    }
}