import { useInfiniteQuery } from "@tanstack/react-query";
import { getPayHistory } from "../apis/payment/payHistory";
import { TPayQuery } from "../types/payHistory";

function useGetPayHistory(query: TPayQuery) {
  return useInfiniteQuery({
    queryKey: ["payHistory", query],
    queryFn: ({ pageParam = 0 }) => getPayHistory({ query, cursor: pageParam, size: 7 }),
    initialPageParam: 0,
    getNextPageParam: (lastPage) => lastPage.nextCursor,
  });
}

export { useGetPayHistory };
