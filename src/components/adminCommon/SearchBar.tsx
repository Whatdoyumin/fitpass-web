import { SearchGray } from "../../assets/svg";

interface ISearchHeader {
  onSearch: (query: string) => void;
  searchValue: string;
  setSearchValue: React.Dispatch<React.SetStateAction<string>>;
}

const SearchBar = ({ onSearch, searchValue, setSearchValue }: ISearchHeader) => {
  const onChangeSearchValue = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value);
  };

  const handleSearch = () => {
    if (searchValue.trim()) {
      onSearch(searchValue);
    }
  };

  const handleSearchWithKeyboard = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <div className="flex flex-col gap-2">
      <div className="w-[345px] h-10 rounded-5 border border-gray-450 flex justify-between px-2">
        <input
          type="text"
          placeholder="검색어를 입력하세요."
          className="h-full w-[300px] rounded-5 focus:outline-none text-14px"
          value={searchValue}
          onChange={onChangeSearchValue}
          onKeyDown={handleSearchWithKeyboard}
        />
        <SearchGray width={"24px"} className="cursor-pointer" />
      </div>
    </div>
  );
};

export default SearchBar;
