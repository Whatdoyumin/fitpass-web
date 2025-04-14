import axios from "axios";
import config from "../../config";
import { TOwnerSignUpData } from "../../../types/ownerSignup";

export const ownerSignUp = async ({
  name,
  id,
  password,
  phoneNumber,
  agreements,
  agree,
  corporation,
  businessRegistrationNumber,
    bankName,
    depositAccountName,
    depositAccountNumber,
    businessRegistrationUrl,
    bankCopyUrl,
}: TOwnerSignUpData) => {
  try {
    const response = await axios.post(`${config.apiBaseUrl}/auth/owner/register`, {
      loginId: id,
      password,
      phoneNumber,
      name,
      agree,
      termsAgreed: agreements.terms,
      personalInformationAgreed: agreements.privacy,
      thirdPartyAgreed: agreements.thirdParty,
      marketingAgreed: agreements.marketing,
        corporation,
        businessRegistrationNumber,
        bankName,
        depositAccountName,
        depositAccountNumber,
        businessRegistrationUrl,
        bankCopyUrl,
    });

    console.log("회원가입 응답:", response.data); // 응답 데이터 확인
    return response.data;
  } catch (error) {
    console.error("회원가입 오류:", error);
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data?.message || "회원가입에 실패했습니다.");
    } else {
      throw new Error("회원가입에 실패했습니다.");
    }
  }
};
