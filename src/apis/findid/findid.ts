export interface TFindIdData {
    name: string;
    phoneNumber: string;
    }

import axios from 'axios';
import config from '../config';

export const findId = async ({ name, phoneNumber }: TFindIdData) => {
  try {
    const response = await axios.post(`${config.apiBaseUrl}/auth/find-id`, {
        "name": name,
        "phoneNumber": phoneNumber
      });

      console.log(response.data);
    return response.data.result;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data?.message || '아이디 찾기에 실패했습니다.');
    } else {
      throw new Error('아이디 찾기에 실패했습니다.');
    }
  }
};