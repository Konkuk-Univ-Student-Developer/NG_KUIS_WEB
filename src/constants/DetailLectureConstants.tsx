// Detail lecture schedule constants and types
// Keep sample data here until API integration

export interface ProfessorInfo {
  name: string;
  email: string;
  phone: string;
  consultationHours?: string;
}

export interface CompetencyGoals {
  coreCompetencyGoal: string;
  mainCompetency: string;
  mainCompetencyDefinition: string;
  subCompetency1: string;
  subCompetency1Definition: string;
  subCompetency2: string;
  subCompetency2Definition: string;
  competencyBasedGoal: string;
  jobCompetencies: string[];
}

export interface EvaluationItem {
  item: string;
  weight: string;
  maxScore: number;
  isPublic: boolean;
  description?: string;
  hasDetail?: boolean;
}

export interface Textbook {
  id: number;
  type: string;
  name: string;
  author: string;
  link: string;
}

export interface Assignment {
  id: number;
  type: string;
  name: string;
  dueDate: string;
}

export interface WeeklyPlan {
  week: number;
  dateRange: string;
  topic: string;
  instructor: string;
  activities: string;
  type: string;
  schedule: string;
}

export interface ChartData {
  bLearning: {
    online: number;
    offline: number;
  };
  coreCompetency: Array<{
    subject: string;
    value: number;
    fullMark: number;
  }>;
}

export interface LectureDetail {
  subjectCode: string; // e.g., '0312'
  subjectName: string; // e.g., '이산수학'
  subjectNameEng?: string; // English name
  courseCode?: string; // 학수번호 (e.g., BBAB67057)
  classification?: string; // 이수구분
  courseNumber?: string; // 4자리 과목번호 (e.g., 0702, 1203)
  subjectNumber?: string; // Legacy field - use courseNumber instead
  grade?: number; // 학년
  professor: string;
  professorInfo?: ProfessorInfo;
  credit: number;
  category?: string; // 전필/전선 등
  department?: string;
  evaluation?: string; // 절대평가 등
  room?: string;
  time?: string; // 요일/교시 문자열
  description?: string; // 과목 개요
  prerequisites?: string[];
  capacity?: number; // 제한인원
  enrolled?: number; // 현재인원
  undergraduateEnrolled?: number; // 학부인원
  graduateEnrolled?: number; // 대학원인원
  tags?: string[]; // 태그 목록
  competencyGoals?: CompetencyGoals;
  evaluationBreakdown?: Array<{ item: string; weight: number }>;
  evaluationItems?: EvaluationItem[];
  textbooks?: Textbook[];
  assignments?: Assignment[];
  weeklyPlans?: WeeklyPlan[];
  chartData?: ChartData;
  notices?: Array<{ id: string; title: string; date: string; isNew?: boolean }>;
  scheduleBlocks?: Array<{ day: string; start: string; end: string }>;
  rating?: number; // 강의 평점
}

// Minimal demo dataset keyed by courseCode (학수번호)
export const LECTURE_DETAILS: Record<string, LectureDetail> = {
  "BBAB12012": {
    subjectCode: "BBAB12012",
    subjectName: "분산시스템및컴퓨팅",
    subjectNameEng: "DISTRIBUTED SYSTEM & COMPUTING",
    courseCode: "BBAB12012",
    classification: "전선",
    courseNumber: "3143",
    subjectNumber: "3143", // Legacy field
    grade: 4,
    professor: "임민규",
    professorInfo: {
      name: "임민규 교수",
      email: "mingu@konkuk.ac.kr",
      phone: "010-1111-2222",
      consultationHours: "-"
    },
    credit: 3.0,
    category: "전선",
    department: "컴퓨터공학부",
    evaluation: "캡스톤(A/B/F제)",
    capacity: 46,
    enrolled: 45,
    undergraduateEnrolled: 45,
    graduateEnrolled: 0,
    tags: ["컴퓨터공학부", "캡스톤(A/B/F제)"],
    competencyGoals: {
      coreCompetencyGoal: "스스로 학습할 수 있는 역량",
      mainCompetency: "대규모 SW의 협동 개발 능력 (상)",
      mainCompetencyDefinition: "스스로 학습할 수 있는 역량",
      subCompetency1: "대규모 SW의 협동 개발 능력 (상)",
      subCompetency1Definition: "스스로 학습할 수 있는 역량",
      subCompetency2: "대규모 SW의 협동 개발 능력 (상)",
      subCompetency2Definition: "스스로 학습할 수 있는 역량",
      competencyBasedGoal: "대규모 SW의 협동 개발 능력 (상)",
      jobCompetencies: ["문제해결능력", "기술능력"]
    },
    evaluationItems: [
      { item: "출석률", weight: "10%", maxScore: 10, isPublic: true, description: "Checked with e-campus system", hasDetail: true },
      { item: "중간", weight: "10%", maxScore: 10, isPublic: true, hasDetail: false },
      { item: "기말", weight: "10%", maxScore: 10, isPublic: true, hasDetail: false },
      { item: "과제물", weight: "10%", maxScore: 10, isPublic: true, hasDetail: false },
      { item: "퀴즈", weight: "10%", maxScore: 10, isPublic: true, hasDetail: false },
      { item: "발표", weight: "10%", maxScore: 10, isPublic: true, hasDetail: false },
      { item: "프로젝트", weight: "10%", maxScore: 10, isPublic: true, hasDetail: false },
      { item: "토론", weight: "10%", maxScore: 10, isPublic: true, hasDetail: false },
      { item: "기타5", weight: "0%", maxScore: 0, isPublic: true, hasDetail: false }
    ],
    textbooks: [
      { id: 1, type: "10", name: "10", author: "10", link: "10" },
      { id: 2, type: "10", name: "10", author: "10", link: "10" },
      { id: 3, type: "10", name: "10", author: "10", link: "10" },
      { id: 4, type: "10", name: "10", author: "10", link: "10" }
    ],
    assignments: [
      { id: 1, type: "10", name: "10", dueDate: "10" }
    ],
    weeklyPlans: [
      {
        week: 1,
        dateRange: "0408-0414",
        topic: "3. Processes : Servers, code migration",
        instructor: "임민규",
        activities: "Implement project progress assignment",
        type: "Theory",
        schedule: "월01-04(녹화강의), 수01-04(신공1201)"
      },
      {
        week: 2,
        dateRange: "0408-0414",
        topic: "3. Processes : Servers, code migration",
        instructor: "임민규",
        activities: "Implement project progress assignment",
        type: "Theory",
        schedule: "월01-04(녹화강의), 수01-04(신공1201)"
      },
      {
        week: 3,
        dateRange: "0408-0414",
        topic: "3. Processes : Servers, code migration",
        instructor: "임민규",
        activities: "Implement project progress assignment",
        type: "Theory",
        schedule: "월01-04(녹화강의), 수01-04(신공1201)"
      }
    ],
    chartData: {
      bLearning: {
        online: 70,
        offline: 30
      },
      coreCompetency: [
        { subject: "창의역량", value: 80, fullMark: 100 },
        { subject: "종합사고역량", value: 60, fullMark: 100 },
        { subject: "학문탐구역량", value: 90, fullMark: 100 },
        { subject: "의사소통역량", value: 70, fullMark: 100 },
        { subject: "대인관계역량", value: 50, fullMark: 100 },
        { subject: "자기관리역량", value: 85, fullMark: 100 }
      ]
    }
  },
  "0312": {
    subjectCode: "0312",
    subjectName: "이산수학",
    professor: "박소영",
    credit: 3,
    category: "전선",
    department: "컴퓨터공학",
    evaluation: "절대평가 (A/B/F)",
    room: "새501",
    time: "화 09-12 / 목 09-12",
    description:
      "논리, 집합, 관계, 그래프 등 컴퓨터공학의 기초 수학 개념을 학습합니다.",
    prerequisites: ["대학수학"],
    capacity: 60,
    enrolled: 54,
    evaluationBreakdown: [
      { item: "중간고사", weight: 30 },
      { item: "기말고사", weight: 30 },
      { item: "과제", weight: 20 },
      { item: "퀴즈/출석", weight: 20 },
    ],
    scheduleBlocks: [
      { day: "화", start: "09:00", end: "12:00" },
      { day: "목", start: "09:00", end: "12:00" },
    ],
    notices: [
      { id: "n1", title: "1주차 강의자료 업로드", date: "2025-03-04", isNew: true },
      { id: "n2", title: "퀴즈 일정 공지", date: "2025-03-18" },
      { id: "n3", title: "중간고사 범위 및 유의사항", date: "2025-04-15" },
    ],
  },
  "0201": {
    subjectCode: "0201",
    subjectName: "자료구조",
    professor: "김철수",
    credit: 3,
    category: "전선",
    department: "컴퓨터공학",
    evaluation: "절대평가 (A/B/F)",
    room: "새502",
    time: "월 10-12 / 수 10-12",
    description: "선형/비선형 자료구조와 알고리즘의 기본을 학습합니다.",
    prerequisites: ["프로그래밍 기초"],
    capacity: 50,
    enrolled: 47,
    evaluationBreakdown: [
      { item: "중간고사", weight: 25 },
      { item: "기말고사", weight: 35 },
      { item: "과제", weight: 20 },
      { item: "실습", weight: 20 },
    ],
    scheduleBlocks: [
      { day: "월", start: "10:00", end: "12:00" },
      { day: "수", start: "10:00", end: "12:00" },
    ],
    notices: [
      { id: "n3", title: "실습 환경 안내", date: "2025-03-03", isNew: true },
      { id: "n4", title: "과제 1 제출 안내", date: "2025-03-10" },
    ],
  },
  "0401": {
    subjectCode: "0401",
    subjectName: "운영체제",
    professor: "이영희",
    credit: 3,
    category: "전필",
    department: "컴퓨터공학",
    evaluation: "상대평가",
    room: "새503",
    time: "화 13-15 / 목 13-15",
    description: "프로세스 관리, 메모리 관리, 파일 시스템 등 운영체제의 핵심 개념을 학습합니다.",
    prerequisites: ["컴퓨터구조", "시스템프로그래밍"],
    capacity: 45,
    enrolled: 43,
    evaluationBreakdown: [
      { item: "중간고사", weight: 35 },
      { item: "기말고사", weight: 35 },
      { item: "프로젝트", weight: 20 },
      { item: "출석", weight: 10 },
    ],
    scheduleBlocks: [
      { day: "화", start: "13:00", end: "15:00" },
      { day: "목", start: "13:00", end: "15:00" },
    ],
    notices: [
      { id: "n5", title: "프로젝트 팀 구성 안내", date: "2025-03-15", isNew: true },
    ],
  },
  "0501": {
    subjectCode: "0501",
    subjectName: "데이터베이스",
    professor: "박민수",
    credit: 3,
    category: "전필",
    department: "컴퓨터공학",
    evaluation: "절대평가 (A/B/F)",
    room: "새504",
    time: "월 15-17 / 수 15-17",
    description: "관계형 데이터베이스의 설계와 SQL, 트랜잭션 처리 등을 학습합니다.",
    prerequisites: ["자료구조"],
    capacity: 55,
    enrolled: 52,
    evaluationBreakdown: [
      { item: "중간고사", weight: 30 },
      { item: "기말고사", weight: 30 },
      { item: "프로젝트", weight: 25 },
      { item: "과제", weight: 15 },
    ],
    scheduleBlocks: [
      { day: "월", start: "15:00", end: "17:00" },
      { day: "수", start: "15:00", end: "17:00" },
    ],
    notices: [
      { id: "n6", title: "SQL 실습 환경 설정 가이드", date: "2025-03-05", isNew: true },
      { id: "n7", title: "1차 과제 공지", date: "2025-03-20" },
    ],
  },
};

export const DAYS_ORDER = ["월", "화", "수", "목", "금"] as const;

// 추가 샘플 데이터
export const SAMPLE_REVIEWS = [
  { id: 1, rating: 5, comment: "설명이 너무 잘 이해되고 좋아요!", author: "2023 수강생" },
  { id: 2, rating: 4, comment: "어렵지만 유익한 수업입니다.", author: "2023 수강생" },
];
