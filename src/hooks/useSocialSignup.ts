import { useMutation } from "@tanstack/react-query";
import { useAuth } from "../context/AuthContext";
import { socialLogin } from "../apis/signup/social-login";

interface TSocialSignupData {
  phoneNumber: string;
  name: string;
  accessToken: string;
  refreshToken: string;
}

export const useSocialSignup = () => {
  const { login } = useAuth();

  return useMutation({
    mutationKey: ["socialSignup"],
    mutationFn: async (data: TSocialSignupData) => {
      sessionStorage.setItem("accessToken", data.accessToken);
      login(data.accessToken, data.refreshToken);

      const response = await socialLogin(data);
      return response;
    },
    onSuccess: (data) => {
      console.log("✅ 소셜 회원가입 성공", data);
    },
    onError: (error: Error) => {
      console.error("🚨 소셜 회원가입 실패:", error.message);
    },
  });
};
