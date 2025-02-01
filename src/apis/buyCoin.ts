import { TKakaoPayBody, TPayCoinSuccess } from "../types/buyCoin";
import { axiosInstance } from "./axios-instance";

const postPayCoin = async ({ itemName, quantity, totalAmount, methodName }: TKakaoPayBody) => {
  const { data } = await axiosInstance.post("/coin/pay/request", {
    itemName: itemName,
    quantity: quantity,
    totalAmount: totalAmount,
    methodName: methodName,
  });
  return data;
};

const postPayCoinSuccess = async ({ pgToken }: TPayCoinSuccess) => {
  const { data } = await axiosInstance.post(`/coin/pay/success?pg_token=${pgToken}`);
  return data;
};

export { postPayCoin, postPayCoinSuccess };
