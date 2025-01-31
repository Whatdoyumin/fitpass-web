// 예시)
// const postLogin = async ({ email, password }: TAuthBody) => {
//   const { data } = await axiosInstance.post("/auth/login", {
//     email: email,
//     password: password,
//   });
//   return data;
// };


import axios from "axios";

// ✅ 리프레시 토큰 API 요청 함수
export const Refresh = async (refreshToken: string) => {
  try {
    const response = await axios.post(`${import.meta.env.VITE_API_URL}/auth/refresh`, {
      refreshToken,
    });

    return response;
  } catch (error) {
    console.error("❌ 리프레시 토큰 재발급 실패", error);
    return { status: 401 }; // 리프레시 토큰 재발급 실패 시 401 반환
  }
};
