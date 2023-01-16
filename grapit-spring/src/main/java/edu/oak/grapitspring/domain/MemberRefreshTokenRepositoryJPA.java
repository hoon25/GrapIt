package edu.oak.grapitspring.domain;


import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;

import javax.persistence.EntityManager;

@Repository
@RequiredArgsConstructor
public class MemberRefreshTokenRepositoryJPA implements MemberRefreshTokenRepository {

    private final EntityManager em;

    public MemberRefreshToken findByEmailId(String email) {
        return em.createQuery("select t from MemberRefreshToken t where t.email =:email", MemberRefreshToken.class)
                .setParameter("email", email)
                .getSingleResult();
    }

    public MemberRefreshToken findByEmailIdAndRefreshToken(String email, String refreshToken) {
        return em.createQuery("select m from MemberRefreshToken m where m.email =:email and m.refreshToken =:refreshToken", MemberRefreshToken.class)
                .setParameter("email", email)
                .setParameter("refreshToken", refreshToken)
                .getSingleResult();
    }

    public MemberRefreshToken insertToken(MemberRefreshToken memberRefreshToken) {
        em.persist(memberRefreshToken);
        return memberRefreshToken;
    }

}
