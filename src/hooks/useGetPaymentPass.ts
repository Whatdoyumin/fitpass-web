import { useQuery } from "@tanstack/react-query";
import { axiosInstance } from "../apis/axios-instance";

export type PaymentPass = {
  id: number;
  name: string;
  fitnessImage: string;
  fee: number;
  discount: number;
  totalFee: number;
  feeBeforePay: number;
  feeAfterPay: number;
}

const buyPass = async (id: number): Promise<PaymentPass>  => {
  const response = await axiosInstance.get<{ result: PaymentPass}>(`/fitness/payment/${id}`);
  return response.data.result;
};

export const usePaymentPass = (  id: number, queryKey: string ) => {
  return useQuery<PaymentPass>({
    queryKey: [queryKey, id],
    queryFn: () => buyPass(id)
  });
};