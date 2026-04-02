# react-sample

Next.js 기반 React 샘플 프로젝트입니다.

---

## 프로젝트 구조

```
react-sample/
├── src/
│   ├── app/
│   │   ├── login/
│   │   │   └── page.tsx        # 로그인 페이지
│   │   ├── list/
│   │   │   └── page.tsx        # 목록 조회 페이지 (페이징 포함)
│   │   ├── layout.tsx          # 공통 레이아웃
│   │   ├── page.tsx            # 루트 페이지 (/ 경로)
│   │   ├── globals.css         # 전역 스타일
│   │   └── favicon.ico         # 브라우저 탭 아이콘
│   └── components/
│       └── DetailPopup.tsx     # 상세 조회 팝업 컴포넌트
├── public/                     # 정적 파일 (이미지, SVG 등)
├── next.config.ts              # Next.js 설정
├── tsconfig.json               # TypeScript 설정
├── eslint.config.mjs           # ESLint 설정
├── postcss.config.mjs          # PostCSS 설정
├── package.json                # 패키지 정보 및 스크립트
└── README.md
```

---

## 페이지 흐름

```
/ (루트)
  └── /login (로그인 페이지)
        └── 로그인 성공 시 → /list (목록 조회 페이지)
                               └── 행 더블 클릭 시 → DetailPopup (상세 팝업)
```

---

## 설치 및 실행

### 사전 요구사항

- [Node.js](https://nodejs.org) 설치 필요

```bash
# Node.js 설치 확인
node -v

# npm 버전 확인
npm -v
```

### 프로젝트 생성 (최초 1회)

```bash
# 원하는 경로로 이동
cd C:\Users\account\cowork

# Next.js 프로젝트 생성
npx create-next-app@latest react-sample

# 프로젝트 폴더로 이동
cd react-sample

# 추가 패키지 설치
npm install react-paginate
```

### 개발 서버 실행

```bash
npm run dev
```

브라우저에서 [http://localhost:3000](http://localhost:3000) 접속

### 서버 종료

터미널에서 `Ctrl + C`

---

## 주요 명령어

| 명령어 | 설명 |
|--------|------|
| `npm run dev` | 개발 서버 실행 |
| `npm run build` | 프로덕션 빌드 |
| `npm run start` | 빌드 결과물 실행 |
| `npm run lint` | 코드 품질 검사 |
| `npm install 패키지명` | 새 패키지 추가 |

---

## 사용 기술

| 기술 | 버전 | 설명 |
|------|------|------|
| Next.js | 16.x | React 프레임워크 |
| React | 19.x | UI 라이브러리 |
| TypeScript | 5.x | 타입 안정성 |
| Tailwind CSS | 4.x | CSS 유틸리티 |
| react-paginate | 8.x | 페이징 라이브러리 |
