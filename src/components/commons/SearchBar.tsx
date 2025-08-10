import SearchIcon from "@/assets/icon/ic_search.svg?react";
import { useState, type KeyboardEvent } from "react";

interface SearchBarProps {
  placeholder?: string;
  onSearch?: (query: string) => void;
}

const SearchBar = ({ placeholder = "검색하기", onSearch }: SearchBarProps) => {
  const [query, setQuery] = useState("");

  const handleSearch = () => {
    onSearch?.(query);
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <div className="relative flex w-full items-center">
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder={placeholder}
        className="h-11 w-full rounded-2xl bg-beige pl-6 pr-12 text-sm font-normal leading-[1.2] text-darkgray placeholder:text-darkgray focus:outline-none focus:ring-2 focus:ring-darkgreen/50 md:h-14 md:text-xl md:leading-[2.0]"
      />
      <SearchIcon
        onClick={handleSearch}
        className="absolute right-4 size-6 cursor-pointer"
      />
    </div>
  );
};

export default SearchBar;
