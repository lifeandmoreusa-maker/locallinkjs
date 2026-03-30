# 🚀 로컬링크 (LocalLink) 리워드 플랫폼 랜딩 페이지

이 프로젝트는 오프라인 매장에서 QR을 통해 유입된 고객에게 **'기업의 광고비를 직접 환원하는 플랫폼'**의 가치를 전달하고, **인카 파트너스 비즈니스 세미나** 참여를 유도하는 프리미엄 랜딩 페이지입니다.

## 🛠 기술 스택
- **Build Tool**: Vite v8+
- **Frontend**: Vanilla JS, SEO 최적화 HTML5
- **Styling**: Vanilla CSS (Custom Variable System)
- **Design Concepts**: Glassmorphism, Dynamic Scroll Reveal, Fluorescent Highlights

## 📂 프로젝트 구조
```text
locallink-landing/
├── public/              # 정적 에셋 (이미지, 파비콘 등)
│   ├── reward.png       # 4만원 리워드 알림 이미지
│   └── guarantee.png    # 지불 보증 실 이미지
├── src/                 # 소스 코드
│   ├── main.js          # 인터랙션 로직 및 동적 파라미터 제어
│   └── style.css        # 프리미엄 디자인 시스템 (전역 변수 포함)
├── index.html           # 메인 구조 및 SEO 메타 태그
├── package.json         # 의존성 및 스크립트 설정
└── README.md            # 프로젝트 가이드 (현재 파일)
```

## 🚀 시작하기
아래 명령어를 통해 로컬 개발 서버를 실행할 수 있습니다.

```bash
# 의존성 설치 (필요시)
npm install

# 개발 서버 실행
npm run dev
```

## 💡 주요 기능 가이드

### 1. 동적 매칭 시스템 (URL Parameter)
매장별로 맞춤형 문구를 노출하기 위해 `shop` 파라미터를 사용합니다.
- **예시**: `http://localhost:5173/?shop=강남카페`
- **효과**: "지금 **강남카페**에 계신가요?"라는 문구로 자동 변경되며, 신청 폼의 유입 경로 필드에 자동으로 입력됩니다.

### 2. 디자인 변경
- **색상**: `src/style.css` 상단의 `:root` 변수에서 브랜드 컬러를 일괄 수정할 수 있습니다.
- **애니메이션**: `reveal` 클래스를 HTML 요소에 추가하면 스크롤 시 자동으로 부드럽게 나타나는 효과가 적용됩니다.

### 3. 광고 보상 (RSVP) 폼
- `src/main.js`의 `rsvpForm` 이벤트 리스너에서 데이터 제출 로직을 확장할 수 있습니다. (현재는 `alert`와 `console.log`로 구현됨)

---
**문의 및 확장**: 이 작업공간은 팀원들과 공유할 수 있도록 표준 Vite 구조를 따르고 있습니다. 추가적인 기능 개발(API 연동, 통계 분석 등)이 필요하면 자유롭게 확장하세요!
