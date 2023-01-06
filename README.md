# GrapIt

>  중등 수학 교육 플랫폼

## 🚀프로젝트 사용기술

### BackEnd

SpringBoot

### FrontEnd

React

### Infra

Docker

## 🚀프로젝트 구조



## 🚀프로젝트 주요 관심사

- 대용량 트래픽 상황에서 서버 성능개선을 위해 노력
- 클린코드를 위한 꾸준한 코드 리팩토링
- 객체지향적 개념을 이해하고 코드에 녹여내기 위한 의미있는 설계



## 🍀 GIT 요약

☘️[상세 설명](https://github.com/hoon25/GrapIt/wiki/GIT-%EC%83%81%EC%84%B8-%EC%A0%84%EB%9E%B5)

### ☘️Branch명 전략

**GitLab-Flow**

- Feature
  - `feature/#issue_number`
- Development
  - `develop`
- Master
  - `master`

### ☘️commit 규칙

`[#issue_number] ** : commit_head`

```
feat : 새로운 기능에 대한 커밋
fix : 버그 수정에 대한 커밋
build : 빌드 관련 파일 수정에 대한 커밋
chore : 그 외 자잘한 수정에 대한 커밋
ci : CI관련 설정 수정에 대한 커밋
docs : 문서 수정에 대한 커밋
style : 코드 스타일 혹은 포맷 등에 관한 커밋
refactor :  코드 리팩토링에 대한 커밋
test : 테스트 코드 수정에 대한 커밋
```

### ☘️PR 규칙

- 신규개발 - feature/#issue_number 생성 후 PR
- 라벨링
  - `In Progress` - 개발 진행중
  - `Asking for Review` - 코드리뷰 필요
  - `refactoring` - 리뷰 후 리팩토링 필요

- 리뷰어 중 1명 이상의 `Approve` 를 받아야 `Merge pull request` 가능
- `commit` 을 할 때마다 Jenkins CI가 자동으로 실행되며 단위테스트, 통합테스트에 모두 통과되어야 `Merge pull request`가능

