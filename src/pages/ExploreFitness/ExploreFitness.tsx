import { useEffect, useRef, useState } from "react";
import CategorySlide from "./CategorySlide";
import Dropdown from "./Dropdown";
import FitnessCard from "../../components/fitnessCard/FitnessCard";
import SkeletonFitnessCard from "../../components/fitnessCard/SkeletonFitnessCard";
import { useGetFitnessList } from "../../hooks/useGetFitnessList";
import { LoadingSpinner } from "../../components/LoadingSpinner";

function ExploreFitness() {
  const dropdown: string[] = ["거리순", "저가순", "고가순"];
  const category: string[] = ["헬스", "필라테스", "요가", "기타"];

  const [selectedSort, setSelectedSort] = useState(dropdown[0]);
  const [selectedCategory, setSelectedCategory] = useState<string>("헬스");

  const { data, isPending, isError, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useGetFitnessList({ category: selectedCategory, sort: selectedSort });

  const observerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!observerRef.current || !hasNextPage) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          fetchNextPage();
        }
      },
      { threshold: 0.8 }
    );

    observer.observe(observerRef.current);

    return () => observer.disconnect();
  }, [hasNextPage, fetchNextPage]);

  const fitness = data ? data.pages.flatMap((page) => page.data) : [];

  if (isError) {
    console.log("에러가 발생했습니다. 다시 시도해주세요.");
    return <LoadingSpinner />;
  }

  return (
    <div className="bg-white-200 px-5 pt-6 pb-16 w-full h-full max-h-full overflow-y-auto absolute">
      <div className="flex justify-between mb-3 mt-5 px-1">
        <span className="text-[25px] font-extrabold">피트니스 시설</span>
        <div className="relative z-10">
          <Dropdown dropdown={dropdown} onSortChange={setSelectedSort} />
        </div>
      </div>
      <CategorySlide category={category} onCategoryChange={setSelectedCategory} />
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
