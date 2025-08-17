import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell, Button } from '@/components/commons';
import { LECTURE_DETAILS, DAYS_ORDER } from '@/constants/DetailLectureScheduleConstants';
import { ChevronDown, ChevronUp, Star } from 'lucide-react';

// Local subcomponents kept in this file as requested

const Section: React.FC<{ title: string; children: React.ReactNode; collapsible?: boolean; defaultOpen?: boolean }> = ({ title, children, collapsible = false, defaultOpen = true }) => {
  const [isOpen, setIsOpen] = useState(defaultOpen);
  
  return (
    <section className="bg-white rounded-2xl p-5 md:p-8 shadow-md border border-lightgray/30 hover:shadow-lg transition-shadow duration-200">
      <div 
        className={`flex items-center justify-between mb-4 md:mb-6 ${collapsible ? 'cursor-pointer' : ''}`}
        onClick={() => collapsible && setIsOpen(!isOpen)}
      >
        <h2 className="text-darkgreen text-mobile-medium-bold md:text-2xl md:font-bold">{title}</h2>
        {collapsible && (
          <button className="text-darkgray hover:text-darkgreen transition-colors">
            {isOpen ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
          </button>
        )}
      </div>
      {(!collapsible || isOpen) && (
        <div className="animate-fadeIn">
          {children}
        </div>
      )}
    </section>
  );
};

const InfoRow: React.FC<{ label: string; value?: React.ReactNode }> = ({ label, value }) => (
  <div className="flex items-center justify-between py-3 border-b border-lightgray/20 last:border-0 hover:bg-beige/30 transition-colors px-2 -mx-2 rounded">
    <span className="text-darkgray font-medium">{label}</span>
    <div className="text-black font-semibold">{value ?? '-'}</div>
  </div>
);

const Pill: React.FC<{ children: React.ReactNode; variant?: 'default' | 'primary' | 'secondary' }> = ({ children, variant = 'default' }) => {
  const variants = {
    default: 'bg-beige text-black',
    primary: 'bg-darkgreen text-white',
    secondary: 'bg-lightgray text-darkgray'
  };
  
  return (
    <span className={`inline-flex items-center rounded-xl px-4 py-2 text-sm font-medium mr-2 mb-2 transition-all hover:scale-105 ${variants[variant]}`}>
      {children}
    </span>
  );
};

const DetailHeader: React.FC<{ name: string; code: string; professor: string; credit: number; category?: string; department?: string; evaluation?: string; rating?: number }> = ({ name, code, professor, credit, category, department, evaluation, rating }) => {
  const navigate = useNavigate();
  return (
    <div className="bg-gradient-to-r from-darkgreen/5 to-lightgreen/5 rounded-2xl p-6 md:p-8 border border-lightgray/20">
      <div className="flex flex-col gap-4 md:gap-5">
        <div className="flex items-start justify-between gap-4">
          <div className="flex-1">
            <h1 className="text-xl md:text-3xl font-bold text-black mb-3">{name}</h1>
            <div className="flex flex-wrap items-center gap-2 md:gap-4 text-darkgray text-sm md:text-base">
              <span className="font-medium">{code}</span>
              <span className="text-lightgray">•</span>
              <span>{professor} 교수</span>
              <span className="text-lightgray">•</span>
              <span>{credit}학점</span>
            </div>
          </div>
          <div className="flex flex-col md:flex-row gap-2">
            <Button text="관심과목" size="small" variant="secondary" onClick={() => {}} />
            <Button text="수강신청" size="small" variant="primary" onClick={() => {}} />
            <Button text="뒤로" size="small" variant="secondary" onClick={() => navigate(-1)} />
          </div>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          {category && <Pill variant="primary">{category}</Pill>}
          {department && <Pill>{department}</Pill>}
          {evaluation && <Pill variant="secondary">{evaluation}</Pill>}
          {rating && (
            <div className="flex items-center gap-1 ml-auto">
              {[...Array(5)].map((_, i) => (
                <Star key={i} size={16} className={i < rating ? 'text-orange fill-current' : 'text-lightgray'} />
              ))}
              <span className="text-sm text-darkgray ml-1">({rating}.0)</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

const ScheduleTable: React.FC<{ blocks?: Array<{ day: string; start: string; end: string }>; room?: string }> = ({ blocks, room }) => {
  const byDay: Record<string, Array<{ start: string; end: string }>> = {};
  (blocks ?? []).forEach(b => {
    if (!byDay[b.day]) byDay[b.day] = [];
    byDay[b.day].push({ start: b.start, end: b.end });
  });
  return (
    <div className="overflow-x-auto">
      <Table>
        <TableHeader className="bg-darkgreen/5">
          <TableRow className="[&>th]:text-center [&>th]:font-bold [&>th]:text-darkgreen">
            {DAYS_ORDER.map(d => (<TableHead key={d} className="py-3">{d}요일</TableHead>))}
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow className="[&>td]:text-center [&>td]:py-6">
            {DAYS_ORDER.map(d => (
              <TableCell key={d} className="hover:bg-beige/50 transition-colors">
                {(byDay[d] ?? []).length > 0 ? (
                  <div className="space-y-2">
                    {(byDay[d] ?? []).map((t, i) => (
                      <div key={i} className="bg-darkgreen/10 rounded-lg p-3 mx-2">
                        <div className="font-semibold text-sm">{t.start} - {t.end}</div>
                        {room && <div className="text-xs text-darkgray mt-1">{room}</div>}
                      </div>
                    ))}
                  </div>
                ) : (
                  <span className="text-lightgray">-</span>
                )}
              </TableCell>
            ))}
          </TableRow>
        </TableBody>
      </Table>
    </div>
  );
};

const EvaluationTable: React.FC<{ breakdown?: Array<{ item: string; weight: number }> }> = ({ breakdown }) => {
  const getColorByWeight = (weight: number) => {
    if (weight >= 30) return 'bg-darkgreen';
    if (weight >= 20) return 'bg-green';
    return 'bg-lightgreen';
  };
  
  return (
    <div className="space-y-4">
      {(breakdown ?? []).map((row, idx) => (
        <div key={idx} className="flex items-center justify-between p-4 bg-beige/30 rounded-lg hover:bg-beige/50 transition-colors">
          <span className="font-medium text-black">{row.item}</span>
          <div className="flex items-center gap-3">
            <div className="w-32 bg-lightgray/30 rounded-full h-2 overflow-hidden">
              <div 
                className={`h-full ${getColorByWeight(row.weight)} transition-all duration-300`}
                style={{ width: `${row.weight}%` }}
              />
            </div>
            <span className="font-bold text-darkgreen min-w-[50px] text-right">{row.weight}%</span>
          </div>
        </div>
      ))}
    </div>
  );
};

const Notices: React.FC<{ notices?: Array<{ id: string; title: string; date: string; isNew?: boolean }> }> = ({ notices }) => (
  <div className="space-y-3">
    {(notices ?? []).map(n => (
      <div key={n.id} className="flex items-center justify-between p-4 border border-lightgray/30 rounded-xl hover:bg-beige/30 hover:border-darkgreen/20 transition-all cursor-pointer group">
        <div className="flex items-center gap-3 flex-1">
          {n.isNew && (
            <span className="bg-danger text-white text-xs px-2 py-1 rounded-full font-bold">NEW</span>
          )}
          <div className="truncate group-hover:text-darkgreen transition-colors">{n.title}</div>
        </div>
        <span className="text-sm text-darkgray whitespace-nowrap">{n.date}</span>
      </div>
    ))}
    {(!notices || notices.length === 0) && (
      <div className="text-center py-8 text-darkgray">
        <div className="text-4xl mb-2">📭</div>
        <div>등록된 공지가 없습니다.</div>
      </div>
    )}
  </div>
);

// 관련 과목 카드 컴포넌트
const RelatedCourseCard: React.FC<{ course: any }> = ({ course }) => {
  const navigate = useNavigate();
  return (
    <div 
      className="p-4 border border-lightgray/30 rounded-xl hover:border-darkgreen/30 hover:bg-beige/20 transition-all cursor-pointer"
      onClick={() => navigate(`/timetable/${course.subjectCode}`)}
    >
      <div className="font-semibold text-black mb-1">{course.subjectName}</div>
      <div className="text-sm text-darkgray">
        {course.professor} · {course.credit}학점
      </div>
      <div className="flex gap-2 mt-2">
        <span className="text-xs bg-beige px-2 py-1 rounded">{course.category}</span>
      </div>
    </div>
  );
};

const DetailLectureSchedule: React.FC = () => {
  const { subjectCode } = useParams<{ subjectCode: string }>();
  const data = (subjectCode && LECTURE_DETAILS[subjectCode]) || undefined;

  if (!data) {
    return (
      <div className="min-h-screen bg-white p-5 md:p-8">
        <div className="max-w-7xl mx-auto">
          <div className="bg-white rounded-2xl p-12 border border-lightgray/30 text-center">
            <div className="text-6xl mb-4">📚</div>
            <h2 className="text-xl font-bold text-black mb-2">과목을 찾을 수 없습니다</h2>
            <p className="text-darkgray">존재하지 않는 과목이거나 준비 중입니다.</p>
          </div>
        </div>
      </div>
    );
  }

  // 관련 과목 데이터 (실제로는 API에서 가져와야 함)
  const relatedCourses = [
    { subjectCode: "0201", subjectName: "자료구조", professor: "김철수", credit: 3, category: "전선" },
    { subjectCode: "0312", subjectName: "이산수학", professor: "박소영", credit: 3, category: "전선" },
  ].filter(c => c.subjectCode !== subjectCode);

  return (
    <div className="min-h-screen bg-white p-5 md:p-8">
      <div className="max-w-7xl mx-auto space-y-6 md:space-y-8">
        <DetailHeader
          name={data.subjectName}
          code={data.subjectCode}
          professor={data.professor}
          credit={data.credit}
          category={data.category}
          department={data.department}
          evaluation={data.evaluation}
          rating={4}
        />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8">
          <div className="lg:col-span-2 space-y-6">
            <Section title="강의 정보">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <InfoRow label="교강사" value={data.professor} />
                  <InfoRow label="학점" value={`${data.credit}학점`} />
                  <InfoRow label="이수구분" value={data.category} />
                  <InfoRow label="학과" value={data.department} />
                </div>
                <div>
                  <InfoRow label="강의실" value={data.room} />
                  <InfoRow label="수업시간" value={data.time} />
                  <InfoRow label="수강정원" value={data.capacity} />
                  <InfoRow label="신청인원" value={data.enrolled} />
                </div>
              </div>
            </Section>

            <Section title="시간표">
              <ScheduleTable blocks={data.scheduleBlocks} room={data.room} />
            </Section>

            {data.evaluationBreakdown && data.evaluationBreakdown.length > 0 && (
              <Section title="평가 비율" collapsible defaultOpen={false}>
                <EvaluationTable breakdown={data.evaluationBreakdown} />
              </Section>
            )}

            {data.description && (
              <Section title="과목 개요" collapsible>
                <p className="text-darkgray leading-relaxed text-sm md:text-base">{data.description}</p>
                {data.prerequisites && data.prerequisites.length > 0 && (
                  <div className="mt-4 p-4 bg-beige/30 rounded-lg">
                    <div className="text-black font-semibold mb-2">선수과목</div>
                    <div className="flex flex-wrap">
                      {data.prerequisites.map((p, i) => (<Pill key={i} variant="secondary">{p}</Pill>))}
                    </div>
                  </div>
                )}
              </Section>
            )}
          </div>

          <div className="space-y-6">
            <Section title="공지사항">
              <Notices notices={data.notices} />
            </Section>

            {relatedCourses.length > 0 && (
              <Section title="관련 과목">
                <div className="space-y-3">
                  {relatedCourses.map((course) => (
                    <RelatedCourseCard key={course.subjectCode} course={course} />
                  ))}
                </div>
              </Section>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetailLectureSchedule;
