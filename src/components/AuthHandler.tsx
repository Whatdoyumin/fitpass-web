import { useEffect } from "react";
import { useAuth } from "../context/AuthContext";

/** ✅ 소셜 로그인 후, 쿠키에서 토큰을 가져와 저장하는 컴포넌트 */
const AuthHandler = () => {
  const { login } = useAuth();

  useEffect(() => {
    const getCookie = (name: string) => {
      const match = document.cookie.match(new RegExp("(^| )" + name + "=([^;]+)"));
      return match ? match[2] : "";
    };

    // ✅ 쿠키에서 토큰 값 가져오기
    const accessToken = getCookie("accessToken");
    const refreshToken = getCookie("refreshToken");
    const locationAgreed = sessionStorage.getItem("locationAgreed") === "true";
    const rawUserId = sessionStorage.getItem("userId");
    const userId = rawUserId ? Number(rawUserId) : null;

    if (accessToken && refreshToken && userId !== null) {
      // ✅ 토큰 저장 후 로그인 상태 유지
      login(accessToken, refreshToken, locationAgreed, userId);
    }
  }, [login]);

  return null;
};

export default AuthHandler;
