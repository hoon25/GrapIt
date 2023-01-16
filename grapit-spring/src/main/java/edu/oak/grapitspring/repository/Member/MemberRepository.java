package edu.oak.grapitspring.repository.Member;

import edu.oak.grapitspring.domain.Member;

import java.util.Optional;

public interface MemberRepository {

    Long insert(Member member);

    Optional<Member> findByMemberId(Long memberId);

    Optional<Member> findByEmail(String email);
}


