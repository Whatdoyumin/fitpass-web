import React, { createContext, useContext, useState, useEffect } from "react";

interface AuthContextType {
  isLogin: boolean;
  locationAgreed: boolean;
  login: (accessToken: string, refreshToken: string, locationAgreed: boolean) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isLogin, setIsLogin] = useState(!!sessionStorage.getItem("accessToken"));
  const [locationAgreed, setLocationAgreed] = useState(false);

  useEffect(() => {
    const token = sessionStorage.getItem("accessToken");
    const agreed = sessionStorage.getItem("locationAgreed") === "true";
  
    setIsLogin(!!token);
    setLocationAgreed(agreed);
  }, []);
  

  const login = (accessToken: string, refreshToken: string, locationAgreed: boolean) => {
    sessionStorage.setItem("accessToken", accessToken);
    sessionStorage.setItem("refreshToken", refreshToken);
    sessionStorage.setItem("locationAgreed", locationAgreed ? "true" : "false");
    setLocationAgreed(locationAgreed);
    setIsLogin(true);
  };

  const logout = () => {
    sessionStorage.removeItem("accessToken");
    sessionStorage.removeItem("refreshToken");
    sessionStorage.removeItem("locationAgreed");
    sessionStorage.removeItem("hasShownLocationModal");
    setLocationAgreed(false);
    setIsLogin(false);
  };

  return <AuthContext.Provider value={{ isLogin, locationAgreed, login, logout }}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
