package our.portfolio.devspace.utils.factory;

import static java.util.Comparator.comparingLong;
import static our.portfolio.devspace.utils.CommonTestUtils.setIdField;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Random;
import java.util.stream.Collectors;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import our.portfolio.devspace.domain.post.dto.CreatePostRequest;
import our.portfolio.devspace.domain.post.dto.GetPostsQuery;
import our.portfolio.devspace.domain.post.dto.GetPostsResponse;
import our.portfolio.devspace.domain.post.dto.PostPreviewResponse;
import our.portfolio.devspace.domain.post.entity.Hashtag;
import our.portfolio.devspace.domain.post.entity.Post;

@Setter
@Getter
@NoArgsConstructor
public class PostFactory {

    private Long id;
    private String title = "제목";
    private String content = "내용";
    private List<String> hashtags = List.of("태그1", "태그2", "태그3");
    private boolean secret = false;
    private CategoryFactory category = new CategoryFactory(1);
    private ProfileFactory profile = new ProfileFactory(1L);

    public PostFactory(Long id) {
        this.id = id;
    }

    public static List<Post> postEntities(int size) throws IllegalAccessException {
        List<Post> posts = new ArrayList<>();

        for (long i = 1; i <= size; i++) {
            PostFactory post = new PostFactory(i);
            post.setTitle(post.getTitle() + i);
            post.setContent(post.getContent() + i);
            post.setSecret(i % 2 != 0);
            post.setHashtags(List.of("태그" + i, "태그" + i + 1, "태그" + i + 2));
            post.setProfile(new ProfileFactory(i));
            posts.add(post.postEntity());
        }

        return posts;
    }

    public static List<PostPreviewResponse> postPreviewResponses(int size) {
        List<PostPreviewResponse> postPreviewResponses = new ArrayList<>();

        for (long i = 1; i <= size; i++) {
            PostFactory post = new PostFactory(i);
            post.setTitle(post.getTitle() + i);
            post.setContent(post.getContent() + i);
            post.setSecret(i % 2 != 0);
            post.setHashtags(List.of("태그" + i, "태그" + i + 1, "태그" + i + 2));
            post.setCategory(new CategoryFactory((int) i));
            post.setProfile(new ProfileFactory(i));
            postPreviewResponses.add(post.postPreviewResponse());
        }

        return postPreviewResponses;
    }

    public Post postEntity() throws IllegalAccessException {
        List<Hashtag> hashtags = this.hashtags.stream().map(Hashtag::new).collect(Collectors.toList());

        Post entity = Post.builder()
            .title(this.title)
            .content(this.content)
            .secret(this.secret)
            .category(this.category.categoryEntity())
            .profile(this.profile.profileEntity())
            .hashtags(hashtags)
            .build();

        if (this.id != null) {
            setIdField(entity, this.id);
        }

        return entity;
    }

    public CreatePostRequest createPostRequest() {
        return CreatePostRequest.builder()
            .title(this.title)
            .content(this.content)
            .secret(this.secret)
            .categoryId(this.category.getId())
            .hashtags(this.hashtags)
            .build();
    }

    public PostPreviewResponse postPreviewResponse() {
        return PostPreviewResponse.builder()
            .id(this.id)
            .title(this.title)
            .content(this.content)
            .createdDate(LocalDateTime.now())
            .hashtags(this.hashtags)
            .commentCount(new Random().nextInt(100))
            .likeCount(new Random().nextInt(100))
            .profile(this.profile.simpleProfileResponse())
            .build();
    }

    public GetPostsResponse getPostsResponse(GetPostsQuery query, int size) {
        List<PostPreviewResponse> postPreviewResponses = new ArrayList<>();

        for (int i = 1; i <= size; i++) {
            PostFactory post;

            if (query.getCursor() != null && query.getSortQueryString().contains("recent")) {
                post = new PostFactory(query.getCursor() - i);
            } else {
                post = new PostFactory((long) i);
            }

            post.setTitle(post.getTitle() + i);
            post.setContent(post.getContent() + i);
            post.setSecret(false);
            post.setHashtags(List.of("태그" + i, "태그" + i + 1, "태그" + i + 2));
            post.setCategory(new CategoryFactory(i));
            post.setProfile(new ProfileFactory((long) i));
            postPreviewResponses.add(post.postPreviewResponse());
        }

        if (query.getSortQueryString().contains("recent")) {
            postPreviewResponses.sort(comparingLong(PostPreviewResponse::getId).reversed());
        } else {
            postPreviewResponses.sort((v1, v2) -> {
                int likeDifference = v2.getLikeCount() - v1.getLikeCount();
                if (likeDifference != 0) {
                    return likeDifference;
                } else {
                    return v2.getCommentCount() - v1.getCommentCount();
                }
            });
        }

        return GetPostsResponse.builder()
            .posts(postPreviewResponses)
            .count(0L)
            .nextRequestUri(String.format("/api/posts?cursor=%d&%s", postPreviewResponses.get(postPreviewResponses.size() - 1).getId(), query.getSortQueryString()))
            .build();
    }
}
