import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { signIn, TSignInData } from "../apis/signin/signin";

export const useSignin = () => {
  const navigate = useNavigate();

  return useMutation({
    mutationFn: (data: TSignInData) => signIn(data),
    mutationKey: ["signin"],
    onSuccess: () => {
      navigate("/");
    },
    onError: (error:Error) => {
        console.error("로그인 실패:", error.message);
    },
  });
};
