import { useInfiniteQuery } from "@tanstack/react-query";
import { getSearchFitness } from "../apis/searchFitness";

function useGetSearchFitness(keyword: string) {
  return useInfiniteQuery({
    queryKey: ["searchFitness", keyword],
    queryFn: ({ pageParam = 0 }) => getSearchFitness({ keyword, cursor: pageParam, size: 7 }),
    initialPageParam: 0,
    getNextPageParam: (lastPage) => (lastPage.hasNextPage ? lastPage.nextCursor : null),
  });
}

export { useGetSearchFitness };
