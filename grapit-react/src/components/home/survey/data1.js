// export const data1 = {
//     "title": "자신에게 맞는 선생님을 고르세요",
//     "pages": [{
//             "name": "page1",
//             "elements": [{
//                     "type": "radiogroup",
//                     "name": "customer_role",
//                     "title": "What best describes your role?",
//                     "showOtherItem": true,
//                     "choices": [
//                         "Engineering Lead",
//                         "Project Manager",
//                         "Software Developer",
//                         "Designer",
//                         "Product Manager",
//                         "CEO / Founder",
//                         "Customer Support"
//                     ],
//                     "otherText": "Other",
//                     "colCount": 3
//                 },
//                 {
//                     "type": "radiogroup",
//                     "name": "start_using",
//                     "title": "How did you start using the product?",
//                     "choices": [{
//                             "value": "created",
//                             "text": "I created my account"
//                         },
//                         {
//                             "value": "invited",
//                             "text": "I was invited to an account"
//                         }
//                     ]
//                 },
//                 {
//                     "type": "radiogroup",
//                     "name": "product_discovering",
//                     "title": "How did you first discover the product? ",
//                     "showOtherItem": true,
//                     "choices": [
//                         "Friend or colleague",
//                         "Search engine",
//                         "Facebook",
//                         "Twitter",
//                         "Blog"
//                     ],
//                     "otherText": "Other",
//                     "colCount": 3
//                 },
//                 {
//                     "type": "radiogroup",
//                     "name": "paid_customer",
//                     "title": "Do you currently pay for the product? ",
//                     "isRequired": true,
//                     "choices": [
//                         "Yes",
//                         "No"
//                     ]
//                 }
//             ]
//         },
//         {
// "name": "page2",
// "elements": [{
//         "type": "radiogroup",
//         "name": "product_fit",
//         "title": "How would you feel if you could no longer use the product?",
//         "isRequired": true,
//         "choices": [{
//                 "value": "3",
//                 "text": "Very disappointed"
//             },
//             {
//                 "value": "2",
//                 "text": "Somewhat disappointed"
//             },
//             {
//                 "value": "1",
//                 "text": "Not disappointed"
//                         }
//                     ]
//                 },
//                 {
//                     "type": "comment",
//                     "name": "product_fit_comment",
//                     "visibleIf": "{product_fit} notempty",
//                     "title": "Please help us understand why you selected the answer above"
//                 }
//             ]
//         },
//         {
//             "name": "page3",
//             "elements": [{
//                     "type": "radiogroup",
//                     "name": "product_alternative",
//                     "title": "What would you use as an alternative if [the product] were no\nlonger available?",
//                     "showOtherItem": true,
//                     "choices": [
//                         "Alternative 1",
//                         "Alternative 2",
//                         "Alternative 3",
//                         "Alternative 4",
//                         "Alternative 5",
//                         "Alternative 6"
//                     ],
//                     "otherText": "Other (please name)",
//                     "colCount": 3
//                 },
//                 {
//                     "type": "radiogroup",
//                     "name": "product_benefit",
//                     "title": "What is the primary benefit that you have received from the\nproduct?",
//                     "showOtherItem": true,
//                     "choices": [
//                         "Benefit 1",
//                         "Benefit 2",
//                         "Benefit 3",
//                         "Benefit 4",
//                         "Benefit 5",
//                         "Benefit 6"
//                     ],
//                     "colCount": 3
//                 },
//                 {
//                     "type": "radiogroup",
//                     "name": "product_recommend",
//                     "title": "Have you recommended the product to anyone?",
//                     "choices": [
//                         "Yes",
//                         "No"
//                     ]
//                 }
//             ]
//         },
//         {
//             "name": "page4",
//             "elements": [{
//                     "type": "rating",
//                     "name": "nps_score",
//                     "title": "How likely are you to recommend the product to a friend or\ncolleague? ",
//                     "isRequired": true,
//                     "rateMin": 0,
//                     "rateMax": 10,
//                     "minRateDescription": "Most unlikely",
//                     "maxRateDescription": "Most likely"
//                 },
//                 {
//                     "type": "radiogroup",
//                     "name": "favorite_functionality",
//                     "title": "What's your favorite functionality / add-on for the product?",
//                     "showOtherItem": true,
//                     "choices": [
//                         "Feature 1",
//                         "Feature 2",
//                         "Feature 3",
//                         "Feature 4",
//                         "Feature 5",
//                         "Feature 6"
//                     ],
//                     "colCount": 3
//                 },
//                 {
//                     "type": "comment",
//                     "name": "product_improvement",
//                     "title": "How could the product be improved to better meet your\nneeds?"
//                 }
//             ]
//         },
//         {
//             "name": "page5",
//             "elements": [{
//                 "type": "multipletext",
//                 "name": "contact_customer",
//                 "title": "Want us to follow-up? Leave your name and email here:",
//                 "items": [{
//                         "name": "Name"
//                     },
//                     {
//                         "name": "E-mail",
//                         "inputType": "email",
//                         "validators": [{
//                             "type": "email"
//                         }]
//                     }
//                 ]
//             }]
//         }
//     ]
// };
export const data1 = {
    "title": "자신에게 맞는 선생님을 찾으세요! ",
    "description": "학습 상태 분석중입니다~",
    "pages": [{
            "name": "page1",
            "elements": [{
                    "type": "radiogroup",
                    "name": "study",
                    "title": "어떤 공부가 필요 한가요?",
                    "isRequired": true,
                    "choices": [{
                            "value": "GRADES",
                            "text": "내신 성적 올리기🏫"
                        },
                        {
                            "value": "SAT",
                            "text": "수능/모이고사 준비📝"
                        },
                        {
                            "value": "PRECEDING",
                            "text": "선행학습 필요🏃‍♂️"
                        },
                        {
                            "value": "HABIT",
                            "text": "공부습관 기르기📚"
                        },
                        {
                            "value": "GRAPH",
                            "text": "그래프 마스터 하기📈"
                        },

                        {
                            "value": "OTHER",
                            "otherText": "잘 모르겠어요❓"
                        },
                    ],

                },

            ]
        },
        {
            "name": "page2",
            "elements": [{
                "type": "radiogroup",
                "name": "grade",
                "title": "현재 학년을 입력해 주세요",
                "isRequired": true,
                "choices": [{
                        "value": "MIDDLE_1",
                        "text": "중1"
                    },
                    {
                        "value": "MIDDLE_2",
                        "text": "중2"
                    },
                    {
                        "value": "MIDDLE_3",
                        "text": "중3"
                    },


                ],
            }, ]
        },


        {
            "name": "page3",
            "elements": [{
                "type": "radiogroup",
                "name": "ranking",
                "title": "현재 성적을 입력해 주세요",

                "isRequired": true,
                "choices": [{
                        "value": "RANKING_D",
                        "text": "상위권"
                    },
                    {
                        "value": "RANKING_C",
                        "text": "중위권"
                    },
                    {
                        "value": "RANKING_B",
                        "text": "중하위권"
                    },
                    {
                        "value": "RANKING_A",
                        "text": "하위권"
                    },


                ],
            }, ]
        },
        {
            "name": "page4",
            "elements": [{
                "type": "radiogroup",
                "name": "gender",
                "title": "원하는 선생님의 성별을 선택해 주세요",

                "isRequired": true,
                "choices": [{
                        "value": "MAN",
                        "text": "남자 선생님🙋‍♂️"
                    },
                    {
                        "value": "WOMAN",
                        "text": "여자 선생님🙋‍♀️"
                    },
                    {
                        "value": "BOTH",
                        "text": "성별 상관 없음😀"
                    },

                ],
            }, ]
        },


    ]
};