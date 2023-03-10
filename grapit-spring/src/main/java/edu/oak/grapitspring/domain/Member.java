package edu.oak.grapitspring.domain;

import lombok.*;

import javax.persistence.*;

@Entity
@Table(name = "member")
@Getter
@Setter
@ToString
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class Member {

    @Id
    @GeneratedValue
    private Long memberId;

    private String email;

    private String password;

    private String name;

    private String nickName;

    @Enumerated(EnumType.STRING)
    private MemberType memberType;

    @Builder
    public Member(Long memberId, String email, String password, String name, String nickName, MemberType memberType) {
        this.memberId = memberId;
        this.email = email;
        this.password = password;
        this.name = name;
        this.nickName = nickName;
        this.memberType = memberType;
    }

    @Builder
    public static Member joinMember(String email, String password, String name, String nickName, MemberType memberType) {
        Member member = new Member();
        member.setEmail(email);
        member.setPassword(password);
        member.setName(name);
        member.setNickName(nickName);
        member.setMemberType(memberType);
        return member;
    }

}
