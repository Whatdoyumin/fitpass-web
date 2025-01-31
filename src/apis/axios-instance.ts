import axios from "axios";
import config from "./config";
import { useAuth } from "../context/AuthContext";

const accessToken = sessionStorage.getItem("accessToken");
const refreshToken = sessionStorage.getItem("sessionToken");

export const axiosInstance = axios.create({
  headers: {
    Authorization: `Bearer ${accessToken}`,
  },
  baseURL: config.apiBaseUrl,
});

// ✅ Axios 인터셉터: 토큰 자동 적용
axiosInstance.interceptors.request.use(
  (config) => {
    if (accessToken) {
      config.headers["Authorization"] = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// ✅ Axios 인터셉터: 401 발생 시 자동 리프레시 토큰 요청
axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const { login, logout } = useAuth();

    if (error.response?.status === 401 && refreshToken) {
      console.log("🔑 리프레시 토큰으로 재시도합니다.");
      try {
        const res = await axios.post(`${config.apiBaseUrl}/auth/refresh`, {
          refreshToken,
        });

        login(res.data.result.accessToken, res.data.result.refreshToken);

        // ✅ 요청 재시도
        error.config.headers["Authorization"] = `Bearer ${res.data.result.accessToken}`;
        return axiosInstance(error.config);
      } catch (refreshError) {
        logout();
        console.error("🚪 리프레시 토큰 만료됨. 로그아웃 처리됨.", refreshError);
      }
    }
    return Promise.reject(error);
  }
);
