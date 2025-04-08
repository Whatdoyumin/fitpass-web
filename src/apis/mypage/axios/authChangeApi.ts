import axios from "axios";
import config from "../../config"; // config 파일이 있는 경우
import { axiosInstance } from "../../axios-instance";

// axiosInstance 생성
export const axiosPasswordInstance = axios.create({
  baseURL: config.apiBaseUrl, // API 기본 URL
  headers: {
    Authorization: `Bearer ${sessionStorage.getItem("accessToken") || ""}`,
  },
  withCredentials: true, // 쿠키가 필요하면 true로 설정
});

// 비밀번호 변경 요청 함수
export const patchChangePassword = async ({
  password,
  newPassword,
}: {
  password: string;
  newPassword: string;
}) => {
  const response = await axiosPasswordInstance.patch("/auth/member/change/password", {
    password,
    newPassword,
  });

  return response.data;
};

// 전화번호 변경 요청 함수
export const patchChangePhoneNumber = async ({
  name,
  password,
  newPhoneNumber,
}: {
  name: string;
  password: string;
  newPhoneNumber: string;
}) => {
  const response = await axiosInstance.patch("/auth/member/change/phone-number", {
    name,
    password,
    newPhoneNumber,
  });

  return response.data;
};
