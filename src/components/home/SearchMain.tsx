import SearchIcon from "@/assets/icon/ic_search.svg?react";

interface SearchMainProps {
  value: string;
  placeholder: string;
  onChange: (value: string) => void;
}

const SearchMain = ({ value, placeholder, onChange }: SearchMainProps) => {
  const handleSearch = () => {
    if (!value.trim()) {
      return;
    }

    console.log("검색어:", value);

    onChange("");
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <div className="relative w-full max-w-180 md:max-w-233">
      <input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onKeyDown={handleKeyDown}
        type="text"
        placeholder={placeholder}
        className="w-full rounded-2xl border-transparent bg-beige py-4 pl-6 text-base font-normal text-black placeholder-darkgray focus:outline-none md:border md:border-darkgray md:bg-white md:py-2 md:text-xl"
      />
      <SearchIcon
        onClick={handleSearch}
        className="absolute right-4 top-1/2 h-6 w-6 -translate-y-1/2 cursor-pointer text-darkgray"
      />
    </div>
  );
};

export default SearchMain;
