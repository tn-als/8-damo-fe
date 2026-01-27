# 그룹 / 회식 도메인

# **배경 (Background)**

- **프로젝트 목표 (Objective)**
    
    사용자가 소속된 그룹 내에서 회식을 생성하고 ****회식 진행 단계(투표 → 확정 → 리뷰)를 따라가며 불필요한 대기나 혼란 없이 핵심 행동을 빠르게 수행할 수 있는 사용자 경험을 제공한다.
    
    이를 위해 다음을 동시에 달성하는 것을 목표로 한다.
    
    - 회식 상태 및 사용자 역할에 따라 필요한 UI만 노출되는 명확한 인터페이스
    - 초기 로딩과 상호작용 과정에서의 프론트엔드 성능 최적화
    - 상태, API, 컴포넌트 책임을 분리하여 유지보수성과 개발 효율을 높이는 구조
- **문제 정의 (Problem)**
    
    현재 회식 도메인은 다음과 같은 복합적인 문제를 가진다.
    
    - **상태 조합의 복잡성**
        - 사용자 역할(그룹장 / 일반 참여자)
        - 회식 진행 상태(참석 투표, 식당 투표, 회식 확정, 리뷰 단계)
        
        → 위 두 조건의 조합에 따라 노출되어야 할 UI와 행동이 크게 달라진다. 이 로직이 명확히 정리되지 않으면 컴포넌트가 비대해지고 조건 분기가 난잡해진다.
        
    - **다양한 형태의 데이터 노출 요구**
        - 추천 식당 정보는 텍스트뿐 아니라 지도, 위치 정보 등을 함께 제공해야 한다.
        
        → 잘못된 렌더링 전략이나 데이터 로딩 방식은 로딩 지연과 UI 깜빡임으로 직결된다.
        
    - **실시간성에 가까운 상태 동기화 요구**
        - 투표, 참석 여부, 회식 확정 등은 다른 사용자 행동에 따라 즉시 반영되어야 한다
        
        → 서버 상태와 클라이언트 UI 간의 불일치가 발생하면 사용자는 현재 상황을 신뢰하기 어렵다.
        
- **가설 (Hypothesis)**
    
    회식 도메인을 상태 중심으로 재정의하고, 각 상태에 책임이 명확한 컴포넌트 아키텍처와 데이터 로딩 전략을 적용한다면 다음과 같은 효과를 기대할 수 있다.
    
    - 조건 분기를 컴포넌트 구조로 흡수하여 **UI 복잡도를 낮출 수 있다**
    - 서버 상태를 기준으로 한 렌더링과 API 호출 최적화를 통해 **로딩 성능과 일관성이 개선된다**
    - 역할과 상태 변화에 유연하게 대응할 수 있는 구조를 통해 **기능 확장과 유지보수가 쉬워진다**

# **목표가 아닌 것 (Non-goals) (Optional)**

# **설계 및 기술 자료 (Architecture and Technical Documentation)**

## 아키텍처 개요 (Architecture Overview)

- **프레임워크/라이브러리:** React (v19) + Next.js (v15)
- **상태 관리 (State Management):** Zustand
- **UI 컴포넌트:** shadcn/ui
- **스타일링:** tailwind
- **폼(Form) 관리:** React Hook Form
- **데이터 페칭(Data Fetching):** Tanstack Query
- **SSR/ISR/SSG 적용 범위**
    - next.js app router 사용에 따라 컴포넌트 별로 렌더링 전략을 다르게 취할 것
    - 사용자 입력, 상호 작용이 있는 컴포넌트의 경우 client component로 정의해서 사용

## 주요 페이지 / 컴포넌트 구조

- 페이지 (Pages)
    - /groups : 그룹 전체 페이지
        - 주요 기능: 사용자가 속한 그룹 목록 조회
        - 사용 컴포넌트
            - MyGroupHeader
            - MyGroupItem
            - MyGroupList
            - MyGroupActionsFAB
        - 데이터 로딩 시점: 페이지 진입시 `GET /api/v1/users/me/groups` 호출 (서버 컴포넌트)
        - 라우팅
            
            → (FAB의 “그룹 참여하기” 버튼 클릭시) → /groups/join 이동
            
            → (FAB의 “그룹 생성하기” 버튼 클릭시) → /group/create 이동 
            
    - /groups/join : 그룹 참여 페이지
        - 주요 기능: QR 코드 스캔으로 그룹 참여 기능
        - 사용 컴포넌트
            - GroupHeadeR: BackButton, Title
            - GroupJoinContainer
                - CameraScanSection: QR 스캔 행위, 카메라 프리뷰 + 스캔 가이드 UI
                    - CameraPermissionFallbackSection: 왜 안되는지 에러 메시지 보여주기
                - GroupJoinPreviewSection: 그룹 이름, 그룹 이미지, 현재 그룹 인원 수  보여주고 참여 이전에 그룹이 맞는지 확인하는 단계
                - GroupJoinConfirmModal: 최종 의사 결정,
                    - title: 이 그룹에 참여하시겠습니까?
                    - CTA: 취소, 참여하기
                    - Modal 공용 컴포넌트를 만들어야하는 경우 Props 로 title, subTitle?, actions
        - 라우팅
            
            → (카메라 스캔 버튼 클릭시) → 참여 확인 모달 노출 → (참여하기 버튼 클릭시 성공하면 토스트 메시지 띄우기 ) → /groups 이동 : 그룹 리스트에 새 그룹 포함 
            
        - 데이터 흐름 정리 : 지금은 일단 목 데이터 사용
            
            QR 스캔
            → groupId 추출
            → 그룹 정보 조회
            → 실패: 에러 안내
            → 성공: Preview 표시
            → 참여 클릭
            → Confirm Modal
            → POST /groups/{groupId}/users/me
            → 성공: 토스트 → /groups
            → 실패: 에러 메시지
            
    - /groups/create : 그룹 생성 페이지
        - 주요 기능: 그룹 생성 기능
        - 구조
            
            Page
            └─ GroupCreateContainer
            ├─ GroupHeader
            ├─ GroupCreateForm
            │   ├─ GroupImageUploadField
            │   ├─ GroupNameInputField
            
            │   ├─ GroupIntroductionInputField
            │   └─ GroupLocationInputField
            └─ GroupCreateSubmitArea
            └─ CreateGroupButton
            
        - 사용 컴포넌트
            - GroupHeader: BackButton, Title
            - GroupCreateForm
                - GroupImageUploadField
                - GroupNameInputField
                - GroupIntroductionInputField
                - GroupLocationInputField : 그룹 위치 제공 동의 버튼
            - CreateGroupButton
        - 라우팅
            
            → (뒤로가기 버튼 클릭시) → /groups 
            
            → (그룹 생성하기 버튼 클릭시) → (”그룹이 생성되었습니다.” 토스트 메시지 노출) → /groups 이동: 그룹 리스트에 새 그룹 포함 
            
    - /groups/{groupId} : 그룹 상세 페이지
        - 주요 기능: 그룹 참여 QR 기능, 그룹 정보 수정 기능 (그룹장 권한만 가능), 회식 상태별 회식 목록 조회 기능, 회식 생성하기 기능 (그룹장 권한만 가능)
        - 사용 컴포넌트
            - GroupHeader: BackButton, GroupTitle, GroupMoreMenu
            - GroupInformationSection
            - DiningStatusTabSection: 그룹의 회식 레이아웃을  탭뷰로 보여줌. 탭은 참석 투표, 장소 투표, 회식 완료 상태로 구분
            - CreateDiningButton: 회식 생성 버튼
        - 데이터 로딩 시점
            - 초기 페이지 진입 시, 참석 투표 상태의 회식 조회
            - 이후 탭 클릭시 각 상태에 맞게 정보 요청 후 캐싱
        - 라우팅
            - (더보기 버튼에서 “그룹 수정하기” 이동) → /groups/{groupdId}/edit
    - /groups/{groupId}/edit : 그룹 수정 페이지
        - 주요 기능: 그룹장만 접근 가능, 그룹 정보 수정
        - 사용 컴포넌트
            - header: BackButton, Title
            - GroupEditForm
            - GroupImageUploadField
            - GroupNameInputField
            - GroupIntroductionInputField
            - EditGroupButton
        - 데이터 로딩 시점
            - 페이지 진입 시 그룹 정보 조회하여 기존 그룹 정보를 초기값으로 Form에 주입
        - 라우팅
            
            → (뒤로가기 버튼 클릭시) → /groups/{groupId}
            
            → (수정하기 버튼 클릭시) → /groups/{groupId}
            
    - /groups/{groupId}/dining: 회식 생성 페이지
        - 주요 기능: 회식 생성하기 기능으로 그룹장 권한을 가진 사용자만 진입할 수 있다.
            
            회식 생성하기 버튼을 클릭해 `POST /api/v1/groups/{groupId}/dining` api로 회식을 생성한다.
            
        - 사용 컴포넌트
            - DiningDatePicker, VoteDueDatePicker, BudgetInputField, BackButton, DiningCreateButton
        - 라우팅:
            
            → (뒤로가기 버튼 클릭시) → /groups/{groupId} 
            
            → (생성하기 버튼 클릭시) →  /groups/{groupId}
            
    - /groups/{groupId}/dining/{diningId} : 회식 상세 페이지
        - 주요 기능: 회식에 대한 상세 정보를 확인하는 페이지로 참석 투표, 장소 투표, 장소 확정, 추가 참석하기, 추천 다시 받기, 회식 완료하기와 같은 기능을 수행한다. 회식 참석 확정 인원을 조회하는데에도 사용된다.
            
            페이지 진입 시 `GET /api/v1/groups/{groupId}/dining/{diningId}`를 호출하여 회식 상세 조회
            
        - 사용 컴포넌트
            - DiningHeader: BackButton, DiningStatusBadge, DiningDate
            - (참석 투표) AttendanceVotingSection : AttendanceVoteProgress, AttendanceVotePrompt, AttendanceVoteActions
            - (장소 투표) RestaurantVotingSection : RestaurantRecommendationCarousel, RestaurantVoteActions, RestaurantDecisionActions(그룹장 권한만)
            - (회식 확정) ConfirmedSection: ConfirmedRestaurantCard, DiningStatusBadge, CompleteDiningButton(그룹장 권한만)
            - (회식 완료) CompleteSection: ConfirmedRestaurantCard, ReviewButton
            - DiningParticipantList
        - 라우팅:
            
            → (뒤로 가기 버튼 클릭시) → /groups/{groupId}
            
            → (리뷰하러가기 버튼 클릭시) → /groups/{groupId}/dining/{diningId}/review 
            
    - /restaurants/{restaurantId}/reviews: 회식 리뷰 페이지
        - 주요 기능: 진행한 회식에 대한 리뷰를 작성한다.
        - 사용 컴포넌트
            - ReviewHeader: BackButton, Title
            - ReviewRatingBar
            - ReviewTagGroup: ReviewTitle, ReviewTagButton
            - ReviewCommentSection
            - SubmitReviewButton
            - UnsavedReviewWarningModal
        - 라우팅:
            
            → (뒤로가기 버튼 클릭시) → /groups/{groupId}/dining/{diningId}
            
            → (리뷰하기 버튼 클릭시) →  /groups/{groupId}/dining/{diningId}
            
    - /groups/{groupId}/dining/{diningId}/receipt : 회식 영수증 페이지
        - 주요 기능: 회식 영수증 업로드하는 기능으로 그룹장만 접근할 수 있는 페이지
        - 사용 컴포넌트
            - ReceiptHeader
            - ReceiptUploader
        - 라우팅:
            
            → (영수증 업로드 시) → /groups/{groupId}/dining/{diningId} 이동 
            
            → (뒤로가기 버튼 클릭시) → /groups/{groupId}/dining/{diningId} 이동
            
- 주요 컴포넌트 (Components)
    - `useDiningEvent`: 회식 이벤트의 전체 생명 주기를 관리하는 커스텀 훅
        - 개요
            
            역할: 회식 이벤트 데이터를 서버에서 가져오고 최신 상태로 유지하는 역할을 하고 서버 데이터 변화에 따라 UI를 업데이트하는 역할 
            
            Tanstack Query로 서버 캐싱 처리 → 불필요한 네트워크 요청을 방지 
            
        - 훅 반환 데이터
            
            ```tsx
            phase // 현재 단계 
            data // 전체 이벤트 데이터 
            permissions // 사용자 권한 상태
            ```
            
    - `DiningEventSection` : 회식 관련 정보를 보여주는 상세 컴포넌트
        - **개요**
            
            역할: 회식 상세 정보를 노출하는 섹션을 감싸는 부모 컴포넌트
            
            데이터 관리: useDiningEvent 훅 호출 
            
            상태 판단: phase에 따른 렌더링 로직 
            
        - **Props & Interface**
            
            ```tsx
            // 회식 진행 상태를 나타내는 타입
            type DiningEventPhase = 
              | 'ATTENDANCE_VOTING'      // 참석 투표
              | 'RESTAURANT_VOTING'      // 식당 투표
              | 'RESTAURANT_CONFIRMED'   // 식당 확정됨
              | 'DINING_COMPLETED';      // 회식 완료됨
            
            // 최상위 컨테이너 Props
            interface DiningEventSectionProps {
              phase: DiningEventPhase;
              children: React.ReactNode;
            }
            ```
            
        - **내부 상태 & 이벤트**
            
            DiningEventPage에 진입할 때 DiningEventSection을 렌더링
            
            각 phase에 따라서 상태 별 컴포넌트를 노출 
            
            | phase | 섹션 컴포넌트 |
            | --- | --- |
            | ATTENDANCE_VOTING | `DiningAttendanceVotingSection` |
            | RESTAURANT_VOTING | `DiningRestaurantVotingSection` |
            | RESTAURANT_CONFIRMED | `DiningConfirmedSection` |
            | DINING_COMPLETED | `DiningCompleteSection` |
    - `AttendanceVotingSection` : “참석 투표” 상태일 때 회식 상세 컴포넌트
        - **개요**
            - 역할: “참석 투표” 상태에서 그룹 내 사용자들의 투표 현황을 조회하고 참석 투표 이벤트를 처리한다.
        - **계층 관계**
        
        ```tsx
        AttendanceVotingSection 
        ㄴ AttendanceVoteProgress // 사용자 투표 현황
        ㄴ AttendanceVotePrompt 
        ㄴ AttendanceVoteActions // 사용자 참석 투표 버튼
        ```
        
        - **Props & Interface**
        
        ```tsx
        type AttendanceVoteStatus = 'ATTEND' | 'NON_ATTEND' | null;
        
        interface AttendanceVotingSectionProps {
        	/* AttendanceVoteProgress */
        	progress: {
        		totalCount: number;
        		voteCount: number;
        	}; // 프로그레스바 표시를 위한 정보 
        	
        	/* AttendanceVotePrompt */
        	diningDate: string; // 회식 날짜
        	
        	/* AttendanceVoteActions */
        	myVoteStatus: AttendanceVoteStatus; // 투표 상태
        	isSubmitting: boolean; // 요청이 진행 중인가
        	onSubmit: (vote: 'ATTEND' | 'NON_ATTEND') => void; // 투표 후 이벤트 
        }
        ```
        
        - **내부 상태 & 이벤트**
            1. 초기 상태: `myVoteStatus = null` / `isSubmitting = true`
            2. 사용자 투표 액션 발생: onSubmit() 호출 
            3. API 요청 및 요청 중 상태 처리
                
                `PATCH /api/v1/groups/{groupId}/dining/{diningId}/attendance-vote`
                
                `isSubmitting = true`로 변경 → 참석/불참 버튼 비활성화 ⇒ 중복 클릭 방지
                
            4. API 응답 처리 및 상태 확정
                
                요청 처리 실패 시 → 재시도 메시지 노출
                
                요청 처리 성공 시 → 추가 수정 불가능, 버튼 클릭 비활성화
                
        - **에러 처리 / 엣지 케이스**
            - API 응답 처리 실패 시 메시지 노출
            - myVoteStatus가 null이 아닌 경우 (투표를 한 경우) action button 비활성화
        - **스타일링**
            
            카드 아이템 
            
    - `RestaurantVotingSection` : “장소 투표” 상태일 때 회식 상세 컴포넌트
        - **개요**
            - 역할: “장소 투표” 상태에서 그룹 내 사용자들의 투표 현황을 조회하고 장소 투표 이벤트를 처리한다.
        - **계층 관계**
        
        ```tsx
        RestaurantVotingSection 
        ㄴ RestaurantRecommendationCarousel // 추천 식당 캐러셀
        	ㄴ RestaurantVoteActions // 그룹원 장소 투표 버튼
        ㄴ GroupLeaderActions // 그룹장 권한 버튼
        ㄴ AdditionalAttendeeActions // 추가 참석하기 버튼
        ```
        
        - **Props & Interface**
            
            ```tsx
            interface Restaurant {
              id: number;
              name: string;
              description: string;
              phoneNumber: string;
              location: {
                lat: number;
                lng: number;
              };
            }
            
            type VoteAction = 'LIKE' | 'UNLIKE' | null;
            
            interface RestaurantVoteState {
            	likeCount: number;
            	unlikeCount: number;
              myVote: VoteAction; 
            }
            ```
            
            ```tsx
            /* 상위 컴포넌트 */
            interface RestaurantVotingSectionProps {
              restaurants: Restaurant[];
              voteStates: RestaurantVoteState[];
            	permissions: {
            	  canDecideRestaurant: boolean; 
            	  canAttendAdditional: boolean;
            	};
            }
            
            /* 섹션 내 하위 컴포넌트 */
            interface RestaurantRecommendationCarouselProps { // 추천 식당 배열 캐러셀
              restaurants: Restaurant[];
              voteStates: RestaurantVoteState[];
              onVote: (restaurantId: number, action: VoteAction) => void;
            }
            
            interface RestaurantVoteActionsProps { // 캐러셀 배열 중 하나의 고정된 식당 
              voteState: RestaurantVoteState;
              onVote: (action: VoteAction) => void; 
              // 좋아요 / 싫어요 투표
            }
            
            interface GroupLeaderActionsProps { // (그룹장 권한) 식당 확정 
            	onDecideRestaurant: () => void; // 클릭 시 식당 확정 
            	onRerecommendRestaurant: () => void; // 클릭 시 식당 다시 추천받기 
            }
            
            interface AdditionalAttendeeActionsProps {
            	onClick: () => void; // (불참 투표를 한 인원만) 클릭 시 추가 참석 투표
            } 
            ```
            
        - **내부 상태 & 이벤트**
            - `RestaurantVotingSection` 에 데이터 전달 → 하위 컴포넌트들에 프롭스로 전달
            - 전화번호의 폰 아이콘 클릭 시 → 디바이스 동작으로 전화하기 동작 수행
            - canDecideRestaurant = true인 경우 “장소 확정” 가능
            - canAttendAdditional = false인 경우 “추가 참석” 가능
            
            ---
            
            동작 과정 
            
            1. RestaurantVotingSection 상위 (서버 컴포넌트)에서 추천 식당 및 투표 상태를 사전 로딩 
            2. RestaurantRecommendationCarousel 내부에서는 각 장소에 대한 맵 뷰에 대해 Suspense를 적용한다.
            3. 사용자 장소 투표 시 onVote로 액션에 대한 요청 → `useMutation`으로 관리
                
                ```tsx
                const voteMutation = useMutation({
                  mutationFn: voteRestaurant,
                  onMutate: optimisticUpdate,
                  onError: rollback,
                  onSettled: refetchVoteState, // mutation 이후 투표 상태 검증 
                });
                ```
                
                `POST /api/v1/groups/{groupId}/dining/{diningId}/restaurants-vote/{recommendRestaurantsId}`
                
            4. 그룹장 권한 액션 시 
                
                `onDecideRestaurant` → 식당 확정
                
                ⇒ 현재 캐러셀 뷰의 식당을 회식 장소로 확정 
                
                `onRerecommendRestaurant` → 장소 추천 다시 받기 
                
                ⇒ `PATCH /api/v1/groups/{groupId}/dining/{diningId}/recommend-restaurants/{recommendRestaurantsId}/confirmed` 실행
                
                ⇒ RestaurantVotingSection이 다시 업데이트되면서 정보가 리렌더링됨 → Suspense 처리
                
        - **에러 처리 / 엣지 케이스**
            - API 응답 처리 실패 시 메시지 노출
    - `ConfirmedRestaurantSection` : 확정된 식당에 대한 정보를 보여주는 컴포넌트
        - 개요
            
            역할: “회식 확정”, “회식 완료” 상태에서 보여주는 공통 컴포넌트로 각 상태에 따라 수행해야 하는 액션 버튼은 children으로 받는다. → 공통 UI 정보로 사용할 것이기 때문에 코드 중복을 방지할 수 있다. 
            
        - Props & Interface
            
            ```tsx
            interface ConfirmedRestaurant {
              id: number;
              name: string;
              description: string;
              phoneNumber: string;
              location: {
                lat: number;
                lng: number;
              };
              voteResult: {
                likeCount: number;
                unlikeCount: number;
              };
            }
            ```
            
            ```tsx
            interface ConfirmedRestaurantSection{ 
            	restaurant: ConfirmedRestaurant; 
            	children?: React.ReactNode; // 하단에 표시할 액션들 (상태에 따라 다름) 
            }
            ```
            
    - `ConfirmedSection` : “회식 확정” 상태일 때 회식 상세 컴포넌트
        - **개요**
            
            **역할:** “회식 확정” 상태에서 확정된 회식의 정보를 조회하는 컴포넌트
            
        - **계층 관계**
        
        ```tsx
        ConfirmedSection 
        ㄴ ConfirmedRestaurentSection // 확정 회식 정보  
        ㄴ GroupLeaderActions // 그룹장 권한 버튼 
        ```
        
        - **Props & Interface**
            
            ```tsx
            /* 상위 컴포넌트 */ 
            interface DiningConfirmedSection { 
            	restaurant: ConfirmedRestaurant; 
            }
            
            /* 하위 컴포넌트 */ 
            interface GroupLeaderActionsProps {
            	onCompleteDining: () => void; // (그룹장 권한만) 회식 완료하기 액션
            	isLoading?: boolean; // 요청 진행 중 여부 -> 중복 호출 방지 
            }
            ```
            
        - **내부 상태 & 이벤트**
            1. 회식 상태가 ‘회식 확정’인 경우, 추천 식당 캐러셀은 단일 카드 형태로 확정된 식당 정보만 표시된다.
            2. 카드 뷰에 “장소 확정” 이라는 태그로 식당의 확정 상태를 보여준다. 투표 결과도 고정적인 상태로 보인다. 카드 뷰는 조회 상태로만 보이며 전화번호는 device로 전화 연결 된다. 
                
                전화 연결 하이퍼링크 : `<a href="tel:010-1234-5678">`
                
            3. 그룹장 권한이 있는 경우 “회식 완료하기” 버튼(onCompleteDining) 이 보인다. 회식 상태를 ‘완료’로 전환하며 성공 시 “회식 완료” 상태로 이동한다. 
        - **에러 처리 / 엣지 케이스**
            - 확정된 식당 정보 조회 실패 시 → 안내 메시지 노출
            - 회식 완료 요청 실패 시 → 버튼 비활성 해제 및 오류 안내
            - 권한이 없는 사용자는 GroupLeaderActions 미노출
        - **스타일링**
            - “장소 확정” 태그는 시각적으로 강조되되, 액션 버튼과 혼동되지 않도록 passive 스타일로 표현한다.
            - 좋아요/싫어요 수치는 아이콘과 함께 결과 정보로만 표시되며 인터랙션 효과는 제거한다.
    - `CompleteSection`: “회식 완료” 상태일 때 회식 상세 컴포넌트
        - **개요**
            
            **역할**: “회식 완료” 상태에서 완료된 회식의 정보를 조회하는 컴포넌트
            
            **주요 기능**: 리뷰 작성 페이지로 이동하는 진입점
            
        - **계층 관계**
        
        ```tsx
        CompleteSection 
        ㄴ ConfirmedRestaurentSection // 확정 회식 정보 (서버 컴포넌트) 
        ㄴ ReviewAction // 리뷰 작성하기 버튼 
        ```
        
        - Props & Interface
            
            ```tsx
            /* 상위 컴포넌트 */
            interface CompleteSectionProps {
            	restaurant: ConfirmedRestaurant;
            	reviewStatus: 'INCOMPLETED' | 'COMPLETED';
            }
            
            /* 하위 컴포넌트 */
            interface ReviewActionProps{
            	reviewStatus: 'INCOMPLETED' | 'COMPLETED';
            	onClick: () => void; // 리뷰하기 버튼
            }
            ```
            
        - 내부 상태 & 이벤트
            - ConfirmedSection: 단일 카드 렌더링, 식당의 맵 뷰를 제공하기 위해 Suspense 처리
                
                `GET /api/v1/groups/{groupId}/dining/{diningId}`
                
            - ReviewAction:
                - INCOMPLETED ⇒ “리뷰하기”, enabled
                    
                    router.push(”/restaurants/{restaurantId/reviews/")
                    
                - COMPLETED ⇒ “리뷰 작성 완료 ”, disabled
        - 에러 처리 / 엣지 케이스
            - ConfirmedSection 404 → not-found.tsx 로 이동
            - ConfirmedSection 500 → error.tsx로 이동 + 새로고침 버튼 제공
    - `DiningParticipantList`: 회식 참여 인원 리스트
        - **개요**
            
            **역할: 회식에 참여하는 참석자의 리스트 조회** 
            
            회식 조회 시 diningParticipants의 참석자 리스트 정보를 노출
            
        - **Props & Interface**
            
            ```tsx
            interface Participant {
              userId: number;
              nickname: string;
              profileImageUrl: string; // 없으면 default image url 
            }
            
            interface DiningParticipantListProps {
              participants: Participant[];
            }
            
            ```
            
        - **계층 관계**
            
            ```tsx
            DiningParticipantList
              ㄴ DiningParticipantItem
                  ㄴ ProfileImage (avatar)
                  ㄴ Nickname (label)
            ```
            
        - **내부 상태 & 이벤트**
            1. 페이지 진입 시 GET 요청과 함께 참석자 정보 조회
                
                GET /api/v1/groups/{groupId}/dining/{diningId}
                
            2. 참석자 목록은 정적으로 렌더링 
        - **에러 처리 & 엣지 케이스**
            - 404 → “존재하지 않는 회식” + 목록 이동
            - 401/403 → 로그인 유도 or 권한 없음 안내
            - profileImageUrl 없음/깨짐 → 기본 아바타 fallback
    - `DiningStatusTabSection`: 회식 탭 뷰 섹션
        - 개요
            - 역할: 사용자가 그룹 상세 페이지에서 참가한 회식 목록을 조회할 수 있다. 이때 탭 뷰로 조회할 때 쿼리 파라미터로 상태를 같이 넘겨준다.
                
                `GET/api/v1/groups/{groupId}/dinings?status={status}`
                
        - Props & Interface
            
            ```tsx
            type DiningStatus = 
              | 'ATTENDANCE_VOTING' 
              | 'RESTAURANT_VOTING' 
              | 'CONFIRMED' 
              | 'COMPLETE';
            
            interface TabConfig {
              value: DiningStatus;
              label: string;
              staleTime: number;
              gcTime: number;
            } // 탭의 상세 설정 
            
            interface DiningStatusTabSectionProps {
            	groupId: string; // 페이지의 path variable로 전달 받음,
            	initialStatus: DiningStatus; // URL 쿼리 파라미터 -> 사용자의 이동 선택 반영
            }
            ```
            
        - 계층 관계
            
            ```tsx
            DiningStatusTabSection (shadcn/ui - Tabs) 
              ㄴ TabsList 
                  ㄴ TabsTrigger 
              ㄴ TabViewContent 
            ```
            
        - 내부 상태 & 이벤트
            
            **프리페칭 전략 : `TabsTrigger`에 호버 시 프리페칭** 
            
            ```jsx
            const TabButton = ({ tabId, label }) => {
              const queryClient = useQueryClient();
              
              return (
                <button
                  onMouseEnter={() => {
                    queryClient.prefetchQuery({
                      queryKey: ['tab', tabId],
                      queryFn: () => fetchTabData(tabId),
                    });
                  }}
                >
                  {label}
                </button>
              );
            };
            ```
            
            **Stale 시간 및 캐시 무효화 전략** 
            
            ```jsx
            const { data } = useQuery({
              queryKey: ['tab', tabId],
              queryFn: () => fetchTabData(tabId),
              staleTime: 5 * 60 * 1000, // 5분
              gcTime: 10 * 60 * 1000, // 10분
            });
            ```
            
            - 참석 투표, 장소 투표 탭의 경우 실시간성이 중요하기 때문에 staleTime을 짧게 설정
            - 회식 확정, 회식 완료 탭의 경우 staleTime, gcTime을 길게 설정
            
            **에러 바운더리** 
            
            - 렌더링 + 데이터 페칭이 동시에 이뤄지도록 하기 귀해 Suspense 처리
            - 탭 별 레이아웃을 보존하기 위해 탭 별 에러 처리를 분리해서 처리
        - **사용 예시**
        
        ```jsx
        export function DiningStatusTabSection({
          groupId,
          initialStatus
        }: DiningStatusTabSectionProps) {
          const [activeTab, setActiveTab] = useState<DiningStatus>(initialStatus);
          const queryClient = useQueryClient();
        
          const handleTabChange = (value: string) => {
            const newStatus = value as DiningStatus;
            setActiveTab(newStatus);
          };
        
          const handleTabHover = (status: DiningStatus) => {
            const config = TAB_CONFIGS.find(t => t.value === status);
            if (!config) return;
        
            queryClient.prefetchQuery({
              queryKey: ['group', groupId, 'dinings', status],
              queryFn: () => fetchDinings(groupId, status),
              staleTime: config.staleTime,
              gcTime: config.gcTime,
            });
          };
        
          return (
            <Tabs value={activeTab} onValueChange={handleTabChange}>
              <TabsList>
                {TAB_CONFIGS.map(tab => (
                  <TabsTrigger
                    key={tab.value}
                    value={tab.value}
                    onMouseEnter={() => handleTabHover(tab.value)}
                  >
                    {tab.label}
                  </TabsTrigger>
                ))}
              </TabsList>
              
              {TAB_CONFIGS.map(tab => (
                <ErrorBoundary key={tab.value} fallback={<TabErrorFallback />}>
                  <TabsContent value={tab.value}>
                    <Suspense fallback={<TabSkeleton />}>
                      <DiningListContent 
                        groupId={groupId} 
                        status={tab.value}
                        staleTime={tab.staleTime}
                        gcTime={tab.gcTime}
                      />
                    </Suspense>
                  </TabsContent>
                </ErrorBoundary>
              ))}
            </Tabs>
          );
        }
        ```
        
        - 에러처리 및 엣지 케이스
            - initialStatus에 DiningStatus가 아닌 다른 파라미터가 들어오는 경우 → error.tsx 노출
            - 데이터가 없는 경우 → `EmptyState` 컴포넌트 노출
        - 스타일링
            - 기본적으로 shadcn/ui의 tabs 적용
            - 탭 클릭 및 호버 시 하이라이트 적용
    - **`GroupJoinByQrSection`: 그룹 참여 QR 코드 스캔 섹션**
        - **개요**
            - 역할: 그룹 참여 요청의 진입점이 되는 섹션
            - 디바이스 카메라로 스캔한 QR 코드와 그에 포함된 groupId를 기반으로 그룹 참여 요청을 보낸다.
                
                `POST /api/v1/groups/{groupId}/users/me`
                
            - QR 스캔은 직접적인 그룹 참여 요청으로 이어지는 것이 아니기 때문에 카메라 스트림과 api 요청을 명확하게 분리해야 한다. QR 스캔은 그룹에 참여하는 모달을 여는 트리거가 되는 행동일 뿐이다.
        - **Props & Interface**
        
        ```tsx
        type JoinError = {
        	code: 'ALREADY_MEMBER' | 'GROUP_NOT_FOUND' | 'GROUP_FULL' | 'NETWORK_ERROR' | 'UNKNOWN'; 
        	message: string; 
        }
        
        interface GroupJoinByQrSectionProps {
        	/* 그룹 참여 성공 시*/
        	onJoinSuccess: (groupId: string) => void; 
        	
        	/* 그룹 참여 실패 시*/
        	onJoinError: (error: JoinError) => void; 
        }
        ```
        
        - **계층 관계**
        
        ```tsx
        GroupJoinByQrSection
         ├─ CameraPreview  // <video> + canvas 카메라 스캔 화면
         ├─ ScanGuideOverlay  // 스캔 가이드 UI (중앙 사각형, 안내 텍스트)
         ├─ QrConfirmModal             // 그룹 참여 확인 모달
         │   └─ GroupPreviewCard       // 그룹 정보 미리보기 (이름, 멤버 수, 썸네일)
         ├─ LoadingOverlay             // 참여 요청 중 (isJoining)
         └─ ErrorMessage               // 에러 발생 시 안내
        ```
        
        | 컴포넌트 | 책임 | 상태 의존성 |
        | --- | --- | --- |
        | CameraPreview | 카메라 스트림 렌더링, QR 디코딩 | state.type === ‘scanning’ |
        | ScanGuideOverlay | 사용자에게 QR 위치 가이드 | state.type === ‘scanning’ |
        | QRConfirmModal | 그룹 정보 표시 + 참여 확인 | state.type === ‘joining’ |
        | LoadingOverlay | 참여 요청 진행중 표시 | state.type === ‘joining’ |
        | ErrorMessage | 에러 메시지 표시 + 재시도 버튼 | state.type === ‘error’ |
        - **내부 상태 & 이벤트**
        
        ```tsx
        type ScanState =
          | { type: 'idle' }
          | { type: 'camera_loading' }
          | { type: 'scanning' }
          | { type: 'confirming'; groupId: string }
          | { type: 'joining'; groupId: string }
          | { type: 'error'; code: ErrorCode; message: string };
        
        type ErrorCode = 
          | 'CAMERA_PERMISSION_DENIED'
          | 'CAMERA_NOT_AVAILABLE'
          | 'QR_DECODE_FAILED'
          | 'ALREADY_MEMBER'
          | 'GROUP_NOT_FOUND'
          | 'GROUP_FULL'
          | 'NETWORK_ERROR';
        ```
        
        1. idle 
        2. 카메라 권한 요청: camera_loading 
        3. 스캐닝: scanning 
        4. 카메라 중단, 확인 모달 노출: confirming
        5. 그룹 참여 POST 요청: joining
            
            `POST /api/v1/groups/{groupId}/users/me`
            
        6. 성공 → onJoinSuccess 호출 
            
            에러 → onJoinError 호출
            
        - 에러 처리 & 엣지 케이스
        
        | 에러 코드 | 원인 | 사용자 메시지 |
        | --- | --- | --- |
        | `CAMERA_PERMISSION_DENIED` | 카메라 권한 거부 | "카메라 권한을 허용해주세요" |
        | `CAMERA_NOT_AVAILABLE` | 카메라 없음/사용 중 | "카메라를 사용할 수 없습니다" |
        | `QR_DECODE_FAILED` | 유효하지 않은 QR | "유효하지 않은 QR 코드입니다" |
        | `ALREADY_MEMBER` | 이미 참여한 그룹 | "이미 참여한 그룹입니다" |
        | `GROUP_NOT_FOUND` | 존재하지 않는 그룹 | "유효하지 않은 초대입니다" |
        | `GROUP_FULL` | 그룹 인원 초과 | "그룹 인원이 가득 찼습니다" |
        | `NETWORK_ERROR` | 네트워크 실패 | "네트워크 오류가 발생했습니다" |
        - **스타일링**
            
            스캔 가이드 오버레이에서 QR 코드가 존재해야 하는 부분에 보더로 표시 
            
    - `ReceiptUploadSection`: 영수증 이미지 업로드 섹션
        - **개요**
            - **역할:** 디바이스 갤러리에 있는 사진 파일을 업로드하는 섹션
        - **Props & Interface**
            
            ```tsx
            type imageAllowedTypes = 'JPEG' | 'PNG' | 'JPG' | 'webP';
             
            interface ReceiptUploadSectionProps {
              /** 업로드 성공 후 호출 */
              onUploadSuccess: (uploadedImageUrl: string) => void;
            
              /** 업로드 실패 시 호출 */
              onUploadError?: (message: string) => void;
            
              /** 최대 허용 파일 크기 (byte) */
              maxSize: number; // default: 20 * 1024 * 1024
            
              /** 허용 이미지 타입 */
              allowedTypes: imageAllowedTypes;
            }
            ```
            
        - **계층 관계**
            
            ```tsx
            ReceiptUploadSection
             ├─ <label> // 업로드 안내 텍스트 
             ├─ <input type="file" accept="" />
             ├─ <button> // 업로드 트리거 
             ├─ <ImagePreview> // 선택된 이미지 미리보기 
             └─ <ErrorMessage> // 에러 노출
            ```
            
            - 컴포넌트 UI 요소는 자체적으로 정의
            - 데이터 관리, 유효성 검증, 서버 제출 처리는 Form에서 따로 진행
        - **내부 상태 & 이벤트**
            
            **상태** 
            
            ```tsx
            const [file, setFile] = useState<File | null>(null);
            const [previewUrl, setPreviewUrl] = useState<string | null>(null);
            const [isUploading, setIsUploading] = useState(false);
            const [error, setError] = useState<string | null>(null);
            
            ```
            
            **이벤트 흐름** 
            
            1. 이미지 선택 : <input type=”file”>을 통해 이미지 선택
                1. 파일 타입 / 용량 검증
                2. 실패 시 에러 노출 및 상태 초기화 → 토스트 메시지 
            2. presigned URL 요청 
                1. 서버에 업로드 메타 정보 전달 
                2. 업로드용 URL 수진 
            3. 스토리지 직접 업로드
                1. api: 
                2. 업로드 중 `isUploading = true` → 업로드 버튼 비활성화 ⇒ 중복 제출 방지
            4. 업로드 성공 
                1. onUploadSuccess(imageUrl) 호출 
            5. 업로드 실패 
                1. onUploadError(message) 호출 → 토스트 메시지
        - **에러 처리 & 엣지 케이스**
            - 허용되지 않은 확장자 / 용량 초과 → 토스트 메시지 노출
        - **스타일링**
            - 업로드 중 로딩 인디케이터 표시

## 상태 관리 전략 (State Management Strategy)

- **Local State**
    
    UI 상태는 모달의 열림 여부와 같이 화면 표현을 제어하기 위한 일시적인 상태가 포함된다.  → useState , useReducer 
    
- **Tanstack Query**
    - 회식 상세 조회
        - `서버 → 클라이언트 단방향 업데이트` 클라이언트의 투표는 한번만 진행되며 재시도할 수 없다. 서버는 클라이언트의 투표 결과를 다른 클라이언트들에게 브로드캐스트할 수 있어야 한다. 투표 결과는 실시간으로 업데이트되어서 사용자들이 확인할 수 있어야 한다.
        
        | 상태 | 주요 데이터 | 캐시 주기 |
        | --- | --- | --- |
        | ‘참석 투표’ | diningParticipants / voteInfo | staleTime:  gcTime: 10분 |
        | ‘장소 투표’ | recommendRestaurants / diningParticipants | staleTime: gcTime: 10분 |
        | ‘회식 확정’ | 서버 컴포넌트로 구성 | - |

## API 연동 (API Integration)

| api | 페이지 | 상세 |
| --- | --- | --- |
| `GET /api/v1/users/me/groups`  | /groups | 사용자가 소속된 그룹 목록 조회 |
| `POST /api/v1/groups/{groupId}/users/me` | /groups/join | 그룹 참여 |
| `POST /api/v1/groups` | /groups/create | 그룹 생성 |
| `GET /api/v1/groups/{groupId}` | /groups/{groupId} | 그룹 정보 상세 조회 |
| `PATCH /api/v1/groups/{groupId}` | /groups/{groupsId}/edit | 그룹 정보 수정 |
| `POST /api/v1/groups/{groupId}/dining` | /groups/{groupId}/dining | 회식 생성 |
| `GET /api/v1/groups/{groupId}/dining/{diningId}` | /groups/{groupId}/dining/{diningId} | 회식 정보 조회 |
| `POST /api/v1/restaurants/{restaurantId}/reviews` | /restaurants/{restaurantId}/reviews | 식당 리뷰 작성 |
- API 호출 처리
    - useQuery: GET 요청
    - useMutation: POST/PATCH/DELETE 요청을 위해 사용

## 폼 처리 및 유효성 검증 (Forms & Validation)

React Hook Form을 사용하여 폼 상태 관리 및 유효성 검증 로직 구현 

- 사용자 입력 내용에 대해서 useForm 훅을 최상단 사용
- 오류시 토스트 메시지 혹은 필드 아래 헬퍼 텍스트로 노출

백엔드 API 명세에 따른 필드별 유효성 규칙 적용

## 에러 처리 및 로딩 관리

- 에러 처리
    - 400 / 409 / 입력값의 유효성 검사를 통과하지 못하는 경우 / 사용자 액션 (mutation) 중 네트워크 오류
        - 서버에서 보내준 에러 메시지를 명시적으로 처리하고 클라이언트에 메시지 노출
        - 토스트 메시지를 노출하는 경우 : 파일 업로드, 사용자 액션 중 네트워크 오류
        - 헬퍼 텍스트를 노출하는 경 : 텍스트 입력 필드가 존재
    - 서버 내부 오류 (5xx) / 데이터 조회 중 네트워크 오류
        - /app 폴더에 error.tsx를 정의하고 에러 발생 시 대체 ui를 표시
        - 새로 고침 버튼 제공
    - 401 (인증 오류)
        - 사용자 토큰이 만료됐거나 로그인이 안된 경우
        - /login 페이지로 리다이렉트
    - 403 (권한 오류) : 그룹장 권한만으로 접근 가능한 페이지의 경우
        - 접근 권한이 없음을 안내
        - /main 또는 이전 페이지 이동
    - 404 (리소스 없음)
        - not-found.tsx : 존재하지 않는 리소스 안내
- 로딩 관리
    - 회식 상세 컴포넌트 : `AttendanceVotingSection` / `RestaurantVotingSection` / `ConfirmedSection`
        - 지도 뷰를 기본적으로 보여주는 컴포넌트이기 때문에 클라이언트 컴포넌트로 구성
        - 카카오 맵 api를 호출해서 지도 뷰를 보여줘야하기 때문에 호출 후 데이터를 로딩하는데 걸리는 지연 시간 동안 로딩 spinner를 보여줄 예정

# **이외 고려사항들 (Other Considerations) (Optional)**

# **함께 논의하고 싶은 내용 (Open Questions) (Optional)**

백엔드

- 실시간 투표 상태 브로드캐스트 구현 방식

# **용어 정의 (Glossary) (Optional)**