package edu.oak.grapitspring.service;

import edu.oak.grapitspring.common.exception.LoginException;
import edu.oak.grapitspring.controller.LoginRequestDTO;
import edu.oak.grapitspring.domain.Member;
import edu.oak.grapitspring.repository.MemberRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.Optional;

import static org.assertj.core.api.Assertions.assertThat;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.BDDMockito.given;

@ExtendWith(MockitoExtension.class)
class MemberServiceTest {

    LoginRequestDTO loginRequestDTO;
    @Mock
    private MemberRepository memberRepository;
    @InjectMocks
    private MemberService memberService;

    @BeforeEach
    void init() {
        loginRequestDTO = LoginRequestDTO.builder()
                .email("hoon25@naver.com").password("1234")
                .build();
    }


    @Test
    void login_AllMatch_Success() {
        //given
        given(memberRepository.findByEmail(any())).willReturn(Optional.of(loginRequestDTO.toEntity()));
        //when
        Member loginMember = memberService.login(loginRequestDTO);
        //then
        assertThat(loginMember.getEmail()).isEqualTo(loginRequestDTO.getEmail());
    }

    @Test
    void login_MissEmail_Fail() {
        //given
        given(memberRepository.findByEmail(any())).willReturn(Optional.empty());
        //when
        //then
        assertThrows(LoginException.class, () -> memberService.login(loginRequestDTO));
    }

    @Test
    void login_MissPassword_Fail() {
        //given
        Optional<Member> wrongPasswordMember = Optional.of(loginRequestDTO.toEntity());
        wrongPasswordMember.get().setPassword("wrongPWD");
        given(memberRepository.findByEmail(any())).willReturn(wrongPasswordMember);
        //when
        //then
        assertThrows(LoginException.class, () -> memberService.login(loginRequestDTO));
    }


}