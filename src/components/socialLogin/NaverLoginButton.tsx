import config from "../../apis/config";
import { PlatformNaver } from "../../assets/svg";

const NaverLoginButton = () => {
  const handleLogin = () => {
    try {
      window.location.href = `${config.apiBaseUrl}/oauth2/authorization/naver`;
    } catch (error) {
      console.error("네이버 로그인 URL 리다이렉트 중 오류 발생:", error);
    }
  };

  return <PlatformNaver onClick={handleLogin} className="w-[60px] h-[60px] cursor-pointer" />;
};

export default NaverLoginButton;
