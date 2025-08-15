export const NOTICE_TABS = [
  "전체",
  "학사",
  "장학",
  "국제",
  "학생",
  "취창업",
  "일반",
  "산학",
];

export const NOTICE_CATEGORY_MAP: { [key: string]: number | undefined } = {
  전체: undefined, // '전체'는 category 파라미터 없이 요청
  학사: 234,
  장학: 235,
  국제: 237,
  학생: 238,
  취창업: 4083,
  일반: 240,
  산학: 4214,
};
