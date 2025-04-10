export interface TSocialLoginData {
  name: string;
  phoneNumber: string;
}

import axios from "axios";
import { axiosInstance } from "../axios-instance";

export const socialLogin = async ({ name, phoneNumber }: TSocialLoginData) => {
  try {
    const response = await axiosInstance.post(`/auth/member/oauth2/register`, {
      phoneNumber,
      name,
      agree: true,
      termsAgreed: true,
      locationAgreed: true,
      thirdPartyAgreed: true,
      marketingAgreed: true,
    });

    console.log(response.data);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data?.message || "소셜 회원가입에 실패했습니다.");
    } else {
      throw new Error("소셜 회원가입에 실패했습니다.");
    }
  }
};
