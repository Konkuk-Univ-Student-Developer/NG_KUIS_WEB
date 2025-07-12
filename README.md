# NG KUIS WEB - 학생 정보 시스템

Figma 디자인을 기반으로 한 학생 정보 시스템의 공통 UI 컴포넌트 라이브러리입니다.

## 🎯 프로젝트 개요

이 프로젝트는 학생 정보 시스템을 위한 재사용 가능한 UI 컴포넌트들을 제공합니다. Figma 디자인 시스템을 React + TypeScript + Tailwind CSS + shadcn/ui로 구현했습니다.

## 🛠️ 기술 스택

- **React 19** - UI 라이브러리
- **TypeScript** - 타입 안정성
- **Tailwind CSS v4** - 스타일링
- **shadcn/ui** - 기본 UI 컴포넌트
- **Vite** - 빌드 도구
- **Lucide React** - 아이콘

## 🎨 디자인 시스템

### 색상 팔레트

- `--darkgreen`: #036B3F (기본 브랜드 색상)
- `--black`: #000000 (메인 텍스트)
- `--beige`: #EEF0E4 (배경 색상)
- `--white`: #FFFFFF (카드 배경)
- `--darkgray`: #656F76 (보조 텍스트)
- `--lightgray`: #ECEBE3 (경계선)
- `--orange`: #F0A704 (강조 색상)
- `--coolgray`: #B1B3B4 (비활성 색상)

### 타이포그래피

- `mobile-logo-regular`: 12px, 400 weight
- `mobile-small-bold`: 16px, 600 weight
- `mobile-medium-bold`: 18px, 700 weight
- `mobile-extrasmall-bold`: 10px, 700 weight
- `mobile-medium-regular`: 18px, 400 weight
- `mobile-small-regular`: 14px, 400 weight
- `mobile-extrasmall-regular`: 10px, 400 weight

## 📦 공통 컴포넌트

### 기본 컴포넌트

- **Button** - 다양한 스타일의 버튼 (기본, 아웃라인, 다크그린 등)
- **SearchInput** - 검색 아이콘이 포함된 입력 필드
- **StatusBadge** - 상태 표시 배지 (활성, 비활성, 대기, 완료, 오류)

### 복합 컴포넌트

- **CourseCard** - 강의 정보 카드
- **DataTable** - 데이터 테이블
- **Navigation** - 사이드바 네비게이션
- **QuickMenu** - 빠른 메뉴 컴포넌트

## 🚀 설치 및 실행

```bash
# 종속성 설치
pnpm install

# 개발 서버 실행
pnpm dev

# 빌드
pnpm build
```

## 📁 프로젝트 구조

```
src/
├── components/
│   ├── common/          # 공통 컴포넌트
│   │   ├── Button.tsx
│   │   ├── CourseCard.tsx
│   │   ├── DataTable.tsx
│   │   ├── SearchInput.tsx
│   │   ├── QuickMenu.tsx
│   │   ├── StatusBadge.tsx
│   │   ├── Navigation.tsx
│   │   └── index.ts
│   └── ui/             # shadcn/ui 컴포넌트
│       ├── button.tsx
│       ├── card.tsx
│       ├── input.tsx
│       ├── badge.tsx
│       └── table.tsx
├── lib/
│   └── utils.ts        # 유틸리티 함수
├── App.tsx             # 메인 앱 컴포넌트
├── main.tsx           # 앱 진입점
└── globals.css        # 전역 스타일
```

## 🎯 사용 예시

### 기본 컴포넌트 사용

```tsx
import { Button, CourseCard, DataTable } from '@/components/common';

// 버튼 사용
<Button variant="darkgreen">강의 등록</Button>
<Button variant="outline">성적 조회</Button>

// 강의 카드 사용
<CourseCard
  title="웹 프로그래밍 기초"
  instructor="김교수"
  semester="2024-2"
  credits={3}
  code="CSE101"
  time="월 1,2교시"
  isRequired={true}
/>

// 데이터 테이블 사용
<DataTable
  columns={[
    { key: 'name', label: '이름' },
    { key: 'grade', label: '성적' }
  ]}
  data={[
    { name: '홍길동', grade: 'A+' },
    { name: '김철수', grade: 'B+' }
  ]}
/>
```

### 네비게이션 사용

```tsx
import { Navigation } from "@/components/common";
import { BookOpen, FileText } from "lucide-react";

<Navigation
  items={[
    {
      id: "courses",
      label: "강의",
      icon: <BookOpen size={20} />,
      isActive: true,
    },
    {
      id: "grades",
      label: "성적",
      icon: <FileText size={20} />,
    },
  ]}
  logo={<div>로고</div>}
/>;
```

## 🔧 개발 가이드

### 새로운 컴포넌트 추가

1. `src/components/common/` 디렉토리에 새 컴포넌트 파일 생성
2. TypeScript 인터페이스 정의
3. 디자인 시스템 색상 및 타이포그래피 클래스 사용
4. `src/components/common/index.ts`에 export 추가

### 스타일링 가이드

- CSS 변수 사용: `var(--darkgreen)`, `var(--black)` 등
- 타이포그래피 클래스 사용: `mobile-small-bold`, `mobile-extrasmall-regular` 등
- Tailwind CSS 유틸리티 클래스와 함께 사용

## 🏆 완성된 TODO List

### ✅ 프로젝트 초기 설정

- ✅ shadcn/ui 설치 및 설정
- ✅ 공통 컴포넌트 디렉토리 구조 생성
- ✅ 디자인 시스템 색상 및 타이포그래피 정의
- ✅ 공통 CSS 변수 및 유틸리티 클래스 추가

### ✅ 기본 UI 컴포넌트 생성

- ✅ Button 컴포넌트 (primary, secondary, outline, darkgreen variants)
- ✅ Input 컴포넌트 (SearchInput with icon)
- ✅ Badge 컴포넌트 (StatusBadge with different states)

### ✅ 복합 컴포넌트 생성

- ✅ DataTable 컴포넌트 (데이터 테이블)
- ✅ Navigation 컴포넌트 (사이드바)
- ✅ CourseCard 컴포넌트 (강의 카드)
- ✅ QuickMenu 컴포넌트

### ✅ 스타일링 및 최적화

- ✅ Figma 디자인 시스템 색상 적용
- ✅ 타이포그래피 클래스 정의
- ✅ 컴포넌트 통합 및 예제 페이지 생성
- ✅ 반응형 디자인 적용
- ✅ 프로젝트 문서화 완료

## 📄 라이선스

이 프로젝트는 MIT 라이선스 하에 있습니다.

---

개발자: 학개팀 (Konkuk University Student Developer)
