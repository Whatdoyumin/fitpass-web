import React, { createContext, useContext, useState, useEffect } from "react";

interface AuthContextType {
  isLogin: boolean;
  locationAgreed: boolean;
  memberId: number | null;
  isInitialized: boolean;
  login: (
    accessToken: string,
    refreshToken: string,
    locationAgreed: boolean,
    memberId: number
  ) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isLogin, setIsLogin] = useState<boolean>(!!sessionStorage.getItem("accessToken"));
  const [locationAgreed, setLocationAgreed] = useState<boolean>(false);
  const [isInitialized, setIsInitialized] = useState<boolean>(false);
  const [memberId, setmemberId] = useState<number | null>(() => {
    const stored = sessionStorage.getItem("memberId");
    return stored ? Number(stored) : null;
  });

  useEffect(() => {
    const token = sessionStorage.getItem("accessToken");
    const agreed = sessionStorage.getItem("locationAgreed") === "true";
    const storedmemberId = sessionStorage.getItem("memberId");

    setIsLogin(!!token);
    setLocationAgreed(agreed);
    setIsInitialized(true);
    setmemberId(storedmemberId ? Number(storedmemberId) : null);
  }, []);

  const login = (
    accessToken: string,
    refreshToken: string,
    locationAgreed: boolean,
    memberId: number
  ) => {
    sessionStorage.setItem("accessToken", accessToken);
    sessionStorage.setItem("refreshToken", refreshToken);
    sessionStorage.setItem("locationAgreed", locationAgreed ? "true" : "false");
    sessionStorage.setItem("memberId", memberId.toString());

    setLocationAgreed(locationAgreed);
    setIsLogin(true);
    setmemberId(memberId);
  };

  const logout = () => {
    sessionStorage.removeItem("accessToken");
    sessionStorage.removeItem("refreshToken");
    sessionStorage.removeItem("locationAgreed");
    sessionStorage.removeItem("memberId");
    sessionStorage.removeItem("hasShownLocationModal");

    setLocationAgreed(false);
    setIsLogin(false);
    setmemberId(null);
  };

  return (
    <AuthContext.Provider value={{ isLogin, locationAgreed, memberId, login, logout, isInitialized }}>
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
