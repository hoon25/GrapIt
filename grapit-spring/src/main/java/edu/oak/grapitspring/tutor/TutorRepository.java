package edu.oak.grapitspring.tutor;

import java.util.List;
import java.util.Optional;

public interface TutorRepository {
    Long insert(TutorEntity tutorEntity);

    Optional<TutorEntity> findByTutorId(Long tutorId);

    List<TutorEntity> findTutor(genderType gender, gradeType grade, rankingType ranking);
}
