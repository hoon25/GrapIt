package edu.oak.grapitspring.controller;

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

    private MemberType memberType;

    public Member toEntity() {
        return Member.builder().email(email).password(password).name(name).nickName(nickName).memberType(memberType).build();
    }

    @Builder
    public JoinRequestDTO(String email, String password, String name, String nickName, MemberType memberType) {
        this.email = email;
        this.password = password;
        this.name = name;
        this.nickName = nickName;
        this.memberType = memberType;
    }
}
