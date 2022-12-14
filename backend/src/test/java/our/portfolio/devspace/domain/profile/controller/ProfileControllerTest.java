package our.portfolio.devspace.domain.profile.controller;

import static com.epages.restdocs.apispec.MockMvcRestDocumentationWrapper.document;
import static com.epages.restdocs.apispec.ResourceDocumentation.resource;
import static com.epages.restdocs.apispec.Schema.schema;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.anyLong;
import static org.mockito.BDDMockito.given;
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
import org.springframework.http.MediaType;
import org.springframework.restdocs.payload.JsonFieldType;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.ResultActions;
import our.portfolio.devspace.common.dto.HttpResponseBody;
import our.portfolio.devspace.configuration.security.oauth.jwt.JwtTokenProvider;
import our.portfolio.devspace.domain.profile.dto.CreateProfileRequest;
import our.portfolio.devspace.domain.profile.dto.CreateProfileRequest.ReferenceLinkDto;
import our.portfolio.devspace.domain.profile.dto.CreateProfileResponse;
import our.portfolio.devspace.domain.profile.service.ProfileService;
import our.portfolio.devspace.utils.CommonTestUtils;
import our.portfolio.devspace.utils.ControllerTestUtils;
import our.portfolio.devspace.utils.factory.ProfileFactory;

@AutoConfigureRestDocs
@WebMvcTest(ProfileController.class)
class ProfileControllerTest {

    @MockBean
    private JwtTokenProvider tokenProvider;

    @Autowired
    private MockMvc mockMvc;

    @MockBean
    private ProfileService profileService;

    @Test
    @DisplayName("????????? ?????? ????????? ???????????? HTTP status 201??? ??????, ????????? ID??? ????????????.")
    @WithMockUser(username = "1")
    public void createProfile() throws Exception {
        // ** GIVEN **
        // Mock ????????? ProfileService??? createProfile??? ???????????? requestDto??? ????????????.
        CreateProfileResponse responseDto = new CreateProfileResponse(1L);
        given(profileService.createProfile(anyLong(), any(CreateProfileRequest.class))).willReturn(responseDto);

        // ** WHEN **
        ResultActions resultActions = profileCreationResultActions();

        // ** THEN **
        // HTTP Status Code 201, ?????? ???????????? ResponseEntity??? ????????? ????????? ????????? ????????????.
        HttpResponseBody<CreateProfileResponse> body = new HttpResponseBody<>("???????????? ?????????????????????.", responseDto);
        resultActions.andExpectAll(
            status().isCreated(),
            content().json(CommonTestUtils.valueToString(body)));

        // ** API Docs **
        resultActions.andDo(
            document("???????????? ??????????????? ????????????", resource(ResourceSnippetParameters.builder()
                .summary("????????? ??????")
                .tag("Profile")
                .requestSchema(schema("ProfileCreationRequest"))
                .requestHeaders(
                    ControllerTestUtils.authorizationHeader(),
                    ControllerTestUtils.contentTypeApplicationJsonHeader())
                .requestFields(profileCreationDescriptors())
                .responseSchema(schema("ProfileCreationResponse"))
                .responseFields(ControllerTestUtils.fieldDescriptorsWithMessage(
                    new FieldDescriptors(fieldWithPath("id").description("????????? ????????? ID").type(JsonFieldType.NUMBER)))
                )
                .build())));
    }

    private ResultActions profileCreationResultActions() throws Exception {
        return mockMvc.perform(
            post("/api/profiles")
                .content(CommonTestUtils.valueToString(new ProfileFactory(1L).createProfileRequest()))
                .contentType(MediaType.APPLICATION_JSON)
                .header("Authorization", ControllerTestUtils.authorizationToken())
                .with(csrf()));
    }

    private FieldDescriptors profileCreationDescriptors() {
        ConstrainedFields profileConstrainedFields = new ConstrainedFields(CreateProfileRequest.class);
        ConstrainedFields linkConstrainedFields = new ConstrainedFields(ReferenceLinkDto.class);

        return new FieldDescriptors(
            profileConstrainedFields.withPath("name").description("????????? ??????").type(JsonFieldType.STRING),
            profileConstrainedFields.withPath("introduction").description("?????? ??????").type(JsonFieldType.STRING),
            profileConstrainedFields.withPath("jobId").description("?????? ID").type(JsonFieldType.NUMBER),
            profileConstrainedFields.withPath("company").description("?????????").type(JsonFieldType.STRING).optional(),
            profileConstrainedFields.withPath("career").description("?????? ??????").type(JsonFieldType.STRING).optional(),
            profileConstrainedFields.withPath("referenceLinks[]").description("?????? ??????").type(JsonFieldType.ARRAY).optional(),
            linkConstrainedFields.withPath("referenceLinks[].title").description("?????? ??????").type(JsonFieldType.STRING),
            linkConstrainedFields.withPath("referenceLinks[].url").description("?????? URL").type(JsonFieldType.STRING)
        );
    }
}