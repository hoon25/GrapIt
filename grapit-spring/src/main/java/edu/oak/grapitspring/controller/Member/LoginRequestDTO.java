package edu.oak.grapitspring.controller.Member;

import edu.oak.grapitspring.domain.Member;
import lombok.*;

@Getter
@Setter
@ToString
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class LoginRequestDTO {
    private String email;
    private String password;

    @Builder
    public LoginRequestDTO(String email, String password) {
        this.email = email;
        this.password = password;
    }

    public Member toEntity() {
        return Member.builder().email(email).password(password).build();
    }

}
