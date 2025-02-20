import { axiosInstance } from "../../axios-instance";

export const getReviewFitness = async (fitnessId: number) => {
  const response = await axiosInstance.get(`/fitness/${fitnessId}`);
  return response.data.result;
};

// 특정 reviewId의 리뷰 수정
export const patchUpdateReview = async (reviewId: number, content:string, score:number) => {
  const response = await axiosInstance.patch(
    `/fitness/review/${reviewId}`,
    { reviewId, content, score }
  );

  return response.data;
};
