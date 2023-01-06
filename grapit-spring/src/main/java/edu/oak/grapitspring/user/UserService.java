package edu.oak.grapitspring.user;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

@Service
@Slf4j
@RequiredArgsConstructor
public class UserService {

    private final UserRepository userRepository;

    public void save(UserEntity userEntity) {
        userRepository.save(userEntity);
    }

    public UserEntity findByUserId(Long userId) {
        return userRepository.findByUserId(userId);
    }

    public UserEntity logIn(String email) {
        return userRepository.findByEmail(email);
    }

    public void delete(UserEntity userEntity) {
        userRepository.delete(userEntity);
    }

}
