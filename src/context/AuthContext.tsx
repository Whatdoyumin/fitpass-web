import React, { createContext, useContext, useState, useEffect } from "react";

interface AuthContextType {
  accessToken: string | null;
  refreshToken: string | null;
  isLogin: boolean;
  login: (accessToken: string, refreshToken: string) => void;
  logout: () => void;
  setAccessToken: (token: string) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [accessToken, setAccessToken] = useState<string | null>(
    sessionStorage.getItem("accessToken")
  );
  const [refreshToken, setRefreshToken] = useState<string | null>(
    sessionStorage.getItem("refreshToken")
  );
  const [isLogin, setIsLogin] = useState(!!sessionStorage.getItem("accessToken")); // ✅ 저장된 토큰 기준 로그인 상태 유지

  useEffect(() => {
    setIsLogin(!!accessToken);
  }, [accessToken]);

  const login = (newAccessToken: string, newRefreshToken: string) => {
    setAccessToken(newAccessToken);
    setRefreshToken(newRefreshToken);
    setIsLogin(true);

    sessionStorage.setItem("accessToken", newAccessToken);
    sessionStorage.setItem("refreshToken", newRefreshToken);
  };

  const logout = () => {
    setAccessToken(null);
    setRefreshToken(null);
    setIsLogin(false);

    sessionStorage.removeItem("accessToken");
    sessionStorage.removeItem("refreshToken"); // ✅ 로그아웃 시 삭제
  };

  return (
    <AuthContext.Provider
      value={{ accessToken, refreshToken, isLogin, setAccessToken, login, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
