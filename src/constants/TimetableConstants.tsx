// Course 데이터 타입 정의 (API 응답 형태에 맞춤)
export interface CourseData {
  id: number;
  courseCode: string;     // 학수번호 (e.g., BBAB67057)
  courseName: string;
  professor: string;
  schedule: string;
  courseNumber: string;   // 4자리 과목번호 (e.g., 0702, 1203)
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
export const SEMESTER_OPTIONS = ['1학기', '하계 계절학기', '2학기', '동계 계절학기'];
export const CATEGORY_OPTIONS = ['전필', '전선', '반교', '선교', '지필', '지교', '일선', '교직', '전기', '기교', '핵교', '일교', '심교', '융필', '융선'];

export const COURSE_DATA: CourseData[] = [
  {
    id: 4805,
    courseCode: "BBAB55841",
    courseName: "졸업프로젝트2(종합설계)",
    professor: "정갑주",
    schedule: "월15-18(공C487), 수15-18(공C487)",
    courseNumber: "4126",
    courseCategory: "전선",
    grade: 4,
    departmentName: "컴퓨터공학부",
    method: "실험+실습+실기",
    credit: 3
  },
  {
    id: 4804,
    courseCode: "BBAB55841",
    courseName: "졸업프로젝트2(종합설계)",
    professor: "김두현",
    schedule: "화15-18(신공1213), 목15-18(신공1213)",
    courseNumber: "4125",
    courseCategory: "전선",
    grade: 4,
    departmentName: "컴퓨터공학부",
    method: "실험+실습+실기",
    credit: 3
  },
  {
    id: 4025,
    courseCode: "BBAB67656",
    courseName: "수치방법론",
    professor: "차영운",
    schedule: "화10-12(공B475), 목10-12(공B475)",
    courseNumber: "3198",
    courseCategory: "전선",
    grade: 2,
    departmentName: "컴퓨터공학부",
    method: "이론",
    credit: 3
  },
  {
    id: 4024,
    courseCode: "BBAB67656",
    courseName: "수치방법론",
    professor: "차영운",
    schedule: "화07-09(공A602), 목07-09(공B352)",
    courseNumber: "3197",
    courseCategory: "전선",
    grade: 2,
    departmentName: "컴퓨터공학부",
    method: "이론",
    credit: 3
  },
  {
    id: 4023,
    courseCode: "BBAB67059",
    courseName: "전공심화프로젝트(종합설계)",
    professor: "김두현",
    schedule: "화11-14(새502), 목11-14(새502)",
    courseNumber: "3195",
    courseCategory: "전선",
    grade: 3,
    departmentName: "컴퓨터공학부",
    method: "실험+실습+실기",
    credit: 3
  },
  {
    id: 4022,
    courseCode: "BBAB67059",
    courseName: "전공심화프로젝트(종합설계)",
    professor: "김두현",
    schedule: "화03-06(새502), 목03-06(새502)",
    courseNumber: "3194",
    courseCategory: "전선",
    grade: 3,
    departmentName: "컴퓨터공학부",
    method: "실험+실습+실기",
    credit: 3
  },
  {
    id: 4021,
    courseCode: "BBAB67057",
    courseName: "전공기초프로젝트(종합설계)",
    professor: "차리서",
    schedule: "화13-16(새403), 금13-16(새403)",
    courseNumber: "3193",
    courseCategory: "전선",
    grade: 2,
    departmentName: "컴퓨터공학부",
    method: "실험+실습+실기",
    credit: 3
  },
  {
    id: 4020,
    courseCode: "BBAB67057",
    courseName: "전공기초프로젝트(종합설계)",
    professor: "차리서",
    schedule: "화09-12(새403), 금09-12(새403)",
    courseNumber: "3192",
    courseCategory: "전선",
    grade: 2,
    departmentName: "컴퓨터공학부",
    method: "실험+실습+실기",
    credit: 3
  },
  {
    id: 4019,
    courseCode: "BBAB67057",
    courseName: "전공기초프로젝트(종합설계)",
    professor: "차리서",
    schedule: "화05-08(새403), 금05-08(새403)",
    courseNumber: "3191",
    courseCategory: "전선",
    grade: 2,
    departmentName: "컴퓨터공학부",
    method: "실험+실습+실기",
    credit: 3
  },
  {
    id: 4018,
    courseCode: "BBAB67036",
    courseName: "컴퓨터네트워크2",
    professor: "김기천",
    schedule: "월04-06(공B475), 수04-06(공B475)",
    courseNumber: "3190",
    courseCategory: "전선",
    grade: 3,
    departmentName: "컴퓨터공학부",
    method: "이론",
    credit: 3
  },
  {
    id: 4017,
    courseCode: "BBAB67036",
    courseName: "컴퓨터네트워크2",
    professor: "김기천",
    schedule: "월01-03(공B475), 수01-03(공B475)",
    courseNumber: "3189",
    courseCategory: "전선",
    grade: 3,
    departmentName: "컴퓨터공학부",
    method: "이론",
    credit: 3
  },
  {
    id: 4016,
    courseCode: "BBAB65264",
    courseName: "SIGNAL PROCESSING",
    professor: "임창훈",
    schedule: "화16-18(공B361), 목16-18(공B361)",
    courseNumber: "3188",
    courseCategory: "전선",
    grade: 3,
    departmentName: "컴퓨터공학부",
    method: "이론",
    credit: 3
  },
  {
    id: 4015,
    courseCode: "BBAB65264",
    courseName: "SIGNAL PROCESSING",
    professor: "임창훈",
    schedule: "화13-15(공B361), 목13-15(공B361)",
    courseNumber: "3187",
    courseCategory: "전선",
    grade: 3,
    departmentName: "컴퓨터공학부",
    method: "이론",
    credit: 3
  },
  {
    id: 4014,
    courseCode: "BBAB62866",
    courseName: "기계학습",
    professor: "민덕기",
    schedule: "화10-12(신공1214), 목10-12(신공1214)",
    courseNumber: "3186",
    courseCategory: "전선",
    grade: 3,
    departmentName: "컴퓨터공학부",
    method: "이론",
    credit: 3
  },
  {
    id: 4013,
    courseCode: "BBAB62735",
    courseName: "인공지능",
    professor: "김은이",
    schedule: "월10-12(신공104), 수10-12(신공104)",
    courseNumber: "3185",
    courseCategory: "전선",
    grade: 3,
    departmentName: "컴퓨터공학부",
    method: "이론",
    credit: 3
  },
  {
    id: 4012,
    courseCode: "BBAB62251",
    courseName: "객체지향개발방법론",
    professor: "유준범",
    schedule: "월05-08(새502), 금05-08(새502)",
    courseNumber: "3184",
    courseCategory: "전선",
    grade: 3,
    departmentName: "컴퓨터공학부",
    method: "이론+실습",
    credit: 3
  },
  {
    id: 4011,
    courseCode: "BBAB59453",
    courseName: "컴퓨터구조",
    professor: "박능수",
    schedule: "월13-15(공B352), 수13-15(공B352)",
    courseNumber: "3183",
    courseCategory: "전선",
    grade: 3,
    departmentName: "컴퓨터공학부",
    method: "이론",
    credit: 3
  },
  {
    id: 4010,
    courseCode: "BBAB59453",
    courseName: "컴퓨터구조",
    professor: "박능수",
    schedule: "월10-12(공B352), 수10-12(공B352)",
    courseNumber: "3182",
    courseCategory: "전선",
    grade: 3,
    departmentName: "컴퓨터공학부",
    method: "이론",
    credit: 3
  },
  {
    id: 4009,
    courseCode: "BBAB59453",
    courseName: "컴퓨터구조",
    professor: "박능수",
    schedule: "월04-06(공B352), 수04-06(공B352)",
    courseNumber: "3181",
    courseCategory: "전선",
    grade: 3,
    departmentName: "컴퓨터공학부",
    method: "이론",
    credit: 3
  },
  {
    id: 4008,
    courseCode: "BBAB59069",
    courseName: "클라우드IOT서비스",
    professor: "정갑주",
    schedule: "화15-18(공B475), 목15-18(공B475)",
    courseNumber: "3180",
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
    { time: '10:00-12:00', name: '인공지능', location: '신공104', professor: '김은이', color: 'bg-blue-100 border-blue-300' },
    { time: '13:00-15:00', name: '컴퓨터구조', location: '공B352', professor: '박능수', color: 'bg-green-100 border-green-300' }
  ],
  화: [
    { time: '10:00-12:00', name: '수치방법론', location: '공B475', professor: '차영운', color: 'bg-purple-100 border-purple-300' },
    { time: '13:00-16:00', name: '전공기초프로젝트', location: '새403', professor: '차리서', color: 'bg-orange-100 border-orange-300' }
  ],
  수: [
    { time: '10:00-12:00', name: '인공지능', location: '신공104', professor: '김은이', color: 'bg-blue-100 border-blue-300' },
    { time: '13:00-15:00', name: '컴퓨터구조', location: '공B352', professor: '박능수', color: 'bg-green-100 border-green-300' }
  ],
  목: [
    { time: '10:00-12:00', name: '수치방법론', location: '공B475', professor: '차영운', color: 'bg-purple-100 border-purple-300' },
    { time: '15:00-18:00', name: '클라우드IOT서비스', location: '공B475', professor: '정갑주', color: 'bg-red-100 border-red-300' }
  ],
  금: [
    { time: '13:00-16:00', name: '전공기초프로젝트', location: '새403', professor: '차리서', color: 'bg-orange-100 border-orange-300' }
  ]
};

export const COURSE_LIST = [
  { name: '인공지능', code: 'BBAB62735', credit: 3, professor: '김은이', time: '월,수 10:00-12:00' },
  { name: '수치방법론', code: 'BBAB67656', credit: 3, professor: '차영운', time: '화,목 10:00-12:00' },
  { name: '컴퓨터구조', code: 'BBAB59453', credit: 3, professor: '박능수', time: '월,수 13:00-15:00' },
  { name: '전공기초프로젝트', code: 'BBAB67057', credit: 3, professor: '차리서', time: '화,금 13:00-16:00' },
  { name: '클라우드IOT서비스', code: 'BBAB59069', credit: 3, professor: '정갑주', time: '목 15:00-18:00' }
];