export const data1 = {
    "title": "자신에게 맞는 선생님을 찾으세요! ",
    "description": "학습 상태 분석중입니다~",
    "pages": [{
            "name": "page1",
            "elements": [{
                    "type": "radiogroup",
                    "name": "whatstudy",
                    "title": "어떤 공부가 필요 한가요?",
                    "showOtherItem": true,
                    "isRequired": true,
                    "choices": [
                        "내신 성적 올리기🏫",
                        "수능/모이고사 준비📝",
                        "선행학습 필요🏃‍♂️",
                        "공부습관 기르기📚",
                        "그래프 마스터 하기📈",

                    ],
                    "otherText": "잘 모르겠어요❓",
                    "colCount": 3
                },

            ]
        },
        {
            "name": "page2",
            "elements": [{
                "type": "text",
                "name": "grade",
                "title": "현재 학년을 입력해 주세요",
                "isRequired": true,

            }, ]
        },
        {
            "name": "page3",
            "elements": [{
                "type": "text",
                "name": "school",
                "title": "목표 대학을 입력해 주세요🎓",
                "isRequired": true,

            }, ]
        },
        {
            "name": "page4",
            "elements": [{
                "type": "text",
                "name": "subject",
                "title": "신청하고 싶은 과목을 입력해 주세요",
                "isRequired": true,

            }, ]
        },
        {
            "name": "page5",
            "elements": [{
                "type": "radiogroup",
                "name": "성적",
                "title": "현재 성적을 입력해 주세요",
                "showOtherItem": true,
                "isRequired": true,
                "choices": [
                    "상위권",
                    "중상위권",
                    "중위권",
                    "중하위권",

                ],
            }, ]
        },

        {
            "name": "page6",
            "elements": [{
                "type": "multipletext",
                "name": "contact_student",
                "title": "학생의 이름과 이메일을 적어주세요😀",
                "items": [{
                        "name": "Name"
                    },
                    {
                        "name": "E-mail",
                        "inputType": "email",
                        "validators": [{
                            "type": "email"
                        }]
                    }
                ]
            }]
        }
    ]
};