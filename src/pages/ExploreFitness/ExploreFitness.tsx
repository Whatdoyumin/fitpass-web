import { useEffect, useRef, useState } from "react";
import CategorySlide from "./CategorySlide";
import Dropdown from "./Dropdown";
import FitnessCard from "../../components/fitnessCard/FitnessCard";
import axios from "axios";
import { useInfiniteQuery } from "@tanstack/react-query";
import { TFitness } from "../../type/fitnessCard";
import SkeletonFitnessCard from "../../components/fitnessCard/SkeletonFitnessCard";

type FetchResponse = {
  data: TFitness[],
  nextCursor: number | null,
}

// 피트니스 시설 살펴보기
function ExploreFitness() {
  const dropdown: string[] = ["거리순", "저가순", "고가순"];
  const category: string[] = ["헬스", "필라테스", "요가", "기타"];

  const [selectedSort, setSelectedSort] = useState(dropdown[0]);
  const [selectedCategory, setSelectedCategory] = useState<string>("헬스");

  const fetchFitness = async ({ pageParam = 0 }: { pageParam: number }): Promise<FetchResponse> => {
    const params = {
      category: selectedCategory || '헬스', 
      sort: 
        selectedSort === "거리순" 
          ? 'distance' 
          : selectedSort === "저가순" 
          ? 'lowPrice' 
          : selectedSort === "고가순" 
          ? "highPrice" 
          : 'distance',
      cursor: pageParam,
      size: 10
    };

    const response = await axios.get("http://15.165.128.52:8080/fitness", { params })
    // return (response.data.result.data);
    return {
      data: response.data.result.data,
      nextCursor: response.data.result.nextCursor || null,
    };
  }

  const { 
    data, 
    isPending, 
    isError,
    fetchNextPage, // 다음 페이지 데이터를 불러오는 함수
    hasNextPage, // 다음 페이지가 있는지 여부 (boolean)
    isFetchingNextPage, // 다음 페이지 로딩 중인지 여부
  } = useInfiniteQuery<FetchResponse>({
    queryKey: ['sortFitness', selectedSort, selectedCategory],
    queryFn: fetchFitness,
    // queryFn:({ pageParam = 0 }: { pageParam: number }) => fetchFitness({ pageParam }),
    initialPageParam: 0,
    getNextPageParam: (lastPage) => lastPage.nextCursor ?? undefined,
  });

  // console.log(data);

  const observerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!observerRef.current || !hasNextPage) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) { // 요소가 화면에 보임
          fetchNextPage();
        }
      },
      { threshold: 0.8 }
    );

    observer.observe(observerRef.current);  // 관찰 요소

    return () => observer.disconnect();
  }, [hasNextPage, fetchNextPage]);
  
  const fitness = data ? data.pages.flatMap((page) => page.data) : [];


  // console.log(fitness);

  if (isError) {
    return <div>로딩중...</div>
  }

  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category);
  };

  return (
    <div className="bg-white-200 px-5 py-6 h-screen">
      <div className="flex justify-between mb-3 mt-5 px-1">
        <span className="text-[25px] font-extrabold">피트니스 시설</span>
        <div className="relative z-10">
          <Dropdown dropdown={dropdown} onSortChange={setSelectedSort} />
        </div>
      </div>
      <CategorySlide category={category} onCategoryChange={handleCategoryChange} />
      <div className="flex flex-col items-center">
        {isPending ? (
          Array.from({ length: 10 }).map((_, index) => (
            <div className="flex flex-col items-center mb-[15px]" key={index}>
              <SkeletonFitnessCard />
            </div>
          ))
        ) : (
          <>
            <FitnessCard fitness={fitness} />
            <div ref={observerRef} className="h-10 w-full text-center">
              {isFetchingNextPage && "로딩중..."}
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default ExploreFitness;
