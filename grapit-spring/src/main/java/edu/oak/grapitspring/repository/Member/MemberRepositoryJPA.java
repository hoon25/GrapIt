package edu.oak.grapitspring.repository.Member;

import edu.oak.grapitspring.domain.Member;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;

import javax.persistence.EntityManager;
import javax.persistence.NoResultException;
import javax.transaction.Transactional;
import java.util.Optional;

@Repository
@RequiredArgsConstructor
@Transactional
public class MemberRepositoryJPA implements MemberRepository {

    private final EntityManager em;


    public Long insert(Member member) {
        em.persist(member);
        return member.getMemberId();
    }

    public Optional<Member> findByMemberId(Long memberId) {
        return Optional.ofNullable(em.find(Member.class, memberId));
    }

    public Optional<Member> findByEmail(String email) {

        try {
            return Optional.ofNullable(
                    em.createQuery("select m from Member m where m.email = :email", Member.class)
                            .setParameter("email", email)
                            .getSingleResult());
        } catch (NoResultException e) {
            return Optional.empty();
        }

    }


}
