import { TKakaoPayBody, TPayCoinSuccess } from "../types/buyCoin";
import { TChangeSub } from "../types/payment";
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

const postPlanSidStatus = async () => {
  const { data } = await axiosInstance.post(`/plan/pay/sid-status`);
  return data;
};

const postPlanChange = async (body: TChangeSub) => {
  const { data } = await axiosInstance.post(`/plan/pay/change`, body);
  return data;
};

export { postSubscibe, postPayPlanSuccess, postPlanSidStatus, postPlanChange };
