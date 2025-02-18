import { axiosInstance } from "../../axios-instance"; // axios 인스턴스를 적절한 경로에서 import
import { NoticesResponse } from "../quries/useAdminNoticeApi"; // NoticesResponse 타입을 가져옴

export const getAdminNotice = async (
  keyword: string | null,
  page: number = 0,
  size: number = 10
): Promise<NoticesResponse> => {
  try {
    const response = await axiosInstance.get("admin/notice", {
      params: {
        keyword,
        page,
        size,
      },
    });

    if (response.data.isSuccess) {
      return {
        isSuccess: response.data.isSuccess,
        code: response.data.code,
        message: response.data.message,
        result: response.data.result, // result 부분에 AdminNoticesResponse 할당
      };
    }

    throw new Error(response.data.message);
  } catch (error) {
    console.error("Failed to fetch notice detail:", error);
    throw error;
  }
};
