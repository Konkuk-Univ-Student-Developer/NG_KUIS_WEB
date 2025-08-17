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

// Sample dataset keyed by courseCode (학수번호)
export const LECTURE_DETAILS: Record<string, LectureDetail> = {
  "BBAB55841": {
    subjectCode: "BBAB55841",
    subjectName: "졸업프로젝트2(종합설계)",
    courseCode: "BBAB55841",
    courseNumber: "4126",
    professor: "정갑주",
    credit: 3,
    category: "전선",
    department: "컴퓨터공학부",
    grade: 4,
    time: "월15-18(공C487), 수15-18(공C487)",
    room: "공C487",
    capacity: 30,
    enrolled: 25,
    chartData: {
      bLearning: {
        online: 20,
        offline: 80
      },
      coreCompetency: [
        { subject: "창의역량", value: 90, fullMark: 100 },
        { subject: "종합사고역량", value: 85, fullMark: 100 },
        { subject: "학문탐구역량", value: 80, fullMark: 100 },
        { subject: "의사소통역량", value: 75, fullMark: 100 },
        { subject: "대인관계역량", value: 70, fullMark: 100 },
        { subject: "자기관리역량", value: 85, fullMark: 100 }
      ]
    },
    evaluationItems: [
      { item: "출석률", weight: "10%", maxScore: 10, isPublic: true, description: "Checked with e-campus system" },
      { item: "중간", weight: "30%", maxScore: 30, isPublic: true, description: "Checked with e-campus system" },
      { item: "기말", weight: "30%", maxScore: 30, isPublic: true, description: "Checked with e-campus system" },
      { item: "과제물", weight: "20%", maxScore: 20, isPublic: true, description: "Checked with e-campus system" },
      { item: "프로젝트", weight: "10%", maxScore: 10, isPublic: true, description: "Checked with e-campus system" }
    ]
  },
  "BBAB67656": {
    subjectCode: "BBAB67656",
    subjectName: "수치방법론",
    courseCode: "BBAB67656",
    courseNumber: "3198",
    professor: "차영운",
    credit: 3,
    category: "전선",
    department: "컴퓨터공학부",
    grade: 2,
    time: "화10-12(공B475), 목10-12(공B475)",
    room: "공B475",
    capacity: 40,
    enrolled: 35,
    chartData: {
      bLearning: {
        online: 30,
        offline: 70
      },
      coreCompetency: [
        { subject: "창의역량", value: 70, fullMark: 100 },
        { subject: "종합사고역량", value: 85, fullMark: 100 },
        { subject: "학문탐구역량", value: 90, fullMark: 100 },
        { subject: "의사소통역량", value: 60, fullMark: 100 },
        { subject: "대인관계역량", value: 50, fullMark: 100 },
        { subject: "자기관리역량", value: 75, fullMark: 100 }
      ]
    }
  },
  "BBAB67059": {
    subjectCode: "BBAB67059",
    subjectName: "전공심화프로젝트(종합설계)",
    courseCode: "BBAB67059",
    courseNumber: "3195",
    professor: "김두현",
    credit: 3,
    category: "전선",
    department: "컴퓨터공학부",
    grade: 3,
    time: "화11-14(새502), 목11-14(새502)",
    room: "새502",
    capacity: 30,
    enrolled: 28,
    chartData: {
      bLearning: {
        online: 25,
        offline: 75
      },
      coreCompetency: [
        { subject: "창의역량", value: 85, fullMark: 100 },
        { subject: "종합사고역량", value: 80, fullMark: 100 },
        { subject: "학문탐구역량", value: 75, fullMark: 100 },
        { subject: "의사소통역량", value: 80, fullMark: 100 },
        { subject: "대인관계역량", value: 85, fullMark: 100 },
        { subject: "자기관리역량", value: 80, fullMark: 100 }
      ]
    }
  },
  "BBAB67057": {
    subjectCode: "BBAB67057",
    subjectName: "전공기초프로젝트(종합설계)",
    courseCode: "BBAB67057",
    courseNumber: "3193",
    professor: "차리서",
    credit: 3,
    category: "전선",
    department: "컴퓨터공학부",
    grade: 2,
    time: "화13-16(새403), 금13-16(새403)",
    room: "새403",
    capacity: 30,
    enrolled: 27,
    chartData: {
      bLearning: {
        online: 20,
        offline: 80
      },
      coreCompetency: [
        { subject: "창의역량", value: 80, fullMark: 100 },
        { subject: "종합사고역량", value: 75, fullMark: 100 },
        { subject: "학문탐구역량", value: 70, fullMark: 100 },
        { subject: "의사소통역량", value: 75, fullMark: 100 },
        { subject: "대인관계역량", value: 80, fullMark: 100 },
        { subject: "자기관리역량", value: 75, fullMark: 100 }
      ]
    }
  },
  "BBAB67036": {
    subjectCode: "BBAB67036",
    subjectName: "컴퓨터네트워크2",
    courseCode: "BBAB67036",
    courseNumber: "3190",
    professor: "김기천",
    credit: 3,
    category: "전선",
    department: "컴퓨터공학부",
    grade: 3,
    time: "월04-06(공B475), 수04-06(공B475)",
    room: "공B475",
    capacity: 45,
    enrolled: 42,
    chartData: {
      bLearning: {
        online: 40,
        offline: 60
      },
      coreCompetency: [
        { subject: "창의역량", value: 65, fullMark: 100 },
        { subject: "종합사고역량", value: 80, fullMark: 100 },
        { subject: "학문탐구역량", value: 85, fullMark: 100 },
        { subject: "의사소통역량", value: 70, fullMark: 100 },
        { subject: "대인관계역량", value: 60, fullMark: 100 },
        { subject: "자기관리역량", value: 75, fullMark: 100 }
      ]
    }
  },
  "BBAB65264": {
    subjectCode: "BBAB65264",
    subjectName: "SIGNAL PROCESSING",
    courseCode: "BBAB65264",
    courseNumber: "3188",
    professor: "임창훈",
    credit: 3,
    category: "전선",
    department: "컴퓨터공학부",
    grade: 3,
    time: "화16-18(공B361), 목16-18(공B361)",
    room: "공B361",
    capacity: 40,
    enrolled: 35,
    chartData: {
      bLearning: {
        online: 35,
        offline: 65
      },
      coreCompetency: [
        { subject: "창의역량", value: 75, fullMark: 100 },
        { subject: "종합사고역량", value: 85, fullMark: 100 },
        { subject: "학문탐구역량", value: 90, fullMark: 100 },
        { subject: "의사소통역량", value: 65, fullMark: 100 },
        { subject: "대인관계역량", value: 55, fullMark: 100 },
        { subject: "자기관리역량", value: 70, fullMark: 100 }
      ]
    }
  },
  "BBAB62866": {
    subjectCode: "BBAB62866",
    subjectName: "기계학습",
    courseCode: "BBAB62866",
    courseNumber: "3186",
    professor: "민덕기",
    credit: 3,
    category: "전선",
    department: "컴퓨터공학부",
    grade: 3,
    time: "화10-12(신공1214), 목10-12(신공1214)",
    room: "신공1214",
    capacity: 50,
    enrolled: 48,
    chartData: {
      bLearning: {
        online: 45,
        offline: 55
      },
      coreCompetency: [
        { subject: "창의역량", value: 80, fullMark: 100 },
        { subject: "종합사고역량", value: 90, fullMark: 100 },
        { subject: "학문탐구역량", value: 95, fullMark: 100 },
        { subject: "의사소통역량", value: 70, fullMark: 100 },
        { subject: "대인관계역량", value: 60, fullMark: 100 },
        { subject: "자기관리역량", value: 75, fullMark: 100 }
      ]
    }
  },
  "BBAB62735": {
    subjectCode: "BBAB62735",
    subjectName: "인공지능",
    courseCode: "BBAB62735",
    courseNumber: "3185",
    professor: "김은이",
    credit: 3,
    category: "전선",
    department: "컴퓨터공학부",
    grade: 3,
    time: "월10-12(신공104), 수10-12(신공104)",
    room: "신공104",
    capacity: 60,
    enrolled: 58,
    chartData: {
      bLearning: {
        online: 40,
        offline: 60
      },
      coreCompetency: [
        { subject: "창의역량", value: 85, fullMark: 100 },
        { subject: "종합사고역량", value: 90, fullMark: 100 },
        { subject: "학문탐구역량", value: 95, fullMark: 100 },
        { subject: "의사소통역량", value: 75, fullMark: 100 },
        { subject: "대인관계역량", value: 65, fullMark: 100 },
        { subject: "자기관리역량", value: 80, fullMark: 100 }
      ]
    }
  },
  "BBAB62251": {
    subjectCode: "BBAB62251",
    subjectName: "객체지향개발방법론",
    courseCode: "BBAB62251",
    courseNumber: "3184",
    professor: "유준범",
    credit: 3,
    category: "전선",
    department: "컴퓨터공학부",
    grade: 3,
    time: "월05-08(새502), 금05-08(새502)",
    room: "새502",
    capacity: 35,
    enrolled: 32,
    chartData: {
      bLearning: {
        online: 30,
        offline: 70
      },
      coreCompetency: [
        { subject: "창의역량", value: 75, fullMark: 100 },
        { subject: "종합사고역량", value: 85, fullMark: 100 },
        { subject: "학문탐구역량", value: 80, fullMark: 100 },
        { subject: "의사소통역량", value: 80, fullMark: 100 },
        { subject: "대인관계역량", value: 75, fullMark: 100 },
        { subject: "자기관리역량", value: 80, fullMark: 100 }
      ]
    }
  },
  "BBAB59453": {
    subjectCode: "BBAB59453",
    subjectName: "컴퓨터구조",
    courseCode: "BBAB59453",
    courseNumber: "3183",
    professor: "박능수",
    credit: 3,
    category: "전선",
    department: "컴퓨터공학부",
    grade: 3,
    time: "월13-15(공B352), 수13-15(공B352)",
    room: "공B352",
    capacity: 50,
    enrolled: 47,
    chartData: {
      bLearning: {
        online: 25,
        offline: 75
      },
      coreCompetency: [
        { subject: "창의역량", value: 70, fullMark: 100 },
        { subject: "종합사고역량", value: 85, fullMark: 100 },
        { subject: "학문탐구역량", value: 90, fullMark: 100 },
        { subject: "의사소통역량", value: 65, fullMark: 100 },
        { subject: "대인관계역량", value: 55, fullMark: 100 },
        { subject: "자기관리역량", value: 75, fullMark: 100 }
      ]
    }
  },
  "BBAB59069": {
    subjectCode: "BBAB59069",
    subjectName: "클라우드IOT서비스",
    courseCode: "BBAB59069",
    courseNumber: "3180",
    professor: "정갑주",
    credit: 3,
    category: "전선",
    department: "컴퓨터공학부",
    grade: 4,
    time: "화15-18(공B475), 목15-18(공B475)",
    room: "공B475",
    capacity: 35,
    enrolled: 30,
    chartData: {
      bLearning: {
        online: 50,
        offline: 50
      },
      coreCompetency: [
        { subject: "창의역량", value: 85, fullMark: 100 },
        { subject: "종합사고역량", value: 80, fullMark: 100 },
        { subject: "학문탐구역량", value: 85, fullMark: 100 },
        { subject: "의사소통역량", value: 75, fullMark: 100 },
        { subject: "대인관계역량", value: 70, fullMark: 100 },
        { subject: "자기관리역량", value: 80, fullMark: 100 }
      ]
    }
  }
};

export const DAYS_ORDER = ["월", "화", "수", "목", "금"] as const;

// 추가 샘플 데이터
export const SAMPLE_REVIEWS = [
  { id: 1, rating: 5, comment: "설명이 너무 잘 이해되고 좋아요!", author: "2023 수강생" },
  { id: 2, rating: 4, comment: "어렵지만 유익한 수업입니다.", author: "2023 수강생" },
];
