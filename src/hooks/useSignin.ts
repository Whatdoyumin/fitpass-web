import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { signIn, TSignInData } from "../apis/signin/signin";

export const useSignin = () => {
  const navigate = useNavigate();
  const { login } = useAuth();

  return useMutation({
    mutationKey: ["signin"],
    mutationFn: async (data: TSignInData) => {
      const response = await signIn(data);
      return response;
    },
    onSuccess: (data: {
      result: {
        accessToken: string;
        refreshToken: string;
        role: string;
        locationAgreed: boolean;
        userId: number;
      };
    }) => {
      console.log("로그인 성공");
      login(
        data.result.accessToken,
        data.result.refreshToken,
        data.result.locationAgreed,
        data.result.userId
      );
      if (data.result.role === "ADMIN") navigate("/admin");
      else navigate("/");
    },
    onError: (error: Error) => {
      console.error("로그인 실패:", error.message);
    },
  });
};
