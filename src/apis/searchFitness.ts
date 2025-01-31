import { TSearchParam } from "../type/searchFitness";
import { axiosInstance } from "./axios-instance";

const getSearchFitness = async ({ keyword, cursor = 0, size = 7 }: TSearchParam) => {
  const { data } = await axiosInstance.get(`/fitness/search`, {
    params: { keyword, cursor, size },
  });

  return {
    data: data.result.data,
    nextCursor: data.result.nextCursor,
    hasNextPage: data.result.nextCursor !== null,
  };
};

export { getSearchFitness };
