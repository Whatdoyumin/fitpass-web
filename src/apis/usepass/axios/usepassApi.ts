import { axiosInstance } from "../../axios-instance";

export const getPassInfo = async () => {
  const token = sessionStorage.getItem("accessToken");
  if (!token) return null; // 토큰 없으면 요청 안 보냄
  try {
    const response = await axiosInstance.get("/fitness/pass");
    return response.data.result;
  } catch (error) {
    return null;
  }
};

export const postUsePass = async (passId: number | undefined, isAgree: boolean) => {
  const response = await axiosInstance.patch(`/fitness/pass/${passId}?isAgree=${isAgree}`, {
    passId: passId,
    isAgree: isAgree,
  }, 
);
  return response.data;
};