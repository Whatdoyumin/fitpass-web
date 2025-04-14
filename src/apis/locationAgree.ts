import { axiosInstance } from "./axios-instance";

export const patchLocationAgree = async () => {
  const response = await axiosInstance.patch("/auth/member/location_agree", {
    locationAgreed: true,
  });

  if (!response.data.isSuccess) {
    throw new Error(response.data.message || "위치 동의 실패");
  }

  return response.data;
};
