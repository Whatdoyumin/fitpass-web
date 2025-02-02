import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import SearchHeader from "../components/SearchHeader";
import FitnessCard from "../components/fitnessCard/FitnessCard";
import { useGetSearchFitness } from "../hooks/useGetSearchFitness";
import { useInView } from "react-intersection-observer";
import { GuideLogin } from "./GuideLogin";
import { useAuth } from "../context/AuthContext";

function SearchFitness() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [searchValue, setSearchValue] = useState(searchParams.get("q") ?? "");
  const [debouncedSearchValue, setDebouncedSearchValue] = useState(searchValue);
  const { isLogin } = useAuth();

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearchValue(searchValue);
    }, 500);

    return () => {
      clearTimeout(handler);
    };
  }, [searchValue]);

  useEffect(() => {
    setSearchValue(searchParams.get("q") ?? "");
  }, [searchParams]);

  const { data, isFetching, hasNextPage, fetchNextPage, isPending, isError, error } =
    useGetSearchFitness(debouncedSearchValue);

  const { ref, inView } = useInView({ threshold: 0 });

  useEffect(() => {
    if (inView && hasNextPage && !isFetching) {
      fetchNextPage();
    }
  }, [inView, hasNextPage, isFetching, fetchNextPage]);

  const handleSearch = (keyword: string) => {
    if (!keyword.trim()) return;
    navigate(`?q=${keyword}`);
  };

  if (isError) {
    if ((error as { status?: number })?.status === 401) {
      return (
        <div className="h-screen flex items-center justify-center">
          <GuideLogin />
        </div>
      );
    }
    alert("다시 시도해주세요.");
    return;
  }

  if (!isLogin) {
    return (
      <div className="h-screen flex items-center justify-center">
        <GuideLogin />
      </div>
    );
  }

  const fitnessList = data?.pages.flatMap((page) => page.data) ?? [];

  return (
    <div className="w-full h-full overflow-y-auto absolute z-20">
      <SearchHeader
        nav="/search-fitness?q"
        placeholder="시설을 검색해주세요."
        onSearch={handleSearch}
        searchValue={searchValue}
        setSearchValue={setSearchValue}
      />
      {!isPending ? (
        <div className="w-full h-full overflow-y-auto p-4 pb-16">
          {debouncedSearchValue && fitnessList.length > 0 ? (
            <>
              <FitnessCard fitness={fitnessList} />
              <div ref={ref}>...</div>
            </>
          ) : (
            debouncedSearchValue && (
              <p className="text-center text-gray-600 mt-6">
                "{searchValue}"에 해당하는 검색 결과가 없습니다.
              </p>
            )
          )}
        </div>
      ) : (
        <div></div>
      )}
    </div>
  );
}

export default SearchFitness;
