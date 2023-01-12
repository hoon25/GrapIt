package edu.oak.grapitspring.tutor;


import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequiredArgsConstructor
@Slf4j
public class TutorFindController {

    private final TutorFindService tutorFindService;

    @GetMapping("/tutorfind")
    public String tutorFind(@RequestBody TutorEntity tutorEntity) {
        System.out.println("TutorFindController.tutorFind");
        List<TutorEntity> findTutorList = tutorFindService.findTutor(tutorEntity.getGender(),
                tutorEntity.getGrade(), tutorEntity.getRanking());

        return "findTutorList";
    }
}
