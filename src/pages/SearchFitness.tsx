import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import SearchHeader from "../components/SearchHeader";
import FitnessCard from "../components/FitnessCard";
import { TFitness } from "../type/fitnessCard";

const mockFitnessData: TFitness[] = [
  {
    name: "동국대 헬스장",
    address: "서울특별시 중구 필동로 1길 30",
    distance: "1.1km",
    category: "헬스",
  },
  {
    name: "로아짐 수유역점",
    address: "서울 강북구 노해로8길 22 경남아너스빌 3층",
    distance: "1.1km",
    category: "헬스",
  },
  {
    name: "On 필라테스 센터",
    address: "서울 강북구 한천로 1093 농협건물 2층 (수유동)",
    distance: "2.1km",
    category: "필라테스",
  },
  { name: "진짜 요가센터", address: "중구 퇴계로 59000길", distance: "2.6km", category: "요가" },
];

function SearchFitness() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const initialSearchValue = searchParams.get("q") ?? "";
  const [searchValue, setSearchValue] = useState(initialSearchValue);
  const [filteredFitness, setFilteredFitness] = useState<TFitness[]>(mockFitnessData);

  useEffect(() => {
    const debounceTimeout = setTimeout(() => {
      if (searchValue.trim() === "") {
        setFilteredFitness([]);
      } else {
        const filtered = mockFitnessData.filter((item) =>
          item.name.toLowerCase().includes(searchValue.toLowerCase())
        );

        setFilteredFitness(filtered);
      }
    }, 300);

    return () => clearTimeout(debounceTimeout);
  }, [searchValue]);

  useEffect(() => {
    setSearchValue(initialSearchValue);
  }, [initialSearchValue]);

  const handleSearch = (keyword: string) => {
    if (!keyword.trim()) return;
    navigate(`?q=${keyword}`);
  };

  return (
    <div className="w-full h-auto min-h-full absolute z-20">
      <SearchHeader
        nav="/search-fitness?q"
        placeholder="시설을 검색해주세요."
        onSearch={handleSearch}
        searchValue={searchValue}
        setSearchValue={setSearchValue}
      />

      <div className="p-4">
        {filteredFitness.length > 0 ? (
          <FitnessCard fitness={filteredFitness} />
        ) : (
          <p className="text-center text-gray-600 mt-6">
            "{searchValue}"에 해당하는 검색 결과가 없습니다.
          </p>
        )}
      </div>
    </div>
  );
}

export default SearchFitness;
