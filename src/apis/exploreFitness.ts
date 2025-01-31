import axios from "axios";
import { TFitness } from "../type/fitnessCard";
import config from "./config";

type FetchParams = {
  category: string;
  sort: string;
  cursor?: number;
  size?: number;
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
}: FetchParams): Promise<FetchResponse> => {
  const params = { category, sort, cursor, size };
  const { data } = await axios.get(`${config.apiBaseUrl}/fitness`, { params });

  return {
    data: data.result.data,
    nextCursor: data.result.nextCursor ?? null,
  };
};

export { getFitnessList };
