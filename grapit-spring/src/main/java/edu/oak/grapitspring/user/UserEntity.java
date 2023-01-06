package edu.oak.grapitspring.user;

import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class UserEntity {

    private Long userId;

    private String nickName;

    private String email;

    private String passwd;

    private String provider;

    @Builder
    public UserEntity(Long userId, String nickName, String email, String passwd, String provider) {
        this.userId = userId;
        this.nickName = nickName;
        this.email = email;
        this.passwd = passwd;
        this.provider = provider;
    }
}


