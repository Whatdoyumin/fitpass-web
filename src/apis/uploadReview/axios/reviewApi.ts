import { axiosInstance } from "../../axios-instance";

export const getReviewFitness = async (fitnessId: number) => {
  const response = await axiosInstance.get(`/fitness/${fitnessId}`);
  return response.data.result;
};
// 특정 패스 ID에 대한 리뷰 작성
export const postReview = async ({
  passId,
  content,
  score,
  agree,
}: {
  passId: number;
  content: string;
  score: number;
  agree: boolean;
}) => {
  const response = await axiosInstance.post(`/fitness/${passId}/review`, {
    content,
    score,
    passId,
    agree,
  });
  return response.data;
};