import { NoticesResponse } from "../../../hooks/useNoticeApi";
import { axiosInstance } from '../../axios-instance';

// 공지사항 목록 조회 함수
export const getNotices = async (page: number = 0, size: number = 10): Promise<NoticesResponse> => {
  try {
    const response = await axiosInstance.get('/notice', {
      params: {
        page,
        size,
      },
    });

    if (response.data.isSuccess) {
      return {
        content: response.data.result, 
      };
    }
    
    throw new Error(response.data.message); // 성공하지 않으면 에러 발생
  } catch (error) {
    console.error('Failed to fetch notices:', error);
    throw error;
  }
};

export const getNoticeById = async (noticeId: number) => {
  try {
    const response = await axiosInstance.get(`/notice/${noticeId}`);

    if (response.data.isSuccess) {
      return response.data.result; 
    }
    throw new Error(response.data.message);
  } catch (error) {
    console.error('Failed to fetch notice detail:', error);
    throw error;
  }
};