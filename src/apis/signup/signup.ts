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

      console.log(response.data);
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || '회원가입에 실패했습니다.');
  }
};

export const checkID = async (id) => {
  try {
    const response = await axios.get(`${config.apiBaseUrl}/auth/check/login-id`, {
      params: {
        loginId: id,
      },
    });
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || '아이디 중복 확인에 실패했습니다.');
  }
}