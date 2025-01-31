import { TPayHistory } from "../type/payHistory";
import { axiosInstance } from "./axios-instance";

const getPayHistory = async ({ query, cursor = 0, size = 7 }: TPayHistory) => {
  const { data } = await axiosInstance.get(`/coin/pay/history`, {
    params: { query, cursor, size },
  });

  return {
    data: data.result.items,
    nextCursor: data.result.hasNext ? data.result.cursor : null,
    hasNext: data.result.hasNext,
  };
};

const postPayDeactivate = async () => {
  const { data } = await axiosInstance.post(`/plan/pay/deactivate`);
  return data;
};

export { getPayHistory, postPayDeactivate };
