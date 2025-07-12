import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

interface CourseCardProps {
  title: string;
  instructor: string;
  semester: string;
  credits: number;
  code: string;
  time: string;
  className?: string;
  isRequired?: boolean;
}

const CourseCard: React.FC<CourseCardProps> = ({
  title,
  instructor,
  semester,
  credits,
  code,
  time,
  className,
  isRequired = false,
}) => {
  return (
    <Card className={cn('w-full max-w-sm border border-gray-200', className)}>
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <CardTitle className="mobile-small-bold text-base leading-tight mb-1">
              {title}
            </CardTitle>
            <CardDescription className="mobile-extrasmall-regular text-[var(--darkgray)]">
              {instructor}
            </CardDescription>
          </div>
          {isRequired && (
            <Badge variant="secondary" className="bg-[var(--orange)] text-white mobile-extrasmall-bold">
              필수
            </Badge>
          )}
        </div>
      </CardHeader>
      <CardContent className="pt-0">
        <div className="space-y-2 mobile-extrasmall-regular text-[var(--darkgray)]">
          <div className="flex justify-between">
            <span>학기</span>
            <span>{semester}</span>
          </div>
          <div className="flex justify-between">
            <span>학점</span>
            <span>{credits}</span>
          </div>
          <div className="flex justify-between">
            <span>과목코드</span>
            <span>{code}</span>
          </div>
          <div className="flex justify-between">
            <span>시간</span>
            <span>{time}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default CourseCard;
