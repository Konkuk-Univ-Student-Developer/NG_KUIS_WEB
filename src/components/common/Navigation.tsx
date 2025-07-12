import React from 'react';
import { cn } from '@/lib/utils';

interface NavigationItem {
  id: string;
  label: string;
  href?: string;
  onClick?: () => void;
  icon?: React.ReactNode;
  children?: NavigationItem[];
  isActive?: boolean;
}

interface NavigationProps {
  items: NavigationItem[];
  className?: string;
  logo?: React.ReactNode;
  onItemClick?: (item: NavigationItem) => void;
}

const Navigation: React.FC<NavigationProps> = ({
  items,
  className,
  logo,
  onItemClick,
}) => {
  const handleItemClick = (item: NavigationItem) => {
    if (item.onClick) {
      item.onClick();
    }
    if (onItemClick) {
      onItemClick(item);
    }
  };

  const renderNavigationItem = (item: NavigationItem, level = 0) => {
    const isNested = level > 0;
    const baseClasses = cn(
      'flex items-center gap-3 px-4 py-3 mobile-small-regular text-[var(--darkgray)] hover:text-[var(--darkgreen)] hover:bg-[var(--beige)] transition-colors rounded-lg',
      {
        'text-[var(--darkgreen)] bg-[var(--beige)]': item.isActive,
        'pl-8': isNested,
      }
    );

    return (
      <div key={item.id}>
        {item.href ? (
          <a
            href={item.href}
            className={baseClasses}
            onClick={() => handleItemClick(item)}
          >
            {item.icon && <span className="w-5 h-5">{item.icon}</span>}
            {item.label}
          </a>
        ) : (
          <button
            onClick={() => handleItemClick(item)}
            className={cn(baseClasses, 'w-full text-left')}
          >
            {item.icon && <span className="w-5 h-5">{item.icon}</span>}
            {item.label}
          </button>
        )}
        {item.children && (
          <div className="ml-4 mt-1 space-y-1">
            {item.children.map((child) => renderNavigationItem(child, level + 1))}
          </div>
        )}
      </div>
    );
  };

  return (
    <nav className={cn('w-64 bg-white border-r border-[var(--lightgray)] h-full', className)}>
      {logo && (
        <div className="p-4 border-b border-[var(--lightgray)] mb-4">
          {logo}
        </div>
      )}
      <div className="px-4 space-y-2">
        {items.map((item) => renderNavigationItem(item))}
      </div>
    </nav>
  );
};

export default Navigation;
