import { axiosInstance } from "../../axios-instance"; 
import { NoticesResponse } from "../quries/useAdminNoticeApi"; 

// 공지사항 목록 불러오기
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

// 회원 홈 슬라이드 게시 체크박스
export const patchMemberSlideCheck = async (noticeId: number, isMemberSlide: boolean) => {
  const response = await axiosInstance.patch(
    `/admin/notice/${noticeId}/member-slide-check?isMemberSlide=${isMemberSlide}`,
    { noticeId }
  );

  return response.data;
};

// 오너(시설) 홈 슬라이드 게시 체크박스
export const patchOwnerSlideCheck = async (noticeId: number, isOwnerSlide: boolean) => {
  const response = await axiosInstance.patch(
    `/admin/notice/${noticeId}/owner-slide-check?isOwnerSlide=${isOwnerSlide}`,
    { noticeId }
  );
  return response.data;
}