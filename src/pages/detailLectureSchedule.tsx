import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell, Button } from '@/components/commons';
import { LECTURE_DETAILS, DAYS_ORDER } from '@/constants/detailLectureScheduleConstants';

// Local subcomponents kept in this file as requested

const Section: React.FC<{ title: string; children: React.ReactNode }> = ({ title, children }) => (
  <section className="bg-white rounded-2xl p-5 md:p-6 shadow-sm border border-lightgray/60">
    <h2 className="text-darkgreen text-mobile-medium-bold md:text-xl md:font-semibold mb-3 md:mb-4">{title}</h2>
    {children}
  </section>
);

const InfoRow: React.FC<{ label: string; value?: React.ReactNode }> = ({ label, value }) => (
  <div className="flex items-start justify-between py-2 border-b last:border-0">
    <div className="text-darkgray whitespace-nowrap mr-4">{label}</div>
    <div className="text-black flex-1 text-right">{value ?? '-'}</div>
  </div>
);

const Pill: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <span className="inline-flex items-center rounded-xl bg-beige text-black px-3 py-1 text-xs mr-2 mb-2">{children}</span>
);

const DetailHeader: React.FC<{ name: string; code: string; professor: string; credit: number; category?: string; department?: string; evaluation?: string }> = ({ name, code, professor, credit, category, department, evaluation }) => {
  const navigate = useNavigate();
  return (
    <div className="flex flex-col gap-3 md:gap-4">
      <div className="flex items-center justify-between">
        <h1 className="text-mobile-medium-bold md:text-2xl md:font-bold text-black truncate">{name}</h1>
        <div className="flex gap-2">
          <Button text="뒤로" size="extrasmall" variant="secondary" onClick={() => navigate(-1)} />
        </div>
      </div>
      <div className="text-darkgray text-sm">{code} · {professor} · {credit}학점</div>
      <div className="flex flex-wrap">
        {category && <Pill>{category}</Pill>}
        {department && <Pill>{department}</Pill>}
        {evaluation && <Pill>{evaluation}</Pill>}
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
    <Table>
      <TableHeader className="bg-beige">
        <TableRow className="[&>th]:text-center [&>th]:font-bold">
          {DAYS_ORDER.map(d => (<TableHead key={d}>{d}</TableHead>))}
        </TableRow>
      </TableHeader>
      <TableBody>
        <TableRow className="[&>td]:text-center">
          {DAYS_ORDER.map(d => (
            <TableCell key={d}>
              {(byDay[d] ?? []).length > 0 ? (
                <div className="space-y-1">
                  {(byDay[d] ?? []).map((t, i) => (
                    <div key={i} className="inline-flex flex-col items-center">
                      <span className="text-sm">{t.start} - {t.end}</span>
                      {room && <span className="text-xs text-darkgray">{room}</span>}
                    </div>
                  ))}
                </div>
              ) : (
                <span className="text-darkgray">-</span>
              )}
            </TableCell>
          ))}
        </TableRow>
      </TableBody>
    </Table>
  );
};

const EvaluationTable: React.FC<{ breakdown?: Array<{ item: string; weight: number }> }> = ({ breakdown }) => (
  <Table>
    <TableHeader className="bg-beige">
      <TableRow className="[&>th]:text-center [&>th]:font-bold">
        <TableHead>평가 항목</TableHead>
        <TableHead>반영 비율</TableHead>
      </TableRow>
    </TableHeader>
    <TableBody>
      {(breakdown ?? []).map((row, idx) => (
        <TableRow key={idx} className="[&>td]:text-center">
          <TableCell>{row.item}</TableCell>
          <TableCell>{row.weight}%</TableCell>
        </TableRow>
      ))}
    </TableBody>
  </Table>
);

const Notices: React.FC<{ notices?: Array<{ id: string; title: string; date: string }> }> = ({ notices }) => (
  <div className="space-y-3">
    {(notices ?? []).map(n => (
      <div key={n.id} className="flex items-center justify-between p-3 border rounded-xl hover:bg-gray-50">
        <div className="truncate pr-3">{n.title}</div>
        <span className="text-sm text-darkgray whitespace-nowrap">{n.date}</span>
      </div>
    ))}
    {(!notices || notices.length === 0) && (
      <div className="text-darkgray">등록된 공지가 없습니다.</div>
    )}
  </div>
);

const DetailLectureSchedule: React.FC = () => {
  const { subjectCode } = useParams<{ subjectCode: string }>();
  const data = (subjectCode && LECTURE_DETAILS[subjectCode]) || undefined;

  if (!data) {
    return (
      <div className="p-5 md:p-8">
        <div className="max-w-5xl mx-auto">
          <div className="bg-white rounded-2xl p-6 border text-center">존재하지 않는 과목이거나 준비 중입니다.</div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-5 md:p-8">
      <div className="max-w-5xl mx-auto space-y-6">
        <DetailHeader
          name={data.subjectName}
          code={data.subjectCode}
          professor={data.professor}
          credit={data.credit}
          category={data.category}
          department={data.department}
          evaluation={data.evaluation}
        />

        <Section title="강의 정보">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
          <Section title="평가 비율">
            <EvaluationTable breakdown={data.evaluationBreakdown} />
          </Section>
        )}

        {data.description && (
          <Section title="과목 개요">
            <p className="text-darkgray leading-relaxed">{data.description}</p>
            {data.prerequisites && data.prerequisites.length > 0 && (
              <div className="mt-3">
                <div className="text-black font-medium mb-2">선수과목</div>
                <div className="flex flex-wrap">
                  {data.prerequisites.map((p, i) => (<Pill key={i}>{p}</Pill>))}
                </div>
              </div>
            )}
          </Section>
        )}

        <Section title="공지">
          <Notices notices={data.notices} />
        </Section>
      </div>
    </div>
  );
};

export default DetailLectureSchedule;
