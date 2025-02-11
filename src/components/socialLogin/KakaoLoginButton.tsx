import config from "../../apis/config";
import { PlatformKaKao } from "../../assets/svg";

const KakaoLoginButton = () => {
  const handleLogin = () => {
    try {
      window.location.href = `${config.apiBaseUrl}/oauth2/authorization/kakao`;
    } catch (error) {
      console.error("카카오 로그인 URL 리다이렉트 중 오류 발생:", error);
    }
  };

  return <PlatformKaKao onClick={handleLogin} className="w-[60px] h-[60px] cursor-pointer" />;
};

export default KakaoLoginButton;
