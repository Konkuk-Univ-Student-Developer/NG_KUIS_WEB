import React from 'react';
import { Calendar, Clock, MapPin, User } from 'lucide-react';

const TimetableDesktop: React.FC = () => {
  const days = ['월', '화', '수', '목', '금'];
  const times = ['9:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00'];
  
  const schedule = {
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

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold text-darkgreen">강의 시간표</h1>
          <div className="flex items-center gap-4">
            <select className="px-4 py-2 border rounded-lg">
              <option>2024년 2학기</option>
              <option>2024년 1학기</option>
            </select>
            <button className="px-4 py-2 bg-darkgreen text-white rounded-lg hover:bg-darkgreen/90">
              시간표 내보내기
            </button>
          </div>
        </div>
        
        {/* 시간표 그리드 */}
        <div className="bg-white rounded-lg shadow-sm overflow-hidden">
          <div className="grid grid-cols-6 border-b">
            <div className="p-4 bg-gray-50"></div>
            {days.map(day => (
              <div key={day} className="p-4 text-center font-semibold border-l">
                {day}
              </div>
            ))}
          </div>
          
          {times.map(time => (
            <div key={time} className="grid grid-cols-6 border-b">
              <div className="p-4 bg-gray-50 text-sm text-gray-600">
                {time}
              </div>
              {days.map(day => (
                <div key={`${day}-${time}`} className="p-2 border-l min-h-[80px] relative">
                  {schedule[day]?.map((cls, idx) => {
                    if (cls.time.startsWith(time)) {
                      return (
                        <div
                          key={idx}
                          className={`absolute inset-2 p-2 rounded border-2 ${cls.color}`}
                          style={{
                            height: cls.time.includes('17:00') ? '160px' : '120px',
                            zIndex: 10
                          }}
                        >
                          <p className="font-semibold text-sm">{cls.name}</p>
                          <p className="text-xs text-gray-600 mt-1">{cls.location}</p>
                          <p className="text-xs text-gray-600">{cls.professor}</p>
                        </div>
                      );
                    }
                    return null;
                  })}
                </div>
              ))}
            </div>
          ))}
        </div>
        
        {/* 수업 상세 정보 */}
        <div className="mt-8 grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-xl font-semibold mb-4">수강 과목 목록</h2>
            <div className="space-y-3">
              {[
                { name: '데이터베이스', code: 'CS301', credit: 3, professor: '김교수', time: '월,수 09:00-10:30' },
                { name: '운영체제', code: 'CS302', credit: 3, professor: '이교수', time: '화,목 11:00-12:30' },
                { name: '알고리즘', code: 'CS303', credit: 3, professor: '박교수', time: '월,수 14:00-15:30' },
                { name: '캡스톤디자인', code: 'CS401', credit: 3, professor: '최교수', time: '목 15:00-17:00' }
              ].map((course, idx) => (
                <div key={idx} className="flex items-center justify-between p-3 border rounded-lg hover:bg-gray-50">
                  <div>
                    <p className="font-medium">{course.name} ({course.code})</p>
                    <p className="text-sm text-gray-600">{course.time} · {course.professor}</p>
                  </div>
                  <span className="text-sm font-medium">{course.credit}학점</span>
                </div>
              ))}
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-xl font-semibold mb-4">학점 요약</h2>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-gray-600">총 신청학점</span>
                <span className="font-medium">12학점</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">전공</span>
                <span className="font-medium">12학점</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">교양</span>
                <span className="font-medium">0학점</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TimetableDesktop;