import { useEffect } from "react";
import axios from "axios";
import config from "../apis/config";
import { axiosInstance } from "../apis/axios-instance";
import { useAuth } from "../context/AuthContext";

const useAxiosInstance = () => {
  const { accessToken, refreshToken, setAccessToken, logout } = useAuth();

  useEffect(() => {
    // 요청 인터셉터: 모든 요청에 최신 accessToken 추가
    const requestInterceptor = axiosInstance.interceptors.request.use(
      (config) => {
        if (accessToken) {
          config.headers.Authorization = `Bearer ${accessToken}`;
        }
        return config;
      },
      (error) => Promise.reject(error)
    );

    // 응답 인터셉터: accessToken 만료 시 refreshToken으로 재발급
    const responseInterceptor = axiosInstance.interceptors.response.use(
      (response) => response,
      async (error) => {
        if (error.response?.status === 401 && refreshToken) {
          try {
            const { data } = await axios.post(`${config.apiBaseUrl}/auth/refresh`, { refreshToken });

            setAccessToken(data.accessToken);
            localStorage.setItem("accessToken", data.accessToken);

            // 실패한 요청을 새 accessToken으로 다시 시도
            error.config.headers.Authorization = `Bearer ${data.accessToken}`;
            return axiosInstance(error.config);
          } catch (refreshError) {
            console.error("Failed to refresh token:", refreshError);
            logout(); // refreshToken도 만료되었으면 로그아웃 처리
          }
        }
        return Promise.reject(error);
      }
    );

    return () => {
      axiosInstance.interceptors.request.eject(requestInterceptor);
      axiosInstance.interceptors.response.eject(responseInterceptor);
    };
  }, [accessToken, refreshToken, setAccessToken, logout]);

  return axiosInstance;
};

export { useAxiosInstance };
