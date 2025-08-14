import GraduationSummary from "@/components/graduation/GraduationSummary";
import GraduationAudit from "@/components/graduation/GraduationAudit";
import CompletedCredits from "@/components/graduation/CompletedCredits";
import type { ColumnConfig, CreditSubSectionProps, RowData } from "@/types/graduation";

export const GRADUATION_TABS = ["결과 요약", "졸업 사정", "취득학점확인원"];

export const CREDIT_SUMMARY_DATA = [
  { title: "총 취득 학점", value: 122, unit: "/132" },
  { title: "전체 평점", value:4.31, unit: "/4.5" },
];

export const CREDIT_DATA = [
  { title: "총 취득 학점", value: 106, unit: "학점" },
  { title: "수강 신청 학점", value: 16, unit: "학점" },
  { title: "중복 학점 계", value: 0, unit: "학점" },
  { title: "잔여 학점", value: 10, unit: "학점" },
];

export const TAB_COMPONENTS: { [key: string]: React.FC } = {
  "결과 요약": GraduationSummary,
  "졸업 사정": GraduationAudit,
  "취득학점확인원": CompletedCredits,
};

export const USER_INFO_COLUMNS: ColumnConfig[] = [
  { id: "studentId", label: "학번", desktop: { row: 1, widthClass: "w-2/13" }, mobile: { table: 1, widthClass: "w-1/4" } },
  { id: "name", label: "성명", desktop: { row: 1, widthClass: "w-2/13" }, mobile: { table: 1, widthClass: "w-1/4" } },
  { id: "birthDate", label: "생년월일", desktop: { row: 1, widthClass: "w-2/13" }, mobile: { table: 1, widthClass: "w-1/4" } },
  { id: "gender", label: "성별", desktop: { row: 1, widthClass: "w-1/13" }, mobile: { table: 1, widthClass: "w-1/4" } },

  { id: "entryYear", label: "입학년도", desktop: { row: 1, widthClass: "w-2/13" }, mobile: { table: 2, widthClass: "w-1/4" } },
  { id: "entrySemester", label: "입학학기", desktop: { row: 1, widthClass: "w-2/13" }, mobile: { table: 2, widthClass: "w-1/4" } },
  { id: "entryType", label: "입학구분", desktop: { row: 1, widthClass: "w-2/13" }, mobile: { table: 2, widthClass: "w-1/4" } },

  { id: "studentType", label: "학생구분", desktop: { row: 2, widthClass: "w-2/12" }, mobile: { table: 2, widthClass: "w-1/4" } },

  { id: "major", label: "학과(부)/전공", desktop: { row: 2, widthClass: "w-3/12" }, mobile: { table: 3, widthClass: "w-2/5" } },
  { id: "college", label: "대학명", desktop: { row: 2, widthClass: "w-3/12" }, mobile: { table: 3, widthClass: "w-1/5" } },
  { id: "grade", label: "학년", desktop: { row: 2, widthClass: "w-2/12" }, mobile: { table: 3, widthClass: "w-1/5" } },
  { id: "status", label: "학적상태", desktop: { row: 2, widthClass: "w-2/12" }, mobile: { table: 3, widthClass: "w-1/5" } },
];

export const USER_INFO_ROWS: RowData[] = [
  {
    studentId: "20201999",
    name: "김건국",
    birthDate: "030403",
    gender: "남",
    entryYear: "2022",
    entrySemester: "1학기",
    entryType: "수시1",
    studentType: "일반",
    major: "컴퓨터공학부",
    college: "공과대학",
    grade: "4학년",
    status: "재학생",
  },
];


export const MAJOR_COLUMNS: ColumnConfig[] = [
  {
    id: "primaryMajorName",
    label: "전공명",
    desktop: { row: 1, widthClass: "w-3/12" },
    mobile: { table: 1, widthClass: "w-6/16" },
  },
  {
    id: "primaryCollegeName",
    label: "대학명",
    desktop: { row: 1, widthClass: "w-2/12" },
    mobile: { table: 1, widthClass: "w-4/16" },
  },
  {
    id: "primaryApplyYear",
    label: "신청년도",
    desktop: { row: 1, widthClass: "w-1/12" },
    mobile: { table: 1, widthClass: "w-3/16" },
  },
  {
    id: "primaryApplySemester",
    label: "신청학기",
    desktop: { row: 1, widthClass: "w-1/12" },
    mobile: { table: 1, widthClass: "w-3/16" },
  },
  {
    id: "primaryThesisType",
    label: "논문유형",
    desktop: { row: 1, widthClass: "w-1/12" },
    mobile: { table: 2, widthClass: "w-2/8" },
  },
  {
    id: "primaryThesisTitle",
    label: "논문제목",
    desktop: { row: 1, widthClass: "w-3/12" },
    mobile: { table: 2, widthClass: "w-5/8" },
  },
  {
    id: "primaryPassStatus",
    label: "합격",
    desktop: { row: 1, widthClass: "w-1/12" },
    mobile: { table: 2, widthClass: "w-1/8" },
  },
];

export const PRIMARY_MAJOR_ROWS: RowData[] = [
  {
    primaryMajorName: "컴퓨터공학부",
    primaryCollegeName: "공과대학",
    primaryApplyYear: "2022",
    primaryApplySemester: "1학기",
    primaryThesisType: "졸업논문",
    primaryThesisTitle: "데이터 기반 UI/UX 개선 연구",
    primaryPassStatus: "Y",
  },
];

export const SECONDARY_MAJOR_ROWS: RowData[] = [
  {
    secondaryMajorName: "-",
    secondaryCollegeName: "-",
    secondaryApplyYear: "-",
    secondaryApplySemester: "-",
    secondaryThesisType: "-",
    secondaryThesisTitle: "-",
    secondaryPassStatus: "-",
  },
];

export const USER_MAJOR_INFO = [
  {
    title: "원전공",
    rows: PRIMARY_MAJOR_ROWS,
    columns: MAJOR_COLUMNS,
  },
  {
    title: "복수전공",
    rows: SECONDARY_MAJOR_ROWS,
    columns: MAJOR_COLUMNS,
  },
];

export const GRADUATION_AUDIT_COLUMNS: ColumnConfig[] = [
  {
    id: "no",
    label: "No",
    desktop: { row: 1, widthClass: "w-1/20" },
    mobile: { table: 1, widthClass: "w-1/12" },
  },
  {
    id: "content",
    label: "요건 내용",
    desktop: { row: 1, widthClass: "w-8/20" },
    mobile: { table: 1, widthClass: "w-7/12" },
  },
  {
    id: "standard",
    label: "기준",
    desktop: { row: 1, widthClass: "w-2/20" },
    mobile: { table: 0, widthClass: "w-2/12" },
  },
  {
    id: "acquired",
    label: "취득",
    desktop: { row: 1, widthClass: "w-2/20" },
    mobile: { table: 0, widthClass: "w-2/12" },
  },
  {
    id: "deficient",
    label: "부족",
    desktop: { row: 1, widthClass: "w-2/20" },
    mobile: { table: 0, widthClass: "w-2/12" },
  },
  {
    id: "details",
    label: "세부항목",
    desktop: { row: 1, widthClass: "w-3/20" },
    mobile: { table: 0, widthClass: "w-6/12" },
  },
  {
    id: "status",
    label: "합격",
    desktop: { row: 1, widthClass: "w-2/20" },
    mobile: { table: 1, widthClass: "w-2/12" },
  },
  {
    id: "detailsStatus",
    label: "상세보기",
    desktop: { row: 0, widthClass: "w-2/20" },
    mobile: { table: 1, widthClass: "w-2/12" },
  },
];

export const GRADUATION_AUDIT_ROWS: RowData[] = [
  {
    no: "1",
    content: "교양학점(영역별 이수학점 및 총 이수학점 조건)",
    standard: "12과목",
    acquired: "12과목",
    deficient: "0과목",
    details: "-",
    status: "합격",
    detailsStatus: "",
    rowType: "accordion",
  },
  {
    no: "2",
    content: "교양학점(영역별 이수학점 및 총 이수학점 조건)",
    standard: "12과목",
    acquired: "11과목",
    deficient: "11과목",
    details: "-",
    status: "불합",
    detailsStatus: "",
    rowType: "accordion",
  },
];

export const CREDITS_SUMMARY_COLUMNS: ColumnConfig[] = [
  {
    id: "majorDivision",
    label: "전공구분",
    desktop: { row: 1, widthClass: "w-5/24" },
    mobile: { table: 1, widthClass: "w-5/24" },
  },
  {
    id: "courseType",
    label: "이수구분",
    desktop: { row: 1, widthClass: "w-4/24" },
    mobile: { table: 1, widthClass: "w-4/24" },
  },
  {
    id: "standardCredits",
    label: "기준",
    desktop: { row: 1, widthClass: "w-3/24" },
    mobile: { table: 1, widthClass: "w-3/24" },
  },
  {
    id: "acquiredCredits",
    label: "취득",
    desktop: { row: 1, widthClass: "w-3/24" },
    mobile: { table: 1, widthClass: "w-3/24" },
  },
  {
    id: "remainingCredits",
    label: "잔여",
    desktop: { row: 1, widthClass: "w-3/24" },
    mobile: { table: 1, widthClass: "w-3/24" },
  },
  {
    id: "detailsStatus",
    label: "상세보기",
    desktop: { row: 1, widthClass: "w-6/24" },
    mobile: { table: 1, widthClass: "w-6/24" },
  },
];

export const CREDITS_SUMMARY_ROWS: RowData[] = [
  {
    majorDivision: "원전공",
    courseType: "기교",
    standardCredits: "15",
    acquiredCredits: "12",
    remainingCredits: "3",
    detailsStatus: "상세과목 보기",
    rowType: "accordion",
    desktopLink: "#general-basic-courses",
  },
  {
    majorDivision: "원전공",
    courseType: "심교",
    standardCredits: "12",
    acquiredCredits: "20",
    remainingCredits: "0",
    detailsStatus: "상세과목 보기",
    rowType: "accordion",
    desktopLink: "#advanced-basic-courses",
  },
  {
    majorDivision: "원전공",
    courseType: "반교",
    standardCredits: "12",
    acquiredCredits: "20",
    remainingCredits: "0",
    detailsStatus: "상세과목 보기",
    rowType: "accordion",
    desktopLink: "#based-basic-courses",
  },
  {
    majorDivision: "원전공",
    courseType: "지교",
    standardCredits: "12",
    acquiredCredits: "20",
    remainingCredits: "0",
    detailsStatus: "상세과목 보기",
    rowType: "accordion",
    desktopLink: "#designated-basic-courses",
  },
  {
    majorDivision: "원전공",
    courseType: "지필",
    standardCredits: "12",
    acquiredCredits: "20",
    remainingCredits: "0",
    detailsStatus: "상세과목 보기",
    rowType: "accordion",
    desktopLink: "#designated-required-courses",
  },
  {
    majorDivision: "원전공",
    courseType: "전필",
    standardCredits: "12",
    acquiredCredits: "20",
    remainingCredits: "0",
    detailsStatus: "상세과목 보기",
    rowType: "accordion",
    desktopLink: "#major-required-courses",
  },
  {
    majorDivision: "원전공",
    courseType: "전필+전선",
    standardCredits: "12",
    acquiredCredits: "20",
    remainingCredits: "0",
    detailsStatus: "상세과목 보기",
    rowType: "accordion",
    desktopLink: "#major-required-elective-courses",
  },
  {
    majorDivision: "원전공",
    courseType: "전기",
    standardCredits: "12",
    acquiredCredits: "20",
    remainingCredits: "0",
    detailsStatus: "상세과목 보기",
    rowType: "accordion",
    desktopLink: "#major-general-courses",
  },
  {
    majorDivision: "원전공",
    courseType: "일선",
    standardCredits: "12",
    acquiredCredits: "20",
    remainingCredits: "0",
    detailsStatus: "상세과목 보기",
    rowType: "accordion",
    desktopLink: "#general-elective-courses",
  },
  {
    majorDivision: "원전공",
    courseType: "기타",
    standardCredits: "12",
    acquiredCredits: "20",
    remainingCredits: "0",
    detailsStatus: "상세과목 보기",
    rowType: "accordion",
    desktopLink: "#other",
  },
];

// 테이블 컬럼 구조 정의
export const DETAILS_TABLE_COLUMNS: ColumnConfig[] = [
  { id: "year", label: "수강 연도", desktop: { row: 1, widthClass: "w-2/24" } },
  {
    id: "semester",
    label: "수강 학기",
    desktop: { row: 1, widthClass: "w-2/24" },
  },
  {
    id: "gradeLevel",
    label: "수강 학년",
    desktop: { row: 1, widthClass: "w-2/24" },
  },
  {
    id: "courseCode",
    label: "학수번호",
    desktop: { row: 1, widthClass: "w-3/24" },
  },
  {
    id: "courseName",
    label: "과목명",
    desktop: { row: 1, widthClass: "w-9/24" },
  },
  {
    id: "classification",
    label: "분류",
    desktop: { row: 1, widthClass: "w-2/24" },
  },
  {
    id: "credits",
    label: "학점",
    desktop: { row: 1, widthClass: "w-2/24" },
  },
  { id: "grade", label: "성적", desktop: { row: 1, widthClass: "w-2/24" } },
];

// 모든 과목 구분에 대한 데이터
export const SUBSECTION_DETAILS_DATA: CreditSubSectionProps[] = [
  {
    id: "general-basic-courses",
    title: "기초교양",
    card: [
      { title: "취득 학점", value: "12", unit: "학점" },
      { title: "평점", value: "4.1", unit: "/4.5" },
    ],
    table: {
      columns: DETAILS_TABLE_COLUMNS,
      rows: [
        {
          year: "2022",
          semester: "1학기",
          gradeLevel: "1",
          courseCode: "HOSU101",
          courseName: "글쓰기",
          classification: "기교",
          credits: "3",
          grade: "A+",
        },
        {
          year: "2022",
          semester: "2학기",
          gradeLevel: "1",
          courseCode: "HOSU102",
          courseName: "영어",
          classification: "기교",
          credits: "3",
          grade: "A0",
        },
        {
          year: "2023",
          semester: "1학기",
          gradeLevel: "2",
          courseCode: "HOSU201",
          courseName: "제2외국어",
          classification: "기교",
          credits: "3",
          grade: "B+",
        },
      ],
    },
  },
  {
    id: "advanced-basic-courses",
    title: "심화교양",
    card: [
      { title: "취득 학점", value: "9", unit: "학점" },
      { title: "평점", value: "4.5", unit: "/4.5" },
    ],
    table: {
      columns: DETAILS_TABLE_COLUMNS,
      rows: [
        {
          year: "2023",
          semester: "2학기",
          gradeLevel: "2",
          courseCode: "HOSU301",
          courseName: "문학과 인간",
          classification: "심교",
          credits: "3",
          grade: "A+",
        },
        {
          year: "2024",
          semester: "1학기",
          gradeLevel: "3",
          courseCode: "HOSU302",
          courseName: "역사와 사회",
          classification: "심교",
          credits: "3",
          grade: "A+",
        },
      ],
    },
  },
  {
    id: "based-basic-courses",
    title: "기반교양",
    card: [
      { title: "취득 학점", value: "6", unit: "학점" },
      { title: "평점", value: "4.0", unit: "/4.5" },
    ],
    table: {
      columns: DETAILS_TABLE_COLUMNS,
      rows: [
        {
          year: "2022",
          semester: "1학기",
          gradeLevel: "1",
          courseCode: "CSCE101",
          courseName: "컴퓨팅사고",
          classification: "반교",
          credits: "3",
          grade: "A+",
        },
      ],
    },
  },
  {
    id: "designated-basic-courses",
    title: "지정교양",
    card: [
      { title: "취득 학점", value: "3", unit: "학점" },
      { title: "평점", value: "3.5", unit: "/4.5" },
    ],
    table: {
      columns: DETAILS_TABLE_COLUMNS,
      rows: [
        {
          year: "2022",
          semester: "2학기",
          gradeLevel: "1",
          courseCode: "MATH101",
          courseName: "미적분학",
          classification: "지교",
          credits: "3",
          grade: "B+",
        },
      ],
    },
  },
  {
    id: "designated-required-courses",
    title: "지정필수",
    card: [
      { title: "취득 학점", value: "3", unit: "학점" },
      { title: "평점", value: "4.0", unit: "/4.5" },
    ],
    table: {
      columns: DETAILS_TABLE_COLUMNS,
      rows: [
        {
          year: "2023",
          semester: "1학기",
          gradeLevel: "2",
          courseCode: "STAT201",
          courseName: "통계학개론",
          classification: "지필",
          credits: "3",
          grade: "A0",
        },
      ],
    },
  },
  {
    id: "major-required-courses",
    title: "전공필수",
    card: [
      { title: "취득 학점", value: "21", unit: "학점" },
      { title: "평점", value: "4.3", unit: "/4.5" },
    ],
    table: {
      columns: DETAILS_TABLE_COLUMNS,
      rows: [
        {
          year: "2023",
          semester: "1학기",
          gradeLevel: "2",
          courseCode: "CSCE203",
          courseName: "자료구조",
          classification: "전필",
          credits: "3",
          grade: "A+",
        },
        {
          year: "2023",
          semester: "2학기",
          gradeLevel: "2",
          courseCode: "CSCE204",
          courseName: "알고리즘",
          classification: "전필",
          credits: "3",
          grade: "A+",
        },
        {
          year: "2024",
          semester: "1학기",
          gradeLevel: "3",
          courseCode: "CSCE301",
          courseName: "운영체제",
          classification: "전필",
          credits: "3",
          grade: "A0",
        },
      ],
    },
  },
  {
    id: "major-required-elective-courses",
    title: "전필+전선",
    card: [
      { title: "취득 학점", value: "50", unit: "학점" },
      { title: "평점", value: "4.1", unit: "/4.5" },
    ],
    table: {
      columns: DETAILS_TABLE_COLUMNS,
      rows: [
        {
          year: "2024",
          semester: "2학기",
          gradeLevel: "3",
          courseCode: "CSCE305",
          courseName: "데이터베이스",
          classification: "전선",
          credits: "3",
          grade: "A+",
        },
        {
          year: "2025",
          semester: "1학기",
          gradeLevel: "4",
          courseCode: "CSCE401",
          courseName: "컴퓨터네트워크",
          classification: "전선",
          credits: "3",
          grade: "B+",
        },
      ],
    },
  },
  {
    id: "major-general-courses",
    title: "전기",
    card: [
      { title: "취득 학점", value: "3", unit: "학점" },
      { title: "평점", value: "4.5", unit: "/4.5" },
    ],
    table: {
      columns: DETAILS_TABLE_COLUMNS,
      rows: [
        {
          year: "2024",
          semester: "1학기",
          gradeLevel: "3",
          courseCode: "CSCE390",
          courseName: "산학협력프로젝트",
          classification: "전기",
          credits: "3",
          grade: "P",
        },
      ],
    },
  },
  {
    id: "general-elective-courses",
    title: "일반선택",
    card: [
      { title: "취득 학점", value: "6", unit: "학점" },
      { title: "평점", value: "3.7", unit: "/4.5" },
    ],
    table: {
      columns: DETAILS_TABLE_COLUMNS,
      rows: [
        {
          year: "2024",
          semester: "여름학기",
          gradeLevel: "3",
          courseCode: "ARTS101",
          courseName: "현대미술의 이해",
          classification: "일선",
          credits: "3",
          grade: "A0",
        },
        {
          year: "2025",
          semester: "1학기",
          gradeLevel: "4",
          courseCode: "MUSI202",
          courseName: "서양음악사",
          classification: "일선",
          credits: "3",
          grade: "B+",
        },
      ],
    },
  },
  {
    id: "other",
    title: "기타",
    card: [
      { title: "취득 학점", value: "1", unit: "학점" },
      { title: "평점", value: "N/A", unit: "" },
    ],
    table: {
      columns: DETAILS_TABLE_COLUMNS,
      rows: [
        {
          year: "2022",
          semester: "1학기",
          gradeLevel: "1",
          courseCode: "GEDU001",
          courseName: "미래설계상담1",
          classification: "기타",
          credits: "1",
          grade: "P",
        },
      ],
    },
  },
];


export const cellBaseClasses = "flex justify-center items-center p-2 flex-shrink-0 break-keep";
export const headerTextClasses = "text-black text-sm md:text-lg font-bold text-center";
export const valueTextClasses = "text-black text-sm md:text-lg text-center";