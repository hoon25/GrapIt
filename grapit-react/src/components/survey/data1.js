export const data1 = {
  title: '자신에게 맞는 선생님을 찾으세요! ',
  description: '학습 상태 분석중입니다~',
  pages: [
    {
      name: 'page1',
      elements: [
        {
          type: 'radiogroup',
          name: 'study',
          title: '어떤 공부가 필요 한가요?',
          isRequired: true,
          choices: [
            {
              value: 'GRADES',
              text: '내신 성적 올리기🏫',
            },
            {
              value: 'SAT',
              text: '수능/모이고사 준비📝',
            },
            {
              value: 'PRECEDING',
              text: '선행학습 필요🏃‍♂️',
            },
            {
              value: 'HABIT',
              text: '공부습관 기르기📚',
            },
            {
              value: 'GRAPH',
              text: '그래프 마스터 하기📈',
            },

            {
              value: 'OTHER',
              otherText: '잘 모르겠어요❓',
            },
          ],
        },
      ],
    },
    {
      name: 'page2',
      elements: [
        {
          type: 'radiogroup',
          name: 'grade',
          title: '현재 학년을 입력해 주세요',
          isRequired: true,
          choices: [
            {
              value: 'MIDDLE_1',
              text: '중1',
            },
            {
              value: 'MIDDLE_2',
              text: '중2',
            },
            {
              value: 'MIDDLE_3',
              text: '중3',
            },
          ],
        },
      ],
    },

    {
      name: 'page3',
      elements: [
        {
          type: 'radiogroup',
          name: 'ranking',
          title: '현재 성적을 입력해 주세요',

          isRequired: true,
          choices: [
            {
              value: 'RANKING_D',
              text: '상위권',
            },
            {
              value: 'RANKING_C',
              text: '중위권',
            },
            {
              value: 'RANKING_B',
              text: '중하위권',
            },
            {
              value: 'RANKING_A',
              text: '하위권',
            },
          ],
        },
      ],
    },
    {
      name: 'page4',
      elements: [
        {
          type: 'radiogroup',
          name: 'gender',
          title: '원하는 선생님의 성별을 선택해 주세요',

          isRequired: true,
          choices: [
            {
              value: 'MAN',
              text: '남자 선생님🙋‍♂️',
            },
            {
              value: 'WOMAN',
              text: '여자 선생님🙋‍♀️',
            },
            {
              value: 'BOTH',
              text: '성별 상관 없음😀',
            },
          ],
        },
      ],
    },
  ],
};
