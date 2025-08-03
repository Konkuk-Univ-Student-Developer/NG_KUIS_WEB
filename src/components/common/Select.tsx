import React from 'react';
import { ChevronDown } from 'lucide-react';

interface SelectProps {
  value: string;
  onChange?: (value: string) => void;
  placeholder?: string;
  options?: string[];
  className?: string;
  disabled?: boolean;
}

const Select: React.FC<SelectProps> = ({
  value,
  onChange,
  placeholder = "",
  options = [],
  className = "",
  disabled = false
}) => {
  const [isOpen, setIsOpen] = React.useState(false);

  const handleSelect = (selectedValue: string) => {
    onChange?.(selectedValue);
    setIsOpen(false);
  };

  return (
    <div className={`relative ${className}`}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        disabled={disabled}
        className={`w-full bg-beige rounded-[15px] pl-3 pr-2 py-2 flex items-center justify-between text-mobile-small ${disabled ? 'opacity-50 cursor-not-allowed' : 'hover:bg-beige/80'
          } ${value ? 'text-black' : 'text-darkgray'}`}
      >
        <span>{value || placeholder}</span>
        <ChevronDown className={`w-4 h-4 text-darkgray transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {isOpen && (
        <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-lightgray rounded-[15px] shadow-lg z-10 max-h-48 overflow-y-auto cursor-pointer">
          {options && options.map((option) =>
            <button
              key={option}
              onClick={() => handleSelect(option)}
              className="w-full pl-3 pr-2 py-2 text-left text-mobile-small hover:bg-beige transition-colors"
            >
              {option}
            </button>
          )}
        </div>
      )}

      {isOpen && (
        <div
          className="fixed inset-0 z-[5]"
          onClick={() => setIsOpen(false)}
        />
      )}
    </div>
  );
};

export default Select;
