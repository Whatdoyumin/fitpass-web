import config from "../../apis/config";
import { PlatformKaKao } from "../../assets/svg";

const KakaoLoginButton = () => {
  const handleLogin = () => {
    try {
      const kakaoAuthUrl = `https://kauth.kakao.com/oauth/authorize?client_id=${config.kakao.clientId}&redirect_uri=${config.kakao.redirectUri}&response_type=code`;
      window.location.href = kakaoAuthUrl;
    } catch (error) {
      console.error("카카오 로그인 URL 리다이렉트 중 오류 발생:", error);
    }
  };

  return <PlatformKaKao onClick={handleLogin} className="w-[60px] h-[60px] cursor-pointer" />;
};

export default KakaoLoginButton;
