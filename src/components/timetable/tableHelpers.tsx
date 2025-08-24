import { Check, ChevronDown } from 'lucide-react';
import { tableStyles } from './tableStyles';

// Type definitions for table data
export interface TableRowData {
  [key: string]: string | number | boolean | unknown;
}

export interface EvaluationItem {
  item: string;
  weight: string;
  maxScore: string | number;
  isPublic: boolean;
  description: string;
}

export interface TextbookItem {
  index: number;
  type: string;
  name: string;
  author: string;
  link?: string;
  publisher?: string;
  publishYear?: string;
}

export interface AssignmentItem {
  index: number;
  type: string;
  name: string;
  dueDate: string;
}

export interface LectureData {
  grade?: string | number;
  courseCode?: string;
  category?: string;
  classification?: string;
  courseNumber?: string;
  credit?: number;
  hours?: string;
  schedule?: string;
  professor?: string;
  department?: string;
  openDept?: string;
  targetDept?: string;
  requestDept?: string;
  note?: string;
  classType?: string;
  method?: string;
  capstone?: string;
  ncs?: string;
  passSubject?: string;
  foreignLang?: string;
  langType?: string;
  enrolled?: number;
  currentEnroll?: number;
  undergraduateEnrolled?: number;
  undergrad?: number;
  graduateEnrolled?: number;
  grad?: number;
  capacity?: number;
}

export interface CourseData {
  method?: string;
}

// Table cell renderers
export const TableCellRenderers = {
  checkIcon: (isChecked: boolean) =>
    isChecked ? <Check className="w-3.5 h-3.5 text-zinc-400 mx-auto" /> : null,

  expandIcon: (hasContent: boolean, isExpanded: boolean) =>
    hasContent ? (
      <ChevronDown className={`${tableStyles.evaluation.chevron} ${isExpanded ? 'rotate-180' : ''}`} />
    ) : (
      <ChevronDown className={tableStyles.evaluation.chevronDisabled} />
    ),

  indexCell: (index: number) => index,

  textCell: (value: unknown) => value || '-'
};

// Default data generation functions
export const createDefaultData = (type: string): TableRowData[] => {
  const defaults: Record<string, () => TableRowData[]> = {
    textbooks: () => Array.from({ length: 4 }, (_, i) => ({
      index: i + 1,
      type: '-',
      name: '-',
      author: '-',
      link: '-'
    })),
    assignments: () => [{
      index: 1,
      type: '-',
      name: '-',
      dueDate: '-'
    }],
    evaluation: () => [
      { item: '출석률', weight: '10%', maxScore: '10', isPublic: true, description: 'Checked with e-campus system' },
      { item: '중간', weight: '40%', maxScore: '40', isPublic: true, description: 'Checked with e-campus system' },
      { item: '기말', weight: '40%', maxScore: '40', isPublic: true, description: 'Checked with e-campus system' },
      { item: '과제물', weight: '10%', maxScore: '10', isPublic: true, description: 'Checked with e-campus system' }
    ]
  };
  return defaults[type]?.() || [];
};

// Helper function for generating cell classes
export const getCellClass = (
  type: 'header' | 'body' | 'bodyBold',
  index: number,
  total: number,
  isLastRow: boolean = false,
  variant: 'mobile' | 'desktop' = 'mobile'
) => {
  const styles = variant === 'desktop' ? tableStyles.desktop : tableStyles.mobile;
  let baseClass = '';

  if (type === 'header') {
    baseClass = index === 0 ? styles.cell.firstHeader : styles.cell.headerBase;
  } else if (type === 'bodyBold') {
    baseClass = styles.cell.bodyBold;
  } else {
    baseClass = styles.cell.bodyBase;
  }

  const borderRight = index < total - 1 ? 'border-r' : '';
  const borderBottom = !isLastRow ? 'border-b' : '';

  return `${baseClass} ${borderRight} ${borderBottom}`.trim();
};

// Desktop basic data mapping functions
export const mapDesktopBasicData = (lectureData: LectureData, courseData?: CourseData) => {
  const basic1 = {
    grade: lectureData.grade || '-',
    courseCode: lectureData.courseCode || '-',
    category: lectureData.category || lectureData.classification || '-',
    courseNumber: lectureData.courseNumber || '-',
    credit: lectureData.credit || 3,
    hours: lectureData.hours || (lectureData.credit ? `${lectureData.credit}시간` : '3시간'),
    schedule: lectureData.schedule || '-',
    professor: lectureData.professor || '-'
  };

  const basic2 = {
    openDept: lectureData.openDept || lectureData.department || '-',
    targetDept: lectureData.targetDept || lectureData.department || '-',
    requestDept: lectureData.requestDept || '-',
    note: lectureData.note || courseData?.method || '-'
  };

  const basic3 = {
    classType: lectureData.classType || lectureData.method || '-',
    capstone: lectureData.capstone || '-',
    ncs: lectureData.ncs || '-',
    passSubject: lectureData.passSubject || '-',
    foreignLang: lectureData.foreignLang || '-',
    langType: lectureData.langType || '-',
    currentEnroll: lectureData.enrolled || lectureData.currentEnroll || 0,
    undergrad: lectureData.undergraduateEnrolled || lectureData.undergrad || 0,
    grad: lectureData.graduateEnrolled || lectureData.grad || 0,
    capacity: lectureData.capacity || 0
  };

  return { basic1, basic2, basic3 };
};