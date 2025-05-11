import { axiosInstance } from "../../axios-instance";

export const getPassInfo = async () => {
  const token = sessionStorage.getItem("accessToken");
  if (!token) return null;
  try {
    const response = await axiosInstance.get("/fitness/pass");
    return response.data.result;
  } catch {
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