package edu.oak.grapitspring.tutor;


import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Repository;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.persistence.TypedQuery;
import java.util.List;
import java.util.Optional;

@Repository
@RequiredArgsConstructor
@Slf4j
public class MemoryTutorRepository implements TutorRepository {


    @PersistenceContext
    private final EntityManager em;

    @Override
    public Long insert(TutorEntity tutorEntity) {
        em.persist(tutorEntity);
        return tutorEntity.getTutorId();
    }

    @Override
    public Optional<TutorEntity> findByTutorId(Long tutorId) {
        return Optional.ofNullable(em.find(TutorEntity.class, tutorId));
    }

    @Override
    public List<TutorEntity> findTutor(genderType gender, gradeType grade, rankingType ranking) {

        String queryString = "select t from TutorEntity as t where t.grade = :grade and t.ranking = :ranking";
        if (!gender.equals(genderType.BOTH)) {
            queryString += " and t.gender = :gender";
        }
        TypedQuery<TutorEntity> query = em.createQuery(queryString, TutorEntity.class);
        query.setParameter("grade", grade);
        query.setParameter("ranking", ranking);
        if (!gender.equals(genderType.BOTH)) {
            query.setParameter("gender", gender);
        }
        return query.getResultList();

    }
}
