import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { signIn, TSignInData } from "../apis/signin/signin";
import { useAuth } from "../context/AuthContext";

export const useSignin = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
 
  return useMutation({
    mutationFn: (data: TSignInData) => signIn(data),
    mutationKey: ["signin"],
    onSuccess: (data: { result: { accessToken: string; refreshToken: string } }) => {
        console.log("로그인 성공");
        login(data.result.accessToken, data.result.refreshToken);
        navigate("/");
    },
    onError: (error:Error) => {
        console.error("로그인 실패:", error.message);
    },
  });
};
