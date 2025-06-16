import { axiosInstance } from "../axios-instance";
import {
  IPaymentStartRequest,
  IPaymentStartResponse,
  IPaymentCompleteRequest,
  IPaymentCompleteResponse,
} from "../../types/nicePayment";

export const requestNicePaymentStart = async (
  body: IPaymentStartRequest
): Promise<IPaymentStartResponse> => {
  const { data } = await axiosInstance.post("/coin/pay/start", body);
  return data;
};

export const requestNicePaymentComplete = async (
  body: IPaymentCompleteRequest
): Promise<IPaymentCompleteResponse> => {
  const { data } = await axiosInstance.post("/coin/pay/payment/complete", body);
  return data;
};
