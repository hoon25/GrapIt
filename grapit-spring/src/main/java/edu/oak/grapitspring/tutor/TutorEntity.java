package edu.oak.grapitspring.tutor;

import lombok.*;

import javax.persistence.*;

@ToString
@Entity
@Getter
@Setter
@Table(name = "Tutor")
//@Data
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class TutorEntity {

    @Id
    @GeneratedValue
    private Long tutorId;
    private String nickName;
    private String email;
    private String passwd;
    @Enumerated(EnumType.STRING)
    private genderType gender;
    @Enumerated(EnumType.STRING)
    private gradeType grade;
    @Enumerated(EnumType.STRING)
    private rankingType ranking;

    @Enumerated(EnumType.STRING)
    private studyType study;

    @Builder
    public TutorEntity(Long tutorId, String nickName, String email, String passwd, genderType gender,
                       gradeType grade, rankingType ranking, studyType study) {
        this.tutorId = tutorId;
        this.nickName = nickName;
        this.email = email;
        this.passwd = passwd;
        this.gender = gender;
        this.grade = grade;
        this.ranking = ranking;
        this.study =study;
    }
}
