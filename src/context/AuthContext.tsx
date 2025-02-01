import React, { createContext, useContext, useState, useEffect } from "react";

interface AuthContextType {
  isLogin: boolean;
  login: (accessToken: string, refreshToken: string) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isLogin, setIsLogin] = useState(!!sessionStorage.getItem("accessToken"));

  useEffect(() => {
    setIsLogin(!!sessionStorage.getItem("accessToken"));
  }, []);

  const login = (accessToken: string, refreshToken: string) => {
    sessionStorage.setItem("accessToken", accessToken);
    sessionStorage.setItem("refreshToken", refreshToken);
    setIsLogin(true);
  };

  const logout = () => {
    sessionStorage.removeItem("accessToken");
    sessionStorage.removeItem("refreshToken");
    setIsLogin(false);
  };

  return <AuthContext.Provider value={{ isLogin, login, logout }}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
