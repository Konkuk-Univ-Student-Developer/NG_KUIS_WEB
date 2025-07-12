import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { cn } from '@/lib/utils';

interface QuickMenuProps {
  title: string;
  items: Array<{
    label: string;
    href?: string;
    onClick?: () => void;
    icon?: React.ReactNode;
  }>;
  className?: string;
}

const QuickMenu: React.FC<QuickMenuProps> = ({ title, items, className }) => {
  return (
    <Card className={cn('w-full max-w-xs', className)}>
      <CardContent className="p-4">
        <h3 className="mobile-small-bold text-[var(--black)] mb-3 border-b border-[var(--lightgray)] pb-2">
          {title}
        </h3>
        <ul className="space-y-1">
          {items.map((item, index) => (
            <li key={index}>
              {item.href ? (
                <a
                  href={item.href}
                  className="flex items-center gap-2 px-2 py-1 mobile-extrasmall-regular text-[var(--darkgray)] hover:text-[var(--darkgreen)] hover:bg-[var(--beige)] rounded transition-colors"
                >
                  {item.icon && <span className="w-4 h-4">{item.icon}</span>}
                  {item.label}
                </a>
              ) : (
                <button
                  onClick={item.onClick}
                  className="flex items-center gap-2 px-2 py-1 mobile-extrasmall-regular text-[var(--darkgray)] hover:text-[var(--darkgreen)] hover:bg-[var(--beige)] rounded transition-colors w-full text-left"
                >
                  {item.icon && <span className="w-4 h-4">{item.icon}</span>}
                  {item.label}
                </button>
              )}
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
};

export default QuickMenu;
