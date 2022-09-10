package our.portfolio.devspace.domain.post.repository;

import static org.assertj.core.api.Assertions.assertThat;

import java.util.Comparator;
import java.util.List;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.data.domain.Sort;
import our.portfolio.devspace.domain.job.repository.JobRepository;
import our.portfolio.devspace.domain.post.entity.Post;
import our.portfolio.devspace.domain.user.repository.UserRepository;

@DataJpaTest
class PostRepositoryTest {

    @Autowired
    UserRepository userRepository;

    @Autowired
    JobRepository jobRepository;

    @Autowired
    PostRepository postRepository;

    @Test
    @DisplayName("포스팅의 PK가 id보다 작고 secret이 false인 포스팅을 PK 내림차순으로 20개 찾는다.")
    void findFirst20ByIdLessThan() {
        // ** Given **
        Long id = 50L;
        Sort sort = Sort.by("id").descending();

        // ** When **
        List<Post> posts = postRepository.findFirst20ByIdLessThanAndSecret(id, false, sort);

        // ** Then **
        assertThat(posts.size()).isEqualTo(20);
        assertThat(posts.get(0).getId()).isLessThan(id);
        assertThat(posts).allMatch(post -> !post.getSecret());
        assertThat(posts).isSortedAccordingTo(Comparator.comparingLong(Post::getId).reversed());
    }
}