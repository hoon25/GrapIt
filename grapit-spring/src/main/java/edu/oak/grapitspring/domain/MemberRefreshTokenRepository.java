package edu.oak.grapitspring.domain;


public interface MemberRefreshTokenRepository {

    MemberRefreshToken insertToken(MemberRefreshToken memberRefreshToken);

    MemberRefreshToken findByEmailId(String email);

    MemberRefreshToken findByEmailIdAndRefreshToken(String email, String refreshToken);
}
