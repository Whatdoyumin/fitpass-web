import axios from "axios";
import config from "./config";

export const axiosInstance = axios.create({
  baseURL: config.apiBaseUrl,
  headers: {
    Authorization: `Bearer ${sessionStorage.getItem("accessToken") || ""}`,
  },
  withCredentials: true, // ✅ 쿠키 사용 (필요시)
});

// ✅ Axios 요청 인터셉터: 모든 요청에 액세스 토큰 추가
axiosInstance.interceptors.request.use(
  (config) => {
    const accessToken = sessionStorage.getItem("accessToken");
    if (accessToken) {
      config.headers["Authorization"] = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// ✅ Axios 응답 인터셉터: 401 발생 시 리프레시 토큰을 사용하여 액세스 토큰 갱신
axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response?.status === 401) {
      console.log("🔄 [401 오류] 리프레시 토큰을 사용하여 액세스 토큰 재발급 중...");

      const refreshToken = sessionStorage.getItem("refreshToken");

      if (!refreshToken) {
        console.error("🚪 [리프레시 토큰 없음] 로그아웃 필요.");
        sessionStorage.removeItem("accessToken");
        sessionStorage.removeItem("refreshToken");
        return Promise.reject(error);
      }

      try {
        // ✅ 새로운 액세스 토큰 요청
        const res = await axios.post(`${config.apiBaseUrl}/auth/refresh`, null, {
          headers: {
            "Refresh-Token": refreshToken, // 리프레시 토큰을 헤더로 전달
          },
        });

        if (res.status === 200) {
          const newAccessToken = res.data.result.accessToken;
          const newRefreshToken = res.data.result.refreshToken;

          console.log("✅ [리프레시 성공] 새 액세스 토큰 발급 완료.");

          // 🔄 새로운 토큰을 sessionStorage에 저장
          sessionStorage.setItem("accessToken", newAccessToken);
          sessionStorage.setItem("refreshToken", newRefreshToken);

          // 🔄 원래 요청을 새 액세스 토큰으로 재시도
          error.config.headers["Authorization"] = `Bearer ${newAccessToken}`;
          return axiosInstance(error.config);
        }
      } catch (refreshError) {
        console.error("🚪 [리프레시 토큰 만료] 로그아웃 처리 필요.");
        sessionStorage.removeItem("accessToken");
        sessionStorage.removeItem("refreshToken");
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);
