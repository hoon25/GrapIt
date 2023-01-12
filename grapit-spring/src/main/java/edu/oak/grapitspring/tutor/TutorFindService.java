package edu.oak.grapitspring.tutor;


import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@Slf4j
@RequiredArgsConstructor
public class TutorFindService {
    private final TutorRepository tutorRepository;

    public void save(TutorEntity tutorEntity) {
        tutorRepository.insert(tutorEntity);
    }

    public Optional<TutorEntity> findByTutorId(Long tutorId) {
        return tutorRepository.findByTutorId(tutorId);
    }

    public List<TutorEntity> findTutor(genderType gender,
                                       gradeType grade,
                                       rankingType ranking) {
        System.out.println("TutorFindService.findByTutorGender");
        List<TutorEntity> findTutorList = tutorRepository.findTutor(gender, grade, ranking);
        log.info(findTutorList.toString());
        if (findTutorList.size() == 0) {
            System.out.println("원하는 선생님을 찾을 수 업습니다.");
        }

        return findTutorList;
    }

}
