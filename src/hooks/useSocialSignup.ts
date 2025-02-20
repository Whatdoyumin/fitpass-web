import { useMutation } from "@tanstack/react-query";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import axios from "axios";

interface TSocialSignupData {
  phoneNumber: string;
  name: string;
}

export const useSocialSignup = () => {
  const navigate = useNavigate();
  const { login } = useAuth();

  return useMutation({
    mutationKey: ["socialSignup"],
    mutationFn: async (data: TSocialSignupData) => {
      // ✅ 쿠키에서 `accessToken` 가져오기
      const getCookie = (name: string) => {
        const match = document.cookie.match(new RegExp("(^| )" + name + "=([^;]+)"));
        return match ? match[2] : "";
      };

      const accessToken = getCookie("accessToken");
      if (!accessToken) throw new Error("AccessToken이 존재하지 않습니다.");

      sessionStorage.setItem("accessToken", accessToken);

      // ✅ 소셜 회원가입 API 요청
      const response = await axios.post(
        "https://fitpass.co.kr/auth/oauth2/register",
        data,
        {
          withCredentials: true, // 쿠키 인증 유지
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      return response.data;
    },
    onSuccess: (data: { result: { accessToken: string; refreshToken: string; memberRole: string } }) => {
      console.log("✅ 소셜 회원가입 성공", data);
      login(data.result.accessToken, data.result.refreshToken);

      if (data.result.memberRole === "ADMIN") navigate("/admin");
      else navigate("/");
    },
    onError: (error: Error) => {
      console.error("🚨 소셜 회원가입 실패:", error.message);
    },
  });
};
