import { useState, useEffect, useRef } from "react";
import ArrowDown from "@/assets/icon/ic_arrow_down.svg?react";

interface FilterProps {
  options: string[];
  selectedOption: string;
  onSelect: (option: string) => void;
}

const Filter = ({ options, selectedOption, onSelect }: FilterProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const filterRef = useRef<HTMLDivElement>(null);

  // 외부 클릭 시 드롭다운 닫기
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        filterRef.current &&
        !filterRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleOptionClick = (option: string) => {
    onSelect(option);
    setIsOpen(false);
  };

  return (
    <div className="relative w-full" ref={filterRef}>
      <div
        className="bg-beige rounded-2xl pl-6 pr-4 h-11 flex items-center justify-between w-full cursor-pointer md:h-14"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className="text-darkgray text-sm font-normal leading-[1.2] md:text-xl md:leading-[2.0]">
          {selectedOption}
        </span>
        <ArrowDown
          className={`size-6 transition-transform ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </div>

      {/* 드롭다운 메뉴 */}
      {isOpen && (
        <div className="absolute top-full mt-2 w-full bg-white rounded-lg shadow-lg z-10 border border-gray-200">
          <ul>
            {options.map((option) => (
              <li key={option}>
                <button
                  onClick={() => handleOptionClick(option)}
                  className={`w-full text-left px-4 py-2 text-sm md:text-lg hover:bg-beige
                    ${
                      selectedOption === option
                        ? "font-bold text-darkgreen"
                        : "text-black"
                    }`}
                >
                  {option}
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Filter;
