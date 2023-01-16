package edu.oak.grapitspring.repository.user;

import edu.oak.grapitspring.domain.user.User;

import java.util.Optional;

public interface UserRepository {
    Optional<User> findByEmail (String email);

    User insertUser(User user);
}
