import { axiosInstance } from "../../axios-instance";

export const getPassInfo = async () => {
  const response = await axiosInstance.get(`/fitness/pass`);
  return response.data;
};

export const postUsePass = async (passId: number | undefined, isAgree: boolean) => {
  const response = await axiosInstance.patch(`/fitness/pass/${passId}?isAgree=${isAgree}`, {
    passId: passId,
    isAgree: isAgree,
  }, 
);
  return response.data;
};