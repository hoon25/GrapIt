package edu.oak.grapitspring.controller.Member;

import edu.oak.grapitspring.domain.Member;
import edu.oak.grapitspring.domain.MemberType;
import lombok.*;

@Getter
@Setter
@ToString
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class JoinRequestDTO {

    private String email;

    private String password;

    private String name;

    private String nickName;

    public Member toEntity() {
        return Member.builder().email(email).password(password).name(name).nickName(nickName).build();
    }

    @Builder
    public JoinRequestDTO(String email, String password, String name, String nickName) {
        this.email = email;
        this.password = password;
        this.name = name;
        this.nickName = nickName;
    }
}
