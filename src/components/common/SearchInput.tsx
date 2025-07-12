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
    <div className={`relative ${className}`}>
      <input
        type="text"
        placeholder={placeholder}
        value={value}
        onChange={handleChange}
        disabled={disabled}
        className={`w-full bg-beige rounded-[8px] px-4 py-3 pr-10 text-mobile-small placeholder-darkgray border-0 focus:ring-0 focus:outline-none focus:bg-beige/80 transition-colors ${disabled ? 'opacity-50 cursor-not-allowed' : ''
          }`}
      />
      <Search className="absolute right-3 top-3 w-4 h-4 text-darkgray" />
    </div>
  );
};

export default SearchInput;
