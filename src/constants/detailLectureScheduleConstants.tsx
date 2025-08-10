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
  notices?: Array<{ id: string; title: string; date: string }>;
  scheduleBlocks?: Array<{ day: string; start: string; end: string }>;
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
      { id: "n1", title: "1주차 강의자료 업로드", date: "2025-03-04" },
      { id: "n2", title: "퀴즈 일정 공지", date: "2025-03-18" },
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
      { id: "n3", title: "실습 환경 안내", date: "2025-03-03" },
    ],
  },
};

export const DAYS_ORDER = ["월", "화", "수", "목", "금"] as const;
