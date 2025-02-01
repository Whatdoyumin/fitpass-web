import { TKakaoPayBody, TPayCoinSuccess } from "../types/buyCoin";
import { axiosInstance } from "./axios-instance";

const postSubscibe = async ({ itemName, totalAmount, methodName }: TKakaoPayBody) => {
  const { data } = await axiosInstance.post("/plan/pay/first-request", {
    itemName: itemName,
    totalAmount: totalAmount,
    methodName: methodName,
  });
  return data;
};

const postPayPlanSuccess = async ({ pgToken }: TPayCoinSuccess) => {
  const { data } = await axiosInstance.post(`/plan/pay/success?pg_token=${pgToken}`);
  return data;
};

export { postSubscibe, postPayPlanSuccess };
