import React from 'react';
import { Search } from 'lucide-react';

interface SearchInputProps {
  placeholder?: string;
  value?: string;
  onChange?: (value: string) => void;
  className?: string;
  disabled?: boolean;
}

const SearchInput: React.FC<SearchInputProps> = ({
  placeholder = "검색...",
  value = "",
  onChange,
  className = "",
  disabled = false
}) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange?.(e.target.value);
  };

  return (
    <div className={`relative ${className} min-w-0`}>
      <div className="bg-beige rounded-[15px] pl-3 pr-2 py-2 flex items-center gap-2">
        <input
          name='search-input'
          type="text"
          placeholder={placeholder}
          value={value}
          onChange={handleChange}
          disabled={disabled}
          className={`flex-1 min-w-0 bg-transparent text-mobile-small placeholder-darkgray border-0 focus:ring-0 focus:outline-none ${disabled ? 'opacity-50 cursor-not-allowed' : ''
            }`}
        />
        <Search className="w-4 h-4 text-darkgray shrink-0" />
      </div>
    </div>
  );
};

export default SearchInput;
