import React from 'react';
import { Input } from '@/components/ui/input';
import { Search } from 'lucide-react';
import { cn } from '@/lib/utils';

interface SearchInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  placeholder?: string;
  onSearch?: (value: string) => void;
  className?: string;
}

const SearchInput: React.FC<SearchInputProps> = ({
  placeholder = '검색어를 입력하세요',
  onSearch,
  className,
  ...props
}) => {
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && onSearch) {
      onSearch(e.currentTarget.value);
    }
  };

  return (
    <div className={cn('relative', className)}>
      <Input
        type="text"
        placeholder={placeholder}
        onKeyDown={handleKeyDown}
        className="mobile-small-regular pl-10 pr-4 py-2 border-[var(--lightgray)] focus:border-[var(--darkgreen)] focus:ring-[var(--darkgreen)]"
        {...props}
      />
      <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[var(--darkgray)]">
        <Search size={16} />
      </div>
    </div>
  );
};

export default SearchInput;
