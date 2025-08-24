export interface SubjectInfo {
  sbjt_id: string;
  subject_name: string;
  subject_name_eng: string;
  notes: string;
  goal: string;
}

export interface EvaluationItem {
  item_name: string;
  ratio: number;
  full_score: number;
  is_public: string;
}

export interface Book {
  type: string;
  title: string;
  author: string;
  publisher: string;
  year: string;
}

export interface Assignment {
  title: string;
  due_date: string;
  method: string;
}

export interface WeeklyPlan {
  week: number;
  period: string;
  topic: string;
  content: string;
  type: string;
  activity: string;
  instructor: string;
}

export interface CourseDetailResponse {
  subjectInfo: SubjectInfo;
  evaluation: EvaluationItem[];
  books: Book[];
  assignments: Assignment[];
  weeklyPlans: WeeklyPlan[];
}

export interface CourseDetailError {
  status: number;
  message: string;
  timestamp?: string;
}