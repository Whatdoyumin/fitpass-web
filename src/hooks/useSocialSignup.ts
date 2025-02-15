import { useMutation } from "@tanstack/react-query";
import { useAuth } from "../context/AuthContext";
import { socialLogin, TSocialLoginData } from "../apis/signup/social-login";
import { useNavigate } from "react-router-dom";

export const useSocialSignup = () => {
    const navigate = useNavigate();
  const { login } = useAuth();

  return useMutation({
    mutationKey: ["socialSignup"],
    mutationFn: async (data: TSocialLoginData) => {
      const response = await socialLogin(data);
      return response;
    },
    onSuccess: (data: { result: { accessToken: string; refreshToken: string, memberRole: string } }) => {
      console.log("✅ 소셜 회원가입 성공");
      login(data.result.accessToken, data.result.refreshToken);
      if (data.result.memberRole === "ADMIN")
        navigate("/admin")
      else
        navigate("/");
    },
    onError: (error: Error) => {
      console.error("🚨 소셜 회원가입 실패:", error.message);
    },
  });
};
