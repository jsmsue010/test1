package our.portfolio.devspace.domain.profile.controller;

import java.security.Principal;
import javax.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import our.portfolio.devspace.common.dto.HttpResponseBody;
import our.portfolio.devspace.domain.profile.dto.CreateProfileRequest;
import our.portfolio.devspace.domain.profile.dto.CreateProfileResponse;
import our.portfolio.devspace.domain.profile.service.ProfileService;

@RequiredArgsConstructor
@RestController
public class ProfileController {

    private final ProfileService profileService;

    @PostMapping(value = "/api/profiles")
    public ResponseEntity<HttpResponseBody<CreateProfileResponse>> createProfile(@RequestBody @Valid CreateProfileRequest requestDto, Principal userPrincipal) {
        CreateProfileResponse responseDto = profileService.createProfile(Long.parseLong(userPrincipal.getName()), requestDto);

        // HTTP Status Code: 201 Created, Response Body: { message, data: CreateProfileResponse}
        HttpResponseBody<CreateProfileResponse> body = new HttpResponseBody<>("프로필이 저장되었습니다.", responseDto);
        return new ResponseEntity<>(body, HttpStatus.CREATED);
    }
}
