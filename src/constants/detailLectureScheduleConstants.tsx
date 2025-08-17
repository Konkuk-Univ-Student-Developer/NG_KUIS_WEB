// Detail lecture schedule constants and types
// Keep sample data here until API integration

export interface LectureDetail {
  subjectCode: string; // e.g., '0312'
  subjectName: string; // e.g., '이산수학'
  professor: string;
  credit: number;
  category?: string; // 전필/전선 등
  department?: string;
  evaluation?: string; // 절대평가 등
  room?: string;
  time?: string; // 요일/교시 문자열
  description?: string; // 과목 개요
  prerequisites?: string[];
  capacity?: number;
  enrolled?: number;
  evaluationBreakdown?: Array<{ item: string; weight: number }>;
  notices?: Array<{ id: string; title: string; date: string; isNew?: boolean }>;
  scheduleBlocks?: Array<{ day: string; start: string; end: string }>;
  rating?: number; // 강의 평점
}

// Minimal demo dataset keyed by subjectCode
export const LECTURE_DETAILS: Record<string, LectureDetail> = {
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
