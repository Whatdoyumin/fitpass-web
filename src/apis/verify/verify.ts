export interface TVerifyCodeData {
    phoneNumber: string;
    }
    
export interface TVerifyPhoneNumberData {
    phoneNumber: string;
    certificationCode: string;
    }

import axios from 'axios';
import config from '../config';

// 휴대폰 번호 인증을 요청하는 API
export const verifyCode = async (phoneNumber: string) => {
    try {
        const response = await axios.post(`${config.apiBaseUrl}/auth/verify-code`, {
        phoneNumber: phoneNumber
        });
        return response.data;
    } catch (error) {
        throw new Error(error.response?.data?.message || '문자 전송에 실패했습니다.');
    }
    }

// 휴대폰 번호 인증을 검증하는 API
export const verifyPhoneNumber = async ({ phoneNumber, certificationCode }: TVerifyPhoneNumberData) => {
    try {
        const response = await axios.post(`${config.apiBaseUrl}/auth/verification`, {
        phoneNumber: phoneNumber,
        certificationCode: certificationCode
        });
        return response.data;
    } catch (error) {
        throw new Error(error.response?.data?.message || '휴대폰 인증에 실패했습니다.');
    }
    }
