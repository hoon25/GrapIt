package edu.oak.grapitspring.repository.user;

import edu.oak.grapitspring.domain.user.User;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;

import javax.persistence.EntityManager;
import javax.persistence.NoResultException;
import java.util.Optional;

@Repository
@RequiredArgsConstructor
public class UserRepositoryJPA implements UserRepository{

    private final EntityManager em;

    public User insertUser(User user){
        em.persist(user);
        return user;
    }

    public Optional<User> findByEmail (String email){
        try{
            return Optional.ofNullable(em.createQuery("select u from User u where u.email =:email", User.class)
                    .setParameter("email", email)
                    .getSingleResult());
        }catch (NoResultException e){
            return Optional.empty();
        }
    }
}
