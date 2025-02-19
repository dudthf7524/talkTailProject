const speciesData = {
  강아지: {
    topOptions: ["믹스견"], // 개의 TOP1 리스트
    otherOptions: [
      "가멜 댄스크 횐제훈트",
      "가스콩 생통주아",
      "고든 세터",
      "고스 드아투라 카탈라",
      "곤치 폴스키",
      "골든 두들",
      "골든 리트리버",
      "그랑 그리퐁 방데앙",
      "그랑 바셋 그리퐁 방데앙",
      "그랑 블뢰 드 가스코뉴",
      "그랑 앙글로 프랑세 블랑 엣 누아",
      "그랑 앙글로 프랑세 블랑 엣 오랑주",
      "그랑 앙글로 프랑세 트리콜로",
      "그레이 하운드",
      "그레이트 데인",
      "그레이트 덴",
      "그레이트 스위스 마운틴 도그",
      "그레이트 피레니즈",
      "그레이하운드",
      "그로넨달",
      "그로서 슈바이처 제넨훈트",
      "그리스 셰퍼드",
      "그리스 헤어하운드",
      "그리펀 벨지언",
      "그리펀 브뤼셀",
      "그리퐁 니베르네",
      "그리퐁 다레 아 푸알 뒤르 코스탈",
      "그리퐁 블뢰 드 가스코뉴",
      "그리퐁 포브 드 브르타뉴",
      "그린란드견",
      "그린랜드 도그",
      "글렌 오브 이말 테리어",
      "기슈견",
      "까나리오",
      "꼬동 드 툴레아",
      "꼬똥 드 툴레아",
      "나폴리탄 마스티프",
      "네더르란스 쿠이커혼제",
      "노르보텐 스피츠",
      "노르보텐스펫츠",
      "노르스크 룬데훈트",
      "노르스크 엘휀트 소트",
      "노르웨이안 룬트훈트",
      "노르웨이안 버훈트",
      "노르웨이안 엘크 하운드",
      "노르위전 버훈드",
      "노르위전 엘크하운드 그레이",
      "노르위치 테리어",
      "노르포크 테리어",
      "노리치 테리어",
      "노바 스코샤 덕 톨링 리트리버",
      "노바 스코셔 덕 톨링 리트리버",
      "노퍽 테리어",
      "노포크 테리어",
      "뉴펀들랜드",
      "닥스훈트",
      "단스크-스벤스크 고르스훈드",
      "달마시안",
      "대니시 스웨디시 팜도그",
      "댄디 딘먼트 테리어",
      "댄디 딘몬트 테리어",
      "더치 셰펴드",
      "덩케르",
      "도고 까나리오",
      "도고 아르헨티노",
      "도그 드 보르도",
      "도베르만",
      "도사",
      "도사견",
      "도이처 바흐텔훈트",
      "도이처 핀셔",
      "도이체 브라케",
      "도이치 랑하어",
      "동경견 (경주개)",
      "드레버",
      "드레베르",
      "드렌츠허 파트레이스혼트",
      "드로트쇠뤼 머저르 비줄러",
      "디어 하운드",
      "라고토 로마뇰로",
      "라사 압소",
      "라사압소",
      "라이카",
      "라지 먼스터랜더",
      "라케노이즈",
      "라포니안 허더",
      "라포니언 허더",
      "란트저",
      "래브라도 리트리버",
      "랫 테리어",
      "랭카셔 힐러",
      "러셀 테리어",
      "러스키 토이",
      "러시안 블랙 테리어",
      "러처",
      "러프 콜리",
      "레드본 쿤하운드",
      "레온베르거",
      "레이크랜드 테리어",
      "로디지안 리지백",
      "로첸",
      "로트바일러",
      "로트와일러",
      "루마니안 미오리틱 셰퍼드 도그",
      "루스코예브로페이스카야 라이카",
      "루스키 토이",
      "리틀 라이언 도그",
      "마스티프",
      "마운틴 커",
      "말리노이즈",
      "말티즈",
      "맨체스터 테리어",
      "머저르 어가르",
      "무디",
      "미니어처 불 테리어",
      "미니어처 슈나우저",
      "미니어처 핀셔",
      "미니어쳐 불 테리어",
      "미니어쳐 슈나우져",
      "미니어쳐 아메리칸 셰퍼드",
      "미니어쳐 핀셔",
      "바라크 드 아리에주",
      "바라크 드 오베르뉴",
      "바라크 생제르맹",
      "바베트",
      "바센지",
      "바셋 블뢰 드 가스코니",
      "바셋 아르테지앙 노르망",
      "바셋 포브 드 브레타뉴",
      "바셋 포브 드 브르타뉴",
      "바셋 하운드",
      "바셋하운드",
      "바이마라너",
      "바이서 슈바이처 셰페르훈트",
      "바이에리셔 게비르크스슈바이스훈트",
      "배들링턴 테리어",
      "버거 피카드",
      "버니즈 마운틴 도그",
      "베들링턴 테리어",
      "베르지 드 피레네 아 파스 라지",
      "베르지 피카르",
      "베테르하운",
      "벨지안 셰퍼드 도그",
      "벨지언 셰퍼드 도그",
      "벳괴에타스펫스",
      "보더 콜리",
      "보더 테리어",
      "보르도 마스티프",
      "보르조이",
      "보비에 드 플란더스",
      "보스 쉽도그",
      "보스롱(뷰세런)",
      "보스턴 테리어",
      "보어보엘",
      "보이킨 스패니얼",
      "복서",
      "볼로네즈",
      "볼피노 이탈리아노",
      "부비에 데 아르덴",
      "부비에 데 플랑드르",
      "불 마스티프",
      "불 테리어",
      "불개",
      "불도그",
      "불도그",
      "불리 쿠타",
      "불마스티프",
      "브라질리언 가드 도그",
      "브라코 이탈리아노",
      "브라크 뒤 부르보네",
      "브라크 프랑세, 티프 가스코뉴",
      "브라크 프랑세, 티프 피레네",
      "브란틀브라케(피로이글)",
      "브로홀머",
      "브뤼셀 그리펀",
      "브리어드",
      "브리케 그리퐁 방데앙",
      "브리타니 스파니엘",
      "블랙 러시안 테리어",
      "블랙 앤 탄 쿤하운드",
      "블러드 하운드",
      "블러드하운드",
      "블루 피카르디 스패니얼",
      "블루틱 쿤하운드",
      "비글",
      "비글 해리어",
      "비숑 프리제",
      "비어디드 콜리",
      "비즐라",
      "비촌 아바네로",
      "빌리",
      "쁘띠 바셋 그리펀 벤딘",
      "쁘띠 브라바콘",
      "쁘띠 브라방송",
      "사를로스볼프혼트",
      "사모예드",
      "사부에소 에스파뇰",
      "살루키",
      "삽살개",
      "샤르플라니나츠",
      "샤를로스 울프도그",
      "샤페이",
      "샤펜도스",
      "서섹스 스패니얼",
      "서식스 스패니얼",
      "세구조 이탈리아노 아 펠로 라소",
      "세구조 이탈리아노 아 펠로 포르테",
      "세인트 버나드",
      "센트럴 아시아 셰퍼드 도그",
      "센트럴 아시안 오브차카",
      "셔틀랜드 쉽도그",
      "셰틀랜드 쉽도그",
      "소프트 코티드 휘튼 테리어",
      "숄로이츠퀸틀",
      "수오메나요코이라",
      "수오멘라핑코이라",
      "수오멘퓌스튀코르바",
      "슈나우저",
      "슈나우져",
      "슈나우져 (미니어쳐)",
      "슈나우져 (스탠다드)",
      "슈나우져 (자이언트)",
      "슈바이처 라우프훈트",
      "슈바이체리셔 니데를라우프훈트",
      "슈타이리셰 라우하르브라케",
      "스르노고르스키 플라닌스키 고니치",
      "스르프스키 고니치",
      "스르프스키 트로보이니 고니치",
      "스몰란스퇴바레",
      "스무스 콜리",
      "스무스 폭스 테리어",
      "스벤스크 랍훈드",
      "스웨디시 라프훈트",
      "스위디쉬 발훈트",
      "스카이 테리어",
      "스코티쉬 테리어",
      "스코티시 디어하운드",
      "스코티시 테리어",
      "스키퍼키",
      "스타베이",
      "스태포드셔 불 테리어",
      "스탠다드 푸들",
      "스테비훈",
      "스티체얼할",
      "스패니쉬 그레이 하운드",
      "스패니쉬 그레이하운드",
      "스페니쉬 마스티프",
      "스페니쉬 워터 도그",
      "스피노네 이달리아노",
      "스피노네 이탈리아노",
      "스피츠",
      "스핑크스",
      "스하펜두스",
      "슬로바키안 와이어헤어드 포인터",
      "슬로벤스키 추바치",
      "슬로벤스키 코포우",
      "슬로벤스키 흐루보스르스티 스타바치",
      "슬루기",
      "시바",
      "시바견",
      "시베리안 허스키",
      "시베리언 허스키",
      "시앙 드 아르투아",
      "시추",
      "시츄",
      "시코쿠",
      "시코쿠견",
      "실레르스퇴바레",
      "실리함 테리어",
      "실리햄 테리어",
      "실키 테리어",
      "아나톨리안 마스티프",
      "아나톨리안 셰퍼드도그",
      "아나톨리언 셰퍼드 도그",
      "아리에주아",
      "아메리칸 밴도지",
      "아메리칸 불리",
      "아메리칸 스태포드셔 테리어",
      "아메리칸 스테그 하운드",
      "아메리칸 아키다",
      "아메리칸 아키타견",
      "아메리칸 에스키모 도그",
      "아메리칸 워터 스패니얼",
      "아메리칸 잉글리시 쿤하운드",
      "아메리칸 코커 스파니엘",
      "아메리칸 폭스하운드",
      "아메리칸 헤어리스 테리어",
      "아이디",
      "아이리쉬 레드 세터",
      "아이리쉬 레드 앤 화이트 세터",
      "아이리쉬 소프트코티드 휘튼 테리어",
      "아이리쉬 울프하운드",
      "아이리쉬 워터 스파니엘",
      "아이리쉬 테리어",
      "아이리시 글렌 오브 이말 테리어",
      "아이리시 레드 앤 화이트 세터",
      "아이리시 세터",
      "아이리시 소프트코티드 휘튼 테리어",
      "아이리시 울프 하운드",
      "아이리시 워터 스패니얼",
      "아이리시 테리어",
      "아이슬랜딕 쉽도그",
      "아자와크",
      "아크라이트",
      "아크바시",
      "아키다",
      "아키타견",
      "아펜첼러 제넨훈트",
      "아펜핀셔",
      "아프간 하운드",
      "알라스칸 말라뮤트",
      "알래스칸 말라뮤트",
      "알렌테조 마스티프",
      "알펜을렌디셰 닥스브라케",
      "앙글로 프랑세 드 프티 베느리",
      "에르데이 코포",
      "에스트렐라 마운틴 도그",
      "에어데일 테리어",
      "에파뉴엘 드 퐁 오드메르",
      "에파뉴엘 블뢰 드 피카르디",
      "에파뉴엘 프랑세",
      "에파뉴엘 피카르",
      "엔틀레부허 제넨훈트",
      "엔틀버쳐 마운틴 도그",
      "엘리니코스 이흐닐라티스",
      "옘툰드",
      "오가르 폴스키",
      "오브차카",
      "오스트레일리안 셰퍼드 도그",
      "오스트레일리안 스텀피 테일 캐틀 도그",
      "오스트레일리안 캐틀 도그",
      "오스트레일리안 켈피",
      "오스트레일리안 테리어",
      "오스트레일리언 셰퍼드",
      "오스트레일리언 실키 테리어",
      "오스트레일리언 캐틀 도그",
      "오스트레일리언 캘피",
      "오스트레일리언 테리어",
      "오이라지어",
      "오터 하운드",
      "오터하운드",
      "오프차레크 포트할란스키",
      "올드 잉글리쉬 쉽도그",
      "올드 잉글리시 쉽도그",
      "와이마라너",
      "와이어 폭스 테리어",
      "와이어헤어드 비즐라",
      "와이어헤어드 포인팅 그리폰",
      "외스테라이히셔 핀셔",
      "요크셔 테리어",
      "요키",
      "웨스트 시베리언 라이카",
      "웨스트 하이랜드 화이트 테리어",
      "웨스트 하일랜드 화이트 테리어",
      "웰쉬 스프링거 스파니엘",
      "웰쉬 테리어",
      "웰시 스프링거 스파니엘",
      "웰시 코기",
      "웰시 코기 카디건",
      "웰시 코기 펨브로크",
      "웰시 테리어",
      "유라시아",
      "유즈노루스카야 옵차르카",
      "이비잔 하운드",
      "이스타르스키 오슈트로들라키 고니치",
      "이스타르스키 크라트코들라키 고니치",
      "이스트 시베리언 라이카",
      "이슬렌스퀴르 피아우르휜뒤르",
      "이탈리안 그레이 하운드",
      "이탈리안 세구죠",
      "이탈리안 코로소 도그",
      "이탈리언 그레이하운드",
      "이탈리언 코르소 도그",
      "잉글리쉬 세터",
      "잉글리쉬 스프링거 스파니엘",
      "잉글리쉬 코커 스파니엘",
      "잉글리쉬 토이 테리어",
      "잉글리쉬 포인터",
      "잉글리시 마스티프",
      "잉글리시 불도그",
      "잉글리시 세터",
      "잉글리시 스프링거 스패니얼",
      "잉글리시 코카 스패니얼",
      "잉글리시 포인터",
      "잉글리시 폭스 하운드",
      "잉글리시 폭스하운드",
      "자이언트 슈나우저",
      "자이언트 슈나우져",
      "잭 러셀 테리어",
      "저먼 롱헤어드 포인터",
      "저먼 셰퍼드 도그",
      "저먼 쇼트헤어드 포인터",
      "저먼 숏헤어드 포인팅 도그",
      "저먼 스피츠",
      "저먼 와이어헤어드 포인터",
      "저먼 핀셔",
      "저먼 헌팅 테리어",
      "제주개",
      "제패니즈 스피츠",
      "제패니즈 친",
      "제패니즈 테리어",
      "제페니스 친",
      "진돗개",
      "차우 차우",
      "차우차우",
      "차이니스 크레스티드",
      "차이니즈 크레스티드 도그",
      "체서피크 베이 리트리버",
      "체스키 테리어",
      "체스키 테리에르",
      "체스키 포우세크",
      "체코슬로바키안 울프도그",
      "체코슬로바키언 울프도그",
      "치누크",
      "치르네코 델레트나",
      "치오버네스크 로므네스크 데 부코비나",
      "치오버네스크 로므네스크 미오리티크",
      "치오버네스크 로므네스크 카르파틴",
      "치와와",
      "친",
      "카네 다 파스토레 베르가마스코",
      "카네 코르소",
      "카렐리안 베어 도그",
      "카리알랑카르후코이라",
      "카발리에 킹 찰스 스패니얼",
      "카이",
      "카이견",
      "카타호울라 레오파트 도그",
      "캉 다 세하 드 아이르스",
      "캉 드 카스트루 라보레이루",
      "캉 드 필라 드 상미겔",
      "캉갈",
      "캐롤리나 도그",
      "캐벌리어 킹 찰스 스파니엘",
      "컬리 코티드 리트리버",
      "케니스펜더",
      "케리 블루 테리어",
      "케언 테리어",
      "케이넌 도그",
      "케이스혼트",
      "켈렙 카나아니",
      "코리안 마스티프",
      "코몬도르",
      "코카 스파니엘",
      "코카시언 셰퍼드 도그",
      "콘티넨탈 토이 스파니엘",
      "콜리",
      "콜리 (러프)",
      "콜리 (스무스)",
      "쿠바츠",
      "쿠버스",
      "크라셰베츠",
      "크레타 하운드",
      "크로아티안 쉽도그",
      "클라이너 뮌슈테를렌더",
      "클럼버 스파니엘",
      "클럼버 스패니얼",
      "키슈",
      "키스흔드",
      "킹 찰스 스파니엘",
      "타이 리지백 도그",
      "타이 방케우",
      "타이완 도그",
      "타이완 도그(포르모산 마운틴 도그)",
      "테디 루즈벨트 테리어",
      "테르뷰렌",
      "테히에르 브라질레이루",
      "토르냐크",
      "토른쟈크",
      "토이 맨체스터 테리어",
      "토이 폭스 테리어",
      "통일개",
      "트라이 하운드",
      "트랜시바니안 하운드",
      "트리잉 워커 쿤하운드",
      "트리잉 테네시 브린들",
      "티롤러 브라케",
      "티베탄 마스티프",
      "티베탄 스파니엘",
      "티베탄 스패니얼",
      "티베탄 테리어",
      "파라오 하운드",
      "파슨 러셀 테리어",
      "파피용",
      "패터데일 테리어",
      "퍼그",
      "페로 데 아과 에스파뇰",
      "페로 데 파스토르 마요르킨",
      "페로 도고 마요르킨",
      "페로 드 프레사 카나리오",
      "페로 시마론 우루과요",
      "페루비언 헤어리스 도그",
      "페르디게로 데 부르고스",
      "페르디게이루 포르투게스",
      "페키니즈",
      "포덴코 이비센코",
      "포뎅구 포르투게스",
      "포뎅코 카나리오",
      "포르셀렌",
      "포르셀엔",
      "포르투갈 워터 도그",
      "포르투갈 포덴고",
      "포르투갈 포인터",
      "포르투기즈 워터 도그",
      "포메라니안",
      "포사브스키 고니치",
      "포인터",
      "폭스 테리어",
      "폴리쉬 로랜드 쉽도그",
      "폴리시 로랜드 쉽도그",
      "폼피츠",
      "푸델포인터",
      "푸들",
      "푸미",
      "풀리",
      "풍산개",
      "프랑세 블랑 엣 누아",
      "프랑세 블랑 엣 오랑주",
      "프랑세 트리콜로",
      "프레사 까나리오",
      "프렌치 불도그",
      "프렌치 스패니얼",
      "프와트방",
      "프티 블뢰 드 가스코뉴",
      "플랫 코티드 리트리버",
      "피니시 라프훈트",
      "피니시 스피츠",
      "피레니안 마운틴 도그",
      "피레니안 셰퍼드",
      "피레니언 마스티프",
      "피레니언 마운틴 도그",
      "피레니언 쉽도그 롱헤어",
      "필드 스파니엘",
      "필드 스패니얼",
      "필라 브라질레이로",
      "핏 불 테리어",
      "하노페르셔 슈바이스훈트",
      "하르트 폴스키",
      "하밀톤스퇴바레",
      "하바니즈(하바네제)",
      "하페이루 두 알렌테주",
      "할덴스퇴베르",
      "해리어",
      "헝가리언 숏헤어드 포인터",
      "호바와트",
      "호파바르트",
      "홀란드서 스마우스혼트",
      "홀란드서 헤르더르",
      "홋카이도",
      "홋카이도견",
      "휘핏",
      "흐르바트스키 오브차르",
      "히겐훈드",
    ].sort((a, b) => a.localeCompare(b, "ko")), // 가나다순 정렬
  },

  고양이: {
    topOptions: ["믹스묘"], // 고양이의 TOP1 리스트
    otherOptions: [
      
      "코리안숏헤어",
      "아비시니안",
      "아메리칸 쇼트헤어",
      "스코티시 폴드",
      "러시안 블루",
      "벵갈",
      "페르시안",
      "메인쿤",
      "샴",
      "브리티시 쇼트헤어",
      "터키시 앙고라",
      "라가머핀",
      "라그돌",
      "오리엔탈 숏헤어",
      "버만",
      "엑조틱 쇼트헤어",
      "데본 렉스",
      "시베리안",
      "보미",
      "네벨룽",
      "만초킨",
      "싱가푸라",
      "토이거",
      "톤키니즈",
      "하바나 브라운",
      "오시캣",
      "소말리",
      "차우시",
      "사바나",
      "셀커크 렉스",
      "라퍼머",
      "피터볼드",
      "저먼 렉스",
      "쿠릴리안 밥테일",
      "재패니즈 밥테일",
      "카오마니",
      "아메리칸 밥테일",
      "아메리칸 컬",
      "스핑크스",
      "카라칼",
      "사이베리안 포레스트 캣",
      "브리티시 롱헤어",
      "셀틱 쇼트헤어",
      "유러피언 쇼트헤어",
      "오스트레일리안 미스트",
      "스노우슈",
      "버미즈",
      "터키시 반",
      "이집션 마우",
      "히말라얀",
    ].sort((a, b) => a.localeCompare(b, "ko")), // 가나다순 정렬
  },
};
export default speciesData;
