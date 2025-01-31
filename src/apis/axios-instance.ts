import axios from "axios";
import config from "./config";

let accessToken: string | null = null;
let refreshToken: string | null = null;
let isLogin: boolean = false;  // ✅ 전역 로그인 상태

export const setTokens = (newAccessToken: string, newRefreshToken: string) => {
    console.log("🔑 토큰이 설정되었습니다.");
  accessToken = newAccessToken;
  refreshToken = newRefreshToken;
  isLogin = true;
};

export const clearTokens = () => {
  accessToken = null;
  refreshToken = null;
  isLogin = false;
};

export const getIsLogin = () => isLogin;  // ✅ 로그인 상태 반환

export const axiosInstance = axios.create({
  baseURL: config.apiBaseUrl,
  withCredentials: true,
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
    if (error.response?.status === 401 && refreshToken) {
        console.log("🔑 리프레시 토큰으로 재시도합니다.");
      try {
        const res = await axios.post(`${config.apiBaseUrl}/auth/refresh`, {
          refreshToken,
        });

        setTokens(res.data.result.accessToken, res.data.result.refreshToken);

        // ✅ 요청 재시도
        error.config.headers["Authorization"] = `Bearer ${res.data.result.accessToken}`;
        return axiosInstance(error.config);
      } catch (refreshError) {
        clearTokens();
        console.error("🚪 리프레시 토큰 만료됨. 로그아웃 처리됨.");
      }
    }
    return Promise.reject(error);
  }
);
