// useQuery 반환 타입을 FitnessData로 설정
import { useQuery, UseQueryResult } from "@tanstack/react-query";
import { getReviewFitness } from "../axios/reviewApi";
import { useMutation } from "@tanstack/react-query";
import { postReview } from "../axios/reviewApi";

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

export const usePostReview = () => {
  return useMutation({
    mutationFn: postReview,
  });
};
