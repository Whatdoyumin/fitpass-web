import { useMutation, useQuery } from "@tanstack/react-query";
import { getPassInfo, postUsePass } from "../axios/usepassApi";
import { AxiosError } from "axios";

export const useGetPassInfo = () => {
  return useQuery({
    queryKey: ["fitnessPass"],
    queryFn: getPassInfo,
  });
};

export const usePostPass = () => {  
  return useMutation<string, AxiosError, { passId: number | undefined, isAgree: boolean }>( {
    mutationFn: ({ passId, isAgree }) => {
      return postUsePass(passId, isAgree);
    },
    onError: (error: AxiosError) => {
      console.error("패스 사용하기 오류: ", error);
    },
  });
};
