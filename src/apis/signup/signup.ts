export interface TSignUpData {
  name: string;
  id: string;
  password: string;
  phoneNumber: string;
  agreements: {
    terms: boolean;
    privacy: boolean;
    location: boolean;
    thirdParty: boolean;
    marketing: boolean;
  };
  agree: boolean;
  isWork: boolean;
  company_name?: string;
}

export interface TCheckIDData {
  id: string;
}

import axios from "axios";
import config from "../config";

export const signUp = async ({
  name,
  id,
  password,
  phoneNumber,
  agreements,
  agree,
  isWork,
  company_name,
}: TSignUpData) => {
  try {
    const response = await axios.post(`${config.apiBaseUrl}/auth/member/register`, {
      loginId: id,
      password,
      phoneNumber,
      name,
      agree,
      termsAgreed: agreements.terms,
      personalInformationAgreed: agreements.privacy,
      thirdPartyAgreed: agreements.thirdParty,
      locationAgreed: agreements.location,
      marketingAgreed: agreements.marketing,
      isWork,
      company_name
    });

    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data?.message || "회원가입에 실패했습니다.");
    } else {
      throw new Error("회원가입에 실패했습니다.");
    }
  }
};

// 아이디 중복 확인 API
export const checkID = async ({ id }: TCheckIDData) => {
  try {
    const response = await axios.get(`${config.apiBaseUrl}/auth/check/login-id`, {
      params: {
        loginId: id,
      },
    });
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data?.message || "아이디 중복 확인에 실패했습니다.");
    } else {
      throw new Error("아이디 중복 확인에 실패했습니다.");
    }
  }
};
