package edu.oak.grapitspring.repository;

import edu.oak.grapitspring.domain.Member;
import edu.oak.grapitspring.domain.MemberType;
import edu.oak.grapitspring.repository.Member.MemberRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.web.WebAppConfiguration;

import javax.transaction.Transactional;

import static org.assertj.core.api.Assertions.assertThat;


@WebAppConfiguration
@SpringBootTest
class MemberRepositoryTest {

    @Autowired
    MemberRepository memberRepository;

    Member joinMember;

    @BeforeEach
    public void init() {
        joinMember = Member.joinMember("test@naver.com", "1234", "test", "test", MemberType.STUDENT);
    }

    @Test
    @Transactional
    public void insertMember_AutoIncrementId() {
        //given
        //when
        Long createMemberId = memberRepository.insert(joinMember);
        //then
        assertThat(createMemberId).isEqualTo(joinMember.getMemberId());
    }

    @Test
    @Transactional
    public void insertMember_Save() {
        //given
        //when
        Long createMemberId = memberRepository.insert(joinMember);
        //then
        assertThat(memberRepository.findByEmail(joinMember.getEmail()).get()).isEqualTo(joinMember);
    }
}