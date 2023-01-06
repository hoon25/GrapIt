package edu.oak.grapitspring.user;


import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Repository;

import javax.annotation.PostConstruct;
import java.util.HashMap;
import java.util.Map;


@Repository
@Slf4j
public class MemoryUserRepository implements UserRepository {

    private Map<Long, UserEntity> userEntityMap;

    @PostConstruct
    private void init() {
        userEntityMap = new HashMap<>();
        // 테스트용 데이터
        userEntityMap.put(1L, UserEntity.builder()
                .userId(1L)
                .nickName("운영자")
                .email("jungle@naver.com")
                .build());
        userEntityMap.put(2L, UserEntity.builder()
                .userId(2L)
                .nickName("신종우 선생님")
                .email("tlswhddn@naver.com")
                .build());
        userEntityMap.put(3L, UserEntity.builder()
                .userId(3L)
                .nickName("이해인")
                .email("dlgodls@naver.com")
                .build());
        userEntityMap.put(4L, UserEntity.builder()
                .userId(4L)
                .nickName("김지수")
                .email("rlawltn@naver.com")
                .build());
    }

    @Override
    public UserEntity save(UserEntity userEntity) {
        userEntityMap.put(userEntity.getUserId(), userEntity);
        return userEntity;
    }

    @Override
    public UserEntity findByUserId(Long userId) {
        return userEntityMap.get(userId);
    }

    @Override
    public UserEntity findByEmail(String email) {
        return userEntityMap.values().stream()
                .filter(userEntity -> userEntity.getEmail().equals(email))
                .findAny()
                .orElse(null);
    }

    @Override
    public void delete(UserEntity userEntity) {
        userEntityMap.remove(userEntity.getUserId());
    }

}