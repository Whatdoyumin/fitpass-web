import { useMutation } from "@tanstack/react-query";
import { useAuth } from "../context/AuthContext";
import { socialLogin, TSocialLoginData } from "../apis/signup/social-login";

export const useSocialSignup = () => {
  const { login } = useAuth();

  return useMutation({
    mutationKey: ["socialSignup"],
    mutationFn: async (data: TSocialLoginData) => {
      const response = await socialLogin(data);
      return response;
    },
    onSuccess: (data: { result: { accessToken: string; refreshToken: string } }) => {
      console.log("✅ 소셜 회원가입 성공");
      login(data.result.accessToken, data.result.refreshToken);
    },
    onError: (error: Error) => {
      console.error("🚨 소셜 회원가입 실패:", error.message);
    },
  });
};
