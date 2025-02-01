export interface TFindPwData {
    id: string;
    name: string;
    phoneNumber: string;
    }

export interface TResetPwData {
  id: string;
  password: string;
}

import axios from 'axios';
import config from '../config';

export const findPw = async ({ id, name, phoneNumber }: TFindPwData) => {
  try {
    const response = await axios.post(`${config.apiBaseUrl}/auth/find-password`, {
        "loginId": id,
        "name": name,
        "phoneNumber": phoneNumber
      });

      console.log(response.data);
    return response.data.result;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data?.message || '비밀번호 찾기에 실패했습니다.');
    } else {
      throw new Error('비밀번호 찾기에 실패했습니다.');
    }
  }
};

export const resetPw = async ({ id, password }: TResetPwData) => {
  try {
    const response = await axios.patch(`${config.apiBaseUrl}/auth/reset-password`, {
        "loginId": id,
        "newPassword": password,
      });

      console.log(response.data);
    return response.data.result;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data?.message || '비밀번호 변경에 실패했습니다.');
    } else {
      throw new Error('비밀번호 변경에 실패했습니다.');
    }
  }
};