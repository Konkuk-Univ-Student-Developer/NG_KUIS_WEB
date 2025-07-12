import React from 'react';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

interface StatusBadgeProps {
  status: 'active' | 'inactive' | 'pending' | 'completed' | 'error';
  text?: string;
  className?: string;
}

const StatusBadge: React.FC<StatusBadgeProps> = ({ status, text, className }) => {
  const statusConfig = {
    active: {
      text: '활성',
      className: 'bg-[var(--darkgreen)] text-white',
    },
    inactive: {
      text: '비활성',
      className: 'bg-[var(--darkgray)] text-white',
    },
    pending: {
      text: '대기',
      className: 'bg-[var(--orange)] text-white',
    },
    completed: {
      text: '완료',
      className: 'bg-[var(--darkgreen)] text-white',
    },
    error: {
      text: '오류',
      className: 'bg-red-500 text-white',
    },
  };

  const config = statusConfig[status];

  return (
    <Badge
      variant="secondary"
      className={cn(
        'mobile-extrasmall-bold',
        config.className,
        className
      )}
    >
      {text || config.text}
    </Badge>
  );
};

export default StatusBadge;
