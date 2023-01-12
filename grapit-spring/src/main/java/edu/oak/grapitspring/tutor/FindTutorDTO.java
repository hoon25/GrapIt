package edu.oak.grapitspring.tutor;

import lombok.*;

@Getter
@Setter
@ToString
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class FindTutorDTO {
    private genderType gender;
    private gradeType grade;
    private rankingType ranking;

    @Builder
    public FindTutorDTO(genderType gender, gradeType grade, rankingType ranking) {
        this.gender = gender;
        this.grade = grade;
        this.ranking = ranking;
    }

    public TutorEntity toEntity() {
        return TutorEntity.builder()
                .gender(gender)
                .grade(grade)
                .ranking(ranking)
                .build();
    }


}
