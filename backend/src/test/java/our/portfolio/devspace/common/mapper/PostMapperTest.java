package our.portfolio.devspace.common.mapper;

import static org.assertj.core.api.Assertions.assertThat;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.BDDMockito.given;

import java.util.List;
import java.util.stream.Collectors;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import our.portfolio.devspace.domain.category.entity.Category;
import our.portfolio.devspace.domain.job.entity.Job;
import our.portfolio.devspace.domain.post.dto.CreatePostRequest;
import our.portfolio.devspace.domain.post.dto.CreatePostResponse;
import our.portfolio.devspace.domain.post.dto.PostPreviewResponse;
import our.portfolio.devspace.domain.post.entity.Hashtag;
import our.portfolio.devspace.domain.post.entity.Post;
import our.portfolio.devspace.domain.profile.entity.Profile;
import our.portfolio.devspace.utils.factory.CategoryFactory;
import our.portfolio.devspace.utils.factory.PostFactory;
import our.portfolio.devspace.utils.factory.ProfileFactory;

@ExtendWith(MockitoExtension.class)
class PostMapperTest {

    @Mock
    EntityMapper entityMapper;

    @Mock
    ProfileMapper profileMapper;

    @InjectMocks
    PostMapperImpl postMapper;

    @Test
    @DisplayName("게시글 Entity를 게시글 생성 응답 DTO로 매핑하여 반환한다.")
    public void toPostCreationResponseDto() throws IllegalAccessException {
        // ** Given **
        long postId = 1L;
        Post post = new PostFactory(postId).postEntity();

        // ** When **
        CreatePostResponse responseDto = postMapper.toCreatePostResponse(post);

        // ** Then **
        assertThat(responseDto.getId()).isEqualTo(1L);
    }

    @Test
    @DisplayName("게시글 생성 요청 DTO를 게시글 Entity로 매핑하여 반환한다.")
    public void toEntity() throws IllegalAccessException {
        // ** Given **
        Long userId = 1L;
        CreatePostRequest requestDto = new PostFactory().createPostRequest();
        Profile profile = new ProfileFactory(1L).profileEntity();
        Category category = new CategoryFactory(requestDto.getCategoryId()).categoryEntity();

        given(entityMapper.resolve(any(Number.class), any(Class.class))).willAnswer(invocation -> {
            Class<Object> classType = invocation.getArgument(1);
            if (classType.equals(Profile.class)) {
                return profile;
            }
            if (classType.equals(Category.class)) {
                return category;
            }
            return null;
        });

        // ** When **
        Post post = postMapper.toEntity(userId, requestDto);

        // ** Then **
        assertThat(post.getTitle()).isEqualTo(requestDto.getTitle());
        assertThat(post.getContent()).isEqualTo(requestDto.getContent());
        assertThat(post.getSecret()).isEqualTo(requestDto.getSecret());
        assertThat(post.getProfile()).isEqualTo(profile);
        assertThat(post.getHashtags()).allSatisfy(hashtag -> {
            assertThat(requestDto.getHashtags()).contains(hashtag.getName());
            assertThat(hashtag.getPost()).isEqualTo(post);
        });
    }

    @Test
    @DisplayName("Post List를 PostPreviewResponse List로 매핑하여 반환한다.")
    void toPostPreviewResponses() throws IllegalAccessException {
        // ** Given **
        List<Post> posts = PostFactory.postEntities(5);
        // ProfileMapper의 toSimpleProfileResponse(Profile)를 실행하면 Profile의 ID가 매핑된 SimpleProfileResponse를 반환한다.
        given(profileMapper.toSimpleProfileResponse(any(Profile.class)))
            .will(invocation -> {
                Profile profile = invocation.getArgument(0);
                return new ProfileFactory(profile.getId()).simpleProfileResponse();
            });

        // ** When **
        List<PostPreviewResponse> postPreviewResponses = postMapper.toPostPreviewResponses(posts);

        // ** Then **
        assertThat(postPreviewResponses)
            .usingRecursiveComparison()
            .ignoringFields("likeCount", "commentCount") // TODO 좋아요, 댓글 기능 구현 후 검증
            .withEqualsForFields((dto, entity) -> dto.equals(((Job) entity).getTitle()), "profile.job")
            .withEqualsForFields((dtos, entities) -> {
                List<String> hashtagNames = ((List<Hashtag>) entities).stream().map(Hashtag::getName).collect(Collectors.toList());
                return hashtagNames.containsAll((List<String>) dtos);
            }, "hashtags")
            .isEqualTo(posts);
    }
}