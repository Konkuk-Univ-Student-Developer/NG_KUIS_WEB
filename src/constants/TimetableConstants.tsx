// Course 데이터 타입 정의 (API 응답 형태에 맞춤)
export interface CourseData {
  id: number;
  courseCode: string;
  courseName: string;
  professor: string;
  schedule: string;
  courseNumber: string;
  courseCategory: string;
  grade: number;
  departmentName: string;
  method: string;
  credit?: number; // 학점은 API에 없지만 필요할 수 있음
}

// API 응답 타입 정의
export interface ApiResponse {
  totalElements: number;
  totalPages: number;
  first: boolean;
  last: boolean;
  size: number;
  content: CourseData[];
  number: number;
  sort: {
    empty: boolean;
    sorted: boolean;
    unsorted: boolean;
  };
  numberOfElements: number;
  pageable: {
    pageNumber: number;
    pageSize: number;
    sort: {
      empty: boolean;
      sorted: boolean;
      unsorted: boolean;
    };
    offset: number;
    paged: boolean;
    unpaged: boolean;
  };
  empty: boolean;
}

// 더미 데이터들
export const YEAR_OPTIONS = ['2024', '2025'];
export const SEMESTER_OPTIONS = ['1학기', '2학기', '하계 계절학기', '동계 계절학기'];
export const CATEGORY_OPTIONS = ['전필', '전선', '반교', '선교', '지필', '지교', '일선', '교직', '전기', '기교', '핵교', '일교', '심교', '융필', '융선'];

export const COURSE_DATA: CourseData[] = [
  {
    id: 4841,
    courseCode: "BBAB55841",
    courseName: "졸업프로젝트2(종합설계)",
    professor: "정갑주",
    schedule: "월15-18(공C487), 수15-18(공C487)",
    courseNumber: "1203103",
    courseCategory: "전선",
    grade: 4,
    departmentName: "컴퓨터공학부",
    method: "실험+실습+실기",
    credit: 3
  },
  {
    id: 4840,
    courseCode: "BBAB55841",
    courseName: "졸업프로젝트2(종합설계)",
    professor: "김두현",
    schedule: "화15-18(신공1213), 목15-18(신공1213)",
    courseNumber: "1203103",
    courseCategory: "전선",
    grade: 4,
    departmentName: "컴퓨터공학부",
    method: "실험+실습+실기",
    credit: 3
  },
  {
    id: 4061,
    courseCode: "BBAB67656",
    courseName: "수치방법론",
    professor: "차영운",
    schedule: "화10-12(공B475), 목10-12(공B475)",
    courseNumber: "702107",
    courseCategory: "전선",
    grade: 2,
    departmentName: "컴퓨터공학부",
    method: "이론",
    credit: 3
  },
  {
    id: 4060,
    courseCode: "BBAB67656",
    courseName: "수치방법론",
    professor: "차영운",
    schedule: "화07-09(공A602), 목07-09(공B352)",
    courseNumber: "702107",
    courseCategory: "전선",
    grade: 2,
    departmentName: "컴퓨터공학부",
    method: "이론",
    credit: 3
  },
  {
    id: 4059,
    courseCode: "BBAB67059",
    courseName: "전공심화프로젝트(종합설계)",
    professor: "김두현",
    schedule: "화11-14(새502), 목11-14(새502)",
    courseNumber: "9900108",
    courseCategory: "전선",
    grade: 3,
    departmentName: "컴퓨터공학부",
    method: "실험+실습+실기",
    credit: 3
  },
  {
    id: 4058,
    courseCode: "BBAB67059",
    courseName: "전공심화프로젝트(종합설계)",
    professor: "김두현",
    schedule: "화03-06(새502), 목03-06(새502)",
    courseNumber: "9900108",
    courseCategory: "전선",
    grade: 3,
    departmentName: "컴퓨터공학부",
    method: "실험+실습+실기",
    credit: 3
  },
  {
    id: 4057,
    courseCode: "BBAB67057",
    courseName: "전공기초프로젝트(종합설계)",
    professor: "차리서",
    schedule: "화13-16(새403), 금13-16(새403)",
    courseNumber: "9900107",
    courseCategory: "전선",
    grade: 2,
    departmentName: "컴퓨터공학부",
    method: "실험+실습+실기",
    credit: 3
  },
  {
    id: 4056,
    courseCode: "BBAB67057",
    courseName: "전공기초프로젝트(종합설계)",
    professor: "차리서",
    schedule: "화09-12(새403), 금09-12(새403)",
    courseNumber: "9900107",
    courseCategory: "전선",
    grade: 2,
    departmentName: "컴퓨터공학부",
    method: "실험+실습+실기",
    credit: 3
  },
  {
    id: 4055,
    courseCode: "BBAB67057",
    courseName: "전공기초프로젝트(종합설계)",
    professor: "차리서",
    schedule: "화05-08(새403), 금05-08(새403)",
    courseNumber: "9900107",
    courseCategory: "전선",
    grade: 2,
    departmentName: "컴퓨터공학부",
    method: "실험+실습+실기",
    credit: 3
  },
  {
    id: 4054,
    courseCode: "BBAB67036",
    courseName: "컴퓨터네트워크2",
    professor: "김기천",
    schedule: "월04-06(공B475), 수04-06(공B475)",
    courseNumber: "701103",
    courseCategory: "전선",
    grade: 3,
    departmentName: "컴퓨터공학부",
    method: "이론",
    credit: 3
  },
  {
    id: 4053,
    courseCode: "BBAB67036",
    courseName: "컴퓨터네트워크2",
    professor: "김기천",
    schedule: "월01-03(공B475), 수01-03(공B475)",
    courseNumber: "701103",
    courseCategory: "전선",
    grade: 3,
    departmentName: "컴퓨터공학부",
    method: "이론",
    credit: 3
  },
  {
    id: 4052,
    courseCode: "BBAB65264",
    courseName: "SIGNAL PROCESSING",
    professor: "임창훈",
    schedule: "화16-18(공B361), 목16-18(공B361)",
    courseNumber: "1400106",
    courseCategory: "전선",
    grade: 3,
    departmentName: "컴퓨터공학부",
    method: "이론",
    credit: 3
  },
  {
    id: 4051,
    courseCode: "BBAB65264",
    courseName: "SIGNAL PROCESSING",
    professor: "임창훈",
    schedule: "화13-15(공B361), 목13-15(공B361)",
    courseNumber: "1400106",
    courseCategory: "전선",
    grade: 3,
    departmentName: "컴퓨터공학부",
    method: "이론",
    credit: 3
  },
  {
    id: 4050,
    courseCode: "BBAB62866",
    courseName: "기계학습",
    professor: "민덕기",
    schedule: "화10-12(신공1214), 목10-12(신공1214)",
    courseNumber: "1101105",
    courseCategory: "전선",
    grade: 3,
    departmentName: "컴퓨터공학부",
    method: "이론",
    credit: 3
  },
  {
    id: 4049,
    courseCode: "BBAB62735",
    courseName: "인공지능",
    professor: "김은이",
    schedule: "월10-12(신공104), 수10-12(신공104)",
    courseNumber: "1100106",
    courseCategory: "전선",
    grade: 3,
    departmentName: "컴퓨터공학부",
    method: "이론",
    credit: 3
  },
  {
    id: 4048,
    courseCode: "BBAB62251",
    courseName: "객체지향개발방법론",
    professor: "유준범",
    schedule: "월05-08(새502), 금05-08(새502)",
    courseNumber: "1004101",
    courseCategory: "전선",
    grade: 3,
    departmentName: "컴퓨터공학부",
    method: "이론+실습",
    credit: 3
  },
  {
    id: 4047,
    courseCode: "BBAB59453",
    courseName: "컴퓨터구조",
    professor: "박능수",
    schedule: "월13-15(공B352), 수13-15(공B352)",
    courseNumber: "300101",
    courseCategory: "전선",
    grade: 3,
    departmentName: "컴퓨터공학부",
    method: "이론",
    credit: 3
  },
  {
    id: 4046,
    courseCode: "BBAB59453",
    courseName: "컴퓨터구조",
    professor: "박능수",
    schedule: "월10-12(공B352), 수10-12(공B352)",
    courseNumber: "300101",
    courseCategory: "전선",
    grade: 3,
    departmentName: "컴퓨터공학부",
    method: "이론",
    credit: 3
  },
  {
    id: 4045,
    courseCode: "BBAB59453",
    courseName: "컴퓨터구조",
    professor: "박능수",
    schedule: "월04-06(공B352), 수04-06(공B352)",
    courseNumber: "300101",
    courseCategory: "전선",
    grade: 3,
    departmentName: "컴퓨터공학부",
    method: "이론",
    credit: 3
  },
  {
    id: 4044,
    courseCode: "BBAB59069",
    courseName: "클라우드IOT서비스",
    professor: "정갑주",
    schedule: "화15-18(공B475), 목15-18(공B475)",
    courseNumber: "803103",
    courseCategory: "전선",
    grade: 4,
    departmentName: "컴퓨터공학부",
    method: "이론+실습",
    credit: 3
  }
];

// 더미 API 응답 데이터
export const MOCK_API_RESPONSE: ApiResponse = {
  totalElements: 67,
  totalPages: 4,
  first: true,
  last: false,
  size: 20,
  content: COURSE_DATA,
  number: 0,
  sort: {
    empty: false,
    sorted: true,
    unsorted: false
  },
  numberOfElements: 20,
  pageable: {
    pageNumber: 0,
    pageSize: 20,
    sort: {
      empty: false,
      sorted: true,
      unsorted: false
    },
    offset: 0,
    paged: true,
    unpaged: false
  },
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