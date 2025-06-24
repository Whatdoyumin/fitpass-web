import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { socialLogin } from "../apis/signup/social-login";
import { TSocialLoginData } from "../apis/signup/social-login";

interface TSocialSignupData extends TSocialLoginData {
  accessToken: string;
}

export const useSocialSignup = () => {
  const navigate = useNavigate();

  return useMutation({
    mutationKey: ["socialSignup"],
    mutationFn: async (data: TSocialSignupData) => {
    
      if (!data.accessToken) {
        throw new Error("토큰이 없습니다. accessToken: " + data.accessToken);
      }
      
      // 소셜 회원가입 API 호출을 위해 임시로 토큰 설정
      sessionStorage.setItem("accessToken", data.accessToken);
      
      const response = await socialLogin(data);
      
      console.log("🔍 소셜 로그인 응답:", response);
      
      // 회원가입 완료 후 토큰 제거
      sessionStorage.removeItem("accessToken");

      return response;
    },
    onSuccess: () => {
      navigate("/signin");
      console.log("✅ 소셜 회원가입 성공");
    },
    onError: (error: Error) => {
      console.error("🚨 소셜 회원가입 실패:", error.message);
    },
  });
};
