import React from 'react';
import { List, Rows3 } from 'lucide-react';

interface ViewToggleProps {
  value: 'List' | 'Card';
  onChange: (value: 'List' | 'Card') => void;
  className?: string;
}

const ViewToggle: React.FC<ViewToggleProps> = ({
  value,
  onChange,
  className = ""
}) => {
  return (
    <div className={`flex bg-beige rounded-[8px] p-[5px] ${className}`}>
      <button
        onClick={() => onChange('List')}
        className={`px-3 py-1.5 rounded-[3px] flex items-center gap-2 transition-colors ${value === 'List'
          ? 'bg-white text-darkgreen'
          : 'text-darkgray hover:text-black'
          }`}
      >
        <List className="w-4 h-4" />
        <span className="text-mobile-small-bold">List</span>
      </button>
      <button
        onClick={() => onChange('Card')}
        className={`px-3 py-1.5 rounded-[3px] flex items-center gap-2 transition-colors ${value === 'Card'
          ? 'bg-white text-darkgreen'
          : 'text-darkgray hover:text-black'
          }`}
      >
        <Rows3 className="w-4 h-4" />
        <span className="text-mobile-small-bold">Card</span>
      </button>
    </div>
  );
};

export default ViewToggle;
