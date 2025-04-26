import { axiosInstance } from "../../axios-instance"; 
import { NoticesResponse } from "../quries/useAdminNoticeApi"; 

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
        result: response.data.result, 
      };
    }

    throw new Error(response.data.message);
  } catch (error) {
    console.error("Failed to fetch notice detail:", error);
    throw error;
  }
};

export const patchHomeSlideCheck = async (noticeId: number, isMemberSlide: boolean) => {
  const response = await axiosInstance.patch(
    `/admin/notice/${noticeId}/member-slide-check?isMemberSlide=${isMemberSlide}`,
    { noticeId }
  );

  return response.data;
};
