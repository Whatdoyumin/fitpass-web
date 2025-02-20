import { useQuery } from "@tanstack/react-query";
import { axiosInstance } from "../apis/axios-instance";

const buyPass = async (id: number) => {
  const response = await axiosInstance.get(`/fitness/payment/${id}`);
  return response.data.result;
};

export const usePaymentPass = ( id: number ) => {
  return useQuery({
    queryKey: ['passId', id],
    queryFn: () => buyPass(id)
  });
};