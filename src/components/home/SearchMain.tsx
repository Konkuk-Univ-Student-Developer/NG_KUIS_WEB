import SearchIcon from "@/assets/icon/ic_search.svg?react";

export interface SearchResult {
  id: string;
  name: string;
  path: string;
}

interface SearchMainProps {
  value: string;
  placeholder: string;
  onChange: (value: string) => void;
  onSearch: () => void;
  results: SearchResult[];
  showResults: boolean;
  onResultClick: (id: string) => void;
}

const SearchMain = ({
  value,
  placeholder,
  onChange,
  onSearch,
  results,
  showResults,
  onResultClick,
}: SearchMainProps) => {
  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      onSearch();
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
        onClick={onSearch}
        className="absolute right-4 top-1/2 h-6 w-6 -translate-y-1/2 cursor-pointer text-darkgray"
      />

      {/* 검색 결과 드롭다운 */}
      {showResults && (
        <div className="absolute top-full mt-2 w-full bg-white rounded-lg shadow-lg z-20 border border-gray-200 max-h-80 overflow-y-auto">
          {results.length > 0 ? (
            <ul>
              {results.map((result) => (
                <li key={result.id}>
                  <button
                    onClick={() => onResultClick(result.id)}
                    className="w-full text-left px-4 py-3 hover:bg-beige transition-colors"
                  >
                    <p className="font-semibold text-black">{result.name}</p>
                    <p className="text-sm text-darkgray">{result.path}</p>
                  </button>
                </li>
              ))}
            </ul>
          ) : (
            <div className="p-4 text-center text-darkgray">
              검색 결과가 없습니다.
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default SearchMain;
