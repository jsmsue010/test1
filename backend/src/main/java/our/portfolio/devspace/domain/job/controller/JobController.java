package our.portfolio.devspace.domain.job.controller;

import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;
import our.portfolio.devspace.common.dto.HttpResponseBody;
import our.portfolio.devspace.domain.job.dto.JobResponse;
import our.portfolio.devspace.domain.job.entity.JobType;
import our.portfolio.devspace.domain.job.service.JobService;

@RequiredArgsConstructor
@RestController
public class JobController {

    private final JobService jobService;

    /**
     * 직군 타입으로 직군 목록을 요청하면 해당하는 직군 목록을 반환한다.
     *
     * @param type {@link JobType} 찾는 직군의 타입
     * @return 결과 메시지와 {@link JobResponse}의 List를 담은 {@link HttpResponseBody}, Status 200 OK
     */
    @GetMapping("/api/jobs/{type}")
    public ResponseEntity<HttpResponseBody<List<JobResponse>>> listJobs(@PathVariable JobType type) {
        HttpResponseBody<List<JobResponse>> body = new HttpResponseBody<>("직군 목록이 조회되었습니다.", jobService.listJobs(type));
        return ResponseEntity.status(HttpStatus.OK).body(body);
    }
}
