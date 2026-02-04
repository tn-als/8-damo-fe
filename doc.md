# 마이페이지 – ProfileCard 설계 문서

## 1. 목적과 범위

### 1.1 목적

* 마이페이지 상단에 **사용자의 기본 정보를 요약해서 보여주는 ProfileCard UI**를 구현한다.
* 사용자는 자신의 **프로필 이미지, 닉네임, 성별, 연령대**를 한 눈에 확인할 수 있어야 한다.

### 1.2 범위 (이번 설계에서 다루는 것)

* 마이페이지 전체가 아닌 **ProfileCard 컴포넌트만** 설계
* 기본 정보 조회 API 연동
* UI에 데이터 매핑 규칙 정의

### 1.3 범위에서 제외

* 푸시 알림, 회원정보 수정, 로그아웃, 탈퇴 등 하위 메뉴
* 프로필 수정 기능
* 이미지 업로드 기능

---

## 2. API 설계 및 데이터 계약

### 2.1 사용 API (서버 액션 - src/lib/actions/user.ts의 getMe() 사용)

```
GET /api/v1/users/me/basic
```

### 2.2 응답 데이터 스펙

```json
{
  "userId": 0,
  "nickname": "string",
  "gender": "MALE",
  "ageGroup": "TWENTIES",
  "imagePath": "string",
  "onboardingStep": "BASIC"
}
```

### 2.3 필드별 의미 정리

| 필드명            | 타입     | 의미        | 비고                 |
| -------------- | ------ | --------- | ------------------ |
| userId         | number | 사용자 고유 ID | S3 prefix 계산에 사용   |
| nickname       | string | 닉네임       | ProfileCard 메인 텍스트 |
| gender         | enum   | 성별        | 뱃지로 표시             |
| ageGroup       | enum   | 연령대       | 뱃지로 표시             |
| imagePath      | string | 이미지 경로    | S3 prefix와 결합      |
| onboardingStep | enum   | 온보딩 단계    | 현재 UI에서는 사용하지 않음   |

---

## 3. 프로필 이미지 처리 설계

### 3.1 이미지 URL 생성 규칙

**전제(가정)**

* S3 구조는 다음과 같이 설계되어 있다고 가정한다.

```
s3://{bucket}/users/{userId}/{imagePath}
```

### 3.2 최종 이미지 URL 예시

```text
https://{cdn-domain}/users/123/profile.png
```

### 3.3 이미지 표시 규칙

1. `imagePath`가 존재하는 경우

   * S3 + CDN URL을 조합하여 이미지 표시
2. `imagePath`가 비어있거나 null인 경우

   * 기본 프로필 placeholder 이미지 표시

> 기본 이미지 경로는 **프론트 상수로 관리**하는 것을 권장

---

## 4. ProfileCard UI 구성

### 4.1 UI 구성 요소

ProfileCard는 다음 요소로 구성된다.

```
[프로필 이미지]  [닉네임]
                [성별 뱃지] [연령대 뱃지]
```

### 4.2 컴포넌트 구조 (개념)

```
ProfileCard
 ├─ ProfileImage
 ├─ ProfileInfo
 │   ├─ NicknameText
 │   └─ BadgeGroup
 │       ├─ GenderBadge
 │       └─ AgeGroupBadge
```

---

## 5. 뱃지(Badge) 표시 규칙

### 5.1 gender → UI 매핑

| gender 값 | 표시 텍스트 |
| -------- | ------ |
| MALE     | 남성     |
| FEMALE   | 여성     |

> 서버 enum이 늘어날 가능성을 고려해 **매핑 테이블 방식** 권장

### 5.2 ageGroup → UI 매핑

| ageGroup 값 | 표시 텍스트 |
| ---------- | ------ |
| TEENS      | 10대    |
| TWENTIES   | 20대    |
| THIRTIES   | 30대    |
| FORTIES    | 40대    |
| FIFTIES    | 50대 이상 |

---

## 6. 상태 처리 설계

### 6.1 로딩 상태

* API 요청 중:

  * ProfileCard skeleton UI 표시
  * 이미지 영역은 원형 placeholder

### 6.2 에러 상태

* API 실패 시:

  * ProfileCard 자체를 숨기거나
  * 기본 프로필 + “정보를 불러올 수 없습니다” 텍스트 표시
    → **둘 중 하나를 팀 컨벤션으로 결정 필요**

---

## 7. 컴포넌트 Props 설계 (프론트 기준)

```ts
interface ProfileCardProps {
  userId: number;
  nickname: string;
  gender: 'MALE' | 'FEMALE';
  ageGroup: 'TEENS' | 'TWENTIES' | 'THIRTIES' | 'FORTIES' | 'FIFTIES';
  imagePath: string | null;
}
```

> API 응답을 그대로 넘기지 말고
> **ProfileCard 전용 props로 한 번 정제해서 전달**하는 구조를 권장

---

## 8. 정리 (핵심 요약)

1. ProfileCard는 **마이페이지 상단 요약 영역**
2. 데이터는 `/api/v1/users/me/basic` 단일 API만 사용
3. `userId + imagePath`로 S3 이미지 URL 구성
4. `nickname`은 메인 텍스트
5. `gender`, `ageGroup`은 **뱃지 UI**
6. 로딩 / 에러 상태를 반드시 정의

---