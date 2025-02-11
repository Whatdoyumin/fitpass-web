import axios from "axios";
import { TFitness } from "../types/fitnessCard";
import config from "./config";
import { axiosInstance } from "./axios-instance";

type FetchParams = {
  category: string;
  sort: string;
  cursor?: number;
  size?: number;
  isLogin?: boolean;
};

type FetchResponse = {
  data: TFitness[];
  nextCursor: number | null;
};

const getFitnessList = async ({
  category,
  sort,
  cursor = 0,
  size = 10,
  isLogin,
}: FetchParams): Promise<FetchResponse> => {
  const params = { category, sort, cursor, size };
  const { data } = isLogin
    ? await axiosInstance.get(`${config.apiBaseUrl}/fitness`, { params })
    : await axios.get(`${config.apiBaseUrl}/fitness`, { params })

  return {
    data: data.result.data,
    nextCursor: data.result.nextCursor ?? null,
  };
};

export { getFitnessList };
