package edu.oak.grapitspring.service;

import edu.oak.grapitspring.common.exception.DuplicateException;
import edu.oak.grapitspring.common.exception.LoginException;
import edu.oak.grapitspring.controller.JoinRequestDTO;
import edu.oak.grapitspring.controller.LoginRequestDTO;
import edu.oak.grapitspring.domain.Member;
import edu.oak.grapitspring.repository.MemberRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
@Slf4j
@RequiredArgsConstructor
public class MemberService {

    private final MemberRepository memberRepository;


    public Long join(JoinRequestDTO requestDTO) {
        Member requestMember = requestDTO.toEntity();
        Member member = Member.joinMember(requestMember.getEmail(), requestMember.getPassword(), requestMember.getName(), requestMember.getNickName(), requestMember.getMemberType());
        validateDuplicateJoinEmail(member);
        return memberRepository.insert(member);
    }

    public Member login(LoginRequestDTO requestDTO) {
        Optional<Member> member = memberRepository.findByEmail(requestDTO.getEmail());
        if (member.isEmpty()) {
            throw new LoginException("존재하지 않는 회원입니다.");
        }
        if (!member.get().getPassword().equals(requestDTO.getPassword())) {
            throw new LoginException("비밀번호가 틀립니다.");
        }
        return member.get();
    }

    // join member email 검증
    private void validateDuplicateJoinEmail(Member member) {
        Optional<Member> findMember = memberRepository.findByEmail(member.getEmail());
        if (findMember.isPresent()) {
            throw new DuplicateException("이미 존재하는 회원입니다.");
        }
    }

}