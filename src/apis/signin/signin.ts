export interface TSignInData {
    id: string;
    password: string;
    }

import axios from 'axios';
import config from '../config';

export const signIn = async ({ id, password }: TSignInData) => {
  try {
    const response = await axios.post(`${config.apiBaseUrl}/auth/login`, {
        "loginId": id,
        "password": password
      });

      console.log(response.data);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data?.message || '로그인에 실패했습니다.');
    } else {
      throw new Error('로그인에 실패했습니다.');
    }
  }
};