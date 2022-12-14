package our.portfolio.devspace.domain.post.service;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import our.portfolio.devspace.common.mapper.PostMapper;
import our.portfolio.devspace.domain.post.dto.CreatePostRequest;
import our.portfolio.devspace.domain.post.dto.CreatePostResponse;
import our.portfolio.devspace.domain.post.entity.Post;
import our.portfolio.devspace.domain.post.repository.PostRepository;

@Service
@RequiredArgsConstructor
@Transactional
public class PostService {

    private final PostMapper postMapper;
    private final PostRepository postRepository;

    public CreatePostResponse createPost(Long userId, CreatePostRequest dto) {
        Post post = postMapper.toEntity(userId, dto);

        postRepository.save(post);
        post.setCurrentRankingAsLast();

        return postMapper.toCreatePostResponse(post);
    }
}
