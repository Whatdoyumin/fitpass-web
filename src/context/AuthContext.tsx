import React, { createContext, useContext, useState, useEffect } from "react";

interface AuthContextType {
  isLogin: boolean;
  locationAgreed: boolean;
  userId: number | null;
  login: (
    accessToken: string,
    refreshToken: string,
    locationAgreed: boolean,
    userId: number
  ) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isLogin, setIsLogin] = useState<boolean>(!!sessionStorage.getItem("accessToken"));
  const [locationAgreed, setLocationAgreed] = useState<boolean>(false);
  const [userId, setUserId] = useState<number | null>(() => {
    const stored = sessionStorage.getItem("userId");
    return stored ? Number(stored) : null;
  });

  useEffect(() => {
    const token = sessionStorage.getItem("accessToken");
    const agreed = sessionStorage.getItem("locationAgreed") === "true";
    const storedUserId = sessionStorage.getItem("userId");

    setIsLogin(!!token);
    setLocationAgreed(agreed);
    setUserId(storedUserId ? Number(storedUserId) : null);
  }, []);

  const login = (
    accessToken: string,
    refreshToken: string,
    locationAgreed: boolean,
    userId: number
  ) => {
    sessionStorage.setItem("accessToken", accessToken);
    sessionStorage.setItem("refreshToken", refreshToken);
    sessionStorage.setItem("locationAgreed", locationAgreed ? "true" : "false");
    sessionStorage.setItem("userId", userId.toString());

    setLocationAgreed(locationAgreed);
    setIsLogin(true);
    setUserId(userId);
  };

  const logout = () => {
    sessionStorage.removeItem("accessToken");
    sessionStorage.removeItem("refreshToken");
    sessionStorage.removeItem("locationAgreed");
    sessionStorage.removeItem("userId");
    sessionStorage.removeItem("hasShownLocationModal");

    setLocationAgreed(false);
    setIsLogin(false);
    setUserId(null);
  };

  return (
    <AuthContext.Provider value={{ isLogin, locationAgreed, userId, login, logout }}>
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
