import axios from 'axios';
import config from '../config';

export const signUp = async (name, id, password, phoneNumber) => {
  try {
    const response = await axios.post(`${config.apiBaseUrl}/auth/register`, {
        "loginId": id,
        "password": password,
        "phoneNumber": phoneNumber,
        "name": name,
        "agree": true,
        "termsAgreed": true,
        "locationAgreed": true,
        "thirdPartyAgreed": true,
        "marketingAgreed": true
      });

    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || '회원가입에 실패했습니다.');
  }
};