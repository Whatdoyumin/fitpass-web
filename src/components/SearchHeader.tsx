import { BackIcon, SearchGray } from "../assets/svg";
import { useNavigate } from "react-router-dom";

interface ISearchHeader {
  placeholder: string;
  nav: string;
  onSearch: (query: string) => void;
  searchValue: string;
  setSearchValue: React.Dispatch<React.SetStateAction<string>>;
}

const SearchHeader = ({
  placeholder,
  nav,
  onSearch,
  searchValue,
  setSearchValue,
}: ISearchHeader) => {
  const navigate = useNavigate();

  const onChangeSearchValue = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value);
  };

  const handleSearch = () => {
    navigate(nav + `=${searchValue}`);
    if (searchValue.trim()) {
      onSearch(searchValue);
    }
  };

  const handleSearchMovieWithKeyboard = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <header className="w-full max-w-content top-0 h-header bg-white-100 fixed flex items-end z-30">
      <div className="w-full flex items-center justify-between border-b-2 border-gray-300 pb-4 px-4">
        <BackIcon
          width={"11px"}
          className="left-0 cursor-pointer"
          onClick={() => window.history.back()}
        />
        <input
          type="text"
          placeholder={placeholder}
          className="w-60"
          value={searchValue}
          onChange={onChangeSearchValue}
          onKeyDown={handleSearchMovieWithKeyboard}
        />
        <SearchGray width={"26px"} onClick={handleSearch} />
      </div>
    </header>
  );
};

export default SearchHeader;
