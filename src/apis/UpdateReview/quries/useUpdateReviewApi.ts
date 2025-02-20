import { useQuery, UseQueryResult } from "@tanstack/react-query";
import { getReviewFitness } from "../axios/updateReviewApi";
import { useMutation } from "@tanstack/react-query";
import { patchUpdateReview } from "../axios/updateReviewApi";
import { AxiosError } from "axios";

type FitnessData = {
  fitnessId: number;
  fitnessName: string;
  address: string;
  phoneNumber: string;
  categoryName: string;
  notice: string;
  time: string;
  howToUse: string;
  etc: string;
  fee: number;
  distance: number;
  imageUrl: string;
  fitnessLatitude: number;
  fitnessLongitude: number;
};

export const useGetReviewFitness = (fitnessId: number): UseQueryResult<FitnessData, Error> => {
  return useQuery({
    queryKey: ["fitness", fitnessId],
    queryFn: () => getReviewFitness(fitnessId),
  });
};

// 홈 배너 이미지 선택 체크박스 
export const usePatchUpdateReview = () => {
  return useMutation<
    { isSuccess: boolean; code: string; message: string; result: string; },
    AxiosError, 
    { reviewId: number; content:string; score:number; } 
  >({
    mutationFn: ({ reviewId, content, score }) => patchUpdateReview(reviewId, content, score),
  });
};

