import React from 'react';
import config from "../../apis/config";
import { PlatformGoogle } from '../../assets/svg';

const GoogleLoginButton = () => {
  const handleLogin = () => {
    try {
        window.location.href = `${config.apiBaseUrl}/oauth2/authorization/google?redirect_uri=http://localhost:5173/signup/step2`
    } catch (error) {
      console.error('구글 로그인 URL 리다이렉트 중 오류 발생:', error);
    }
  };

  return (
      <PlatformGoogle onClick={handleLogin} className="w-[60px] h-[60px] cursor-pointer" />
  );
};

export default GoogleLoginButton;

