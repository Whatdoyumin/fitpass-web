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

      localStorage.setItem('accessToken', response.data.result.accessToken);
      localStorage.setItem('refreshToken', response.data.result.refreshToken);

      console.log(response.data);
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || '로그인에 실패했습니다.');
  }
};