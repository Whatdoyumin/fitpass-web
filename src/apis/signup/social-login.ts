export interface TSocialLoginData {
  name: string;
  phoneNumber: string;
  isWork: boolean;
  company_name?: string;
  agreements: {
    terms: boolean;
    privacy: boolean;
    location: boolean;
    thirdParty: boolean;
    marketing: boolean;
  };
  agree: boolean;
}

import axios from "axios";
import { axiosInstance } from "../axios-instance";

export const socialLogin = async ({ name, phoneNumber, isWork, company_name, agreements, agree }: TSocialLoginData) => {
  try {
    console.log("🔍 소셜 로그인 API 호출 데이터:", {
      phoneNumber,
      name,
      agree,
      termsAgreed: agreements.terms,
      locationAgreed: agreements.location,
      thirdPartyAgreed: agreements.thirdParty,
      marketingAgreed: agreements.marketing,
      isWork,
      company_name,
    });

    const response = await axiosInstance.post(`/auth/member/oauth2/register`, {
      phoneNumber,
      name,
      agree,
      termsAgreed: agreements.terms,
      locationAgreed: agreements.location,
      thirdPartyAgreed: agreements.thirdParty,
      marketingAgreed: agreements.marketing,
      isWork,
      company_name,
    });

    return response.data;
  } catch (error) {
    console.error("🚨 소셜 로그인 API 오류:", error);
    if (axios.isAxiosError(error)) {
      console.error("🚨 API 오류 상세:", error.response?.data);
      throw new Error(error.response?.data?.message || "소셜 회원가입에 실패했습니다.");
    } else {
      throw new Error("소셜 회원가입에 실패했습니다.");
    }
  }
};
