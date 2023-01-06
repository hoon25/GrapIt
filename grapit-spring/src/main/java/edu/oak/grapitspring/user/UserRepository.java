package edu.oak.grapitspring.user;


public interface UserRepository {

    UserEntity findByUserId(Long userId);

    UserEntity findByEmail(String email);

    UserEntity save(UserEntity userEntity);

    void delete(UserEntity userEntity);

}
