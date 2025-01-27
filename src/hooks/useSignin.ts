import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { signIn, TSignInData } from "../apis/signin/signin";
import { AxiosError } from "axios";

export const useSignin = () => {
  const navigate = useNavigate();

  return useMutation({
    mutationFn: (data: TSignInData) => signIn(data),
    mutationKey: ["signin"],
    onSuccess: () => {
      navigate("/");
    },
    onError: (error: AxiosError<{ message?: string }>) => {
      throw new Error(
        error.response?.data?.message || "로그인에 실패했습니다."
      );
    },
  });
};
