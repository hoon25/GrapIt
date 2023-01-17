package edu.oak.grapitspring.controller.Member;


import edu.oak.grapitspring.domain.Member;
import edu.oak.grapitspring.service.Member.MemberService;
import lombok.Builder;
import lombok.Data;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.http.HttpSession;

@RestController
@Slf4j
@RequiredArgsConstructor
public class MemberController {

    private final MemberService memberService;

    @GetMapping("/checksession")
    public ResponseEntity<LoginResponseDTO> checkSession(HttpSession session) {
        Member member = (Member) session.getAttribute("member");
        if (member == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }
        return ResponseEntity.ok().body(LoginResponseDTO.builder()
                .email(member.getEmail())
                .nickName(member.getNickName())
                .build());
    }

    @PostMapping("/login")
    public ResponseEntity<LoginResponseDTO> login(@RequestBody LoginRequestDTO request, HttpSession session) {
        Member member = memberService.login(request);

        session.setAttribute("member", member);

        return ResponseEntity.ok()
                .body(LoginResponseDTO.builder()
                        .email(member.getEmail())
                        .nickName(member.getNickName())
                        .build());
    }

    @GetMapping("/logout")
    public ResponseEntity logout(HttpSession session) {
        session.invalidate();
        return ResponseEntity.ok().build();
    }

    @PostMapping("/join")
    public ResponseEntity join(@RequestBody JoinRequestDTO request) {
        memberService.join(request);
        return ResponseEntity.ok().build();
    }


    @Data
    @Builder
    static class LoginResponseDTO {
        private String email;
        private String nickName;
    }

    @Data
    @Builder
    static class JoinResponseDTO {
        private String name;
    }

}
