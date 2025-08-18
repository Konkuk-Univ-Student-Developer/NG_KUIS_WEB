// Course 데이터 타입 정의 (API 응답 형태에 맞춤)
export interface CourseData {
  grade: number;
  subjectCode: string;
  subjectName: string;
  credit: number;
  professor: string;
  room: string;
  time?: string;
  // Added for UI tags/metadata
  category?: string; // e.g., 전필/전선 등
  department?: string; // e.g., 컴퓨터공학
  evaluation?: string; // e.g., 절대평가 (A/B/F)
}

// API 응답 타입 정의
export interface ApiResponse {
  content: CourseData[];
  pageable: {
    pageNumber: number;
    pageSize: number;
    offset: number;
  };
  totalPages: number;
  totalElements: number;
  first: boolean;
  last: boolean;
  empty: boolean;
}

// 더미 데이터들
export const YEAR_OPTIONS = ['2024', '2025'];
export const SEMESTER_OPTIONS = ['1학기', '2학기', '하계 계절학기', '동계 계절학기'];
export const CATEGORY_OPTIONS = ['전필', '전선', '반교', '선교', '지필', '지교', '일선', '교직', '전기', '기교', '핵교', '일교', '심교', '융필', '융선'];

export const COURSE_DATA: CourseData[] = [
  {
    grade: 1,
    subjectCode: '0312',
    subjectName: '이산수학',
    credit: 3,
    professor: '박소영',
    room: '새501',
    time: '화 09-12 / 목 09-12',
    category: '전선',
    department: '컴퓨터공학',
    evaluation: '절대평가 (A/B/F)'
  },
  {
    grade: 2,
    subjectCode: '0201',
    subjectName: '자료구조',
    credit: 3,
    professor: '김철수',
    room: '새502',
    time: '월 10-12 / 수 10-12',
    category: '전선',
    department: '컴퓨터공학',
    evaluation: '절대평가 (A/B/F)'
  },
  {
    grade: 3,
    subjectCode: '0305',
    subjectName: '데이터베이스',
    credit: 3,
    professor: '이영희',
    room: '새503',
    time: '월 14-16 / 수 14-16',
    category: '전선',
    department: '컴퓨터공학',
    evaluation: '절대평가 (A/B/F)'
  },
  {
    grade: 2,
    subjectCode: '0220',
    subjectName: '운영체제',
    credit: 3,
    professor: '박민수',
    room: '새504',
    time: '화 14-16 / 목 14-16',
    category: '전선',
    department: '컴퓨터공학',
    evaluation: '절대평가 (A/B/F)'
  },
  {
    grade: 3,
    subjectCode: '0315',
    subjectName: '알고리즘',
    credit: 3,
    professor: '정수현',
    room: '새505',
    time: '월 16-18 / 수 16-18',
    category: '전선',
    department: '컴퓨터공학',
    evaluation: '절대평가 (A/B/F)'
  },
  {
    grade: 4,
    subjectCode: '0401',
    subjectName: '캡스톤디자인',
    credit: 3,
    professor: '최교수',
    room: '새506',
    time: '목 16-19',
    category: '전선',
    department: '컴퓨터공학',
    evaluation: '절대평가 (A/B/F)'
  }
];

// 더미 API 응답 데이터
export const MOCK_API_RESPONSE: ApiResponse = {
  content: COURSE_DATA,
  pageable: {
    pageNumber: 0,
    pageSize: 10,
    offset: 0
  },
  totalPages: 10,
  totalElements: 100,
  first: true,
  last: false,
  empty: false
};

// Desktop timetable data
export const DAYS = ['월', '화', '수', '목', '금'];
export const TIMES = ['9:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00'];

export const SCHEDULE: Record<string, Array<{ time: string; name: string; location: string; professor: string; color: string; }>> = {
  월: [
    { time: '9:00-10:30', name: '데이터베이스', location: '새천년관 1203호', professor: '김교수', color: 'bg-blue-100 border-blue-300' },
    { time: '14:00-15:30', name: '알고리즘', location: '새천년관 1101호', professor: '박교수', color: 'bg-green-100 border-green-300' }
  ],
  화: [
    { time: '11:00-12:30', name: '운영체제', location: '공학관 A동 405호', professor: '이교수', color: 'bg-purple-100 border-purple-300' }
  ],
  수: [
    { time: '9:00-10:30', name: '데이터베이스', location: '새천년관 1203호', professor: '김교수', color: 'bg-blue-100 border-blue-300' },
    { time: '14:00-15:30', name: '알고리즘', location: '새천년관 1101호', professor: '박교수', color: 'bg-green-100 border-green-300' }
  ],
  목: [
    { time: '11:00-12:30', name: '운영체제', location: '공학관 A동 405호', professor: '이교수', color: 'bg-purple-100 border-purple-300' },
    { time: '15:00-17:00', name: '캡스톤디자인', location: '새천년관 2301호', professor: '최교수', color: 'bg-orange-100 border-orange-300' }
  ],
  금: []
};

export const COURSE_LIST = [
  { name: '데이터베이스', code: 'CS301', credit: 3, professor: '김교수', time: '월,수 09:00-10:30' },
  { name: '운영체제', code: 'CS302', credit: 3, professor: '이교수', time: '화,목 11:00-12:30' },
  { name: '알고리즘', code: 'CS303', credit: 3, professor: '박교수', time: '월,수 14:00-15:30' },
  { name: '캡스톤디자인', code: 'CS401', credit: 3, professor: '최교수', time: '목 15:00-17:00' }
];
