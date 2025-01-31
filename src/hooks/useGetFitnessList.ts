import { useInfiniteQuery } from "@tanstack/react-query";
import { getFitnessList } from "../apis/exploreFitness";

type FetchParams = {
  category: string;
  sort: string;
};

function useGetFitnessList({ category, sort }: FetchParams) {
  const fetchFitness = async ({ pageParam = 0 }: { pageParam: number }) => {
    const params = {
      category: category || "헬스",
      sort:
        sort === "거리순"
          ? "distance"
          : sort === "저가순"
          ? "lowPrice"
          : sort === "고가순"
          ? "highPrice"
          : "distance",
      cursor: pageParam,
      size: 10,
    };
    return getFitnessList(params);
  };

  return useInfiniteQuery({
    queryKey: ["fitnessList", category, sort],
    queryFn: fetchFitness,
    initialPageParam: 0,
    getNextPageParam: (lastPage) => lastPage.nextCursor ?? undefined,
  });
}

export { useGetFitnessList };
