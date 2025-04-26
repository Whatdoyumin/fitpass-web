import { axiosInstance } from "../../axios-instance";
import { DraftNoticeResponse, FullEditNoticeForm, FullNoticeForm } from "../quries/useAdminNoticeUploadApi";

// 임시저장 목록 불러오기
export const getAdminDraftNotice = async (): Promise<DraftNoticeResponse> => {
  try {
    const response = await axiosInstance.get("admin/notice/draftList");
    if (response.data.isSuccess) {
      return {
        notices: response.data.result.notices,
      };
    }
    throw new Error(response.data.message);
  } catch (error) {
    console.error("오류:", error);
    throw error;
  }
};

// 공지사항 작성
export const postAdminNotice = async ({
  title,
  content,
  type,
  image,
  memberSlide,
  ownerSlide,
}: FullNoticeForm) => {
  const formData = new FormData();

  formData.append("request", JSON.stringify({ title, content, type, memberSlide, ownerSlide }));

  if (image instanceof File) {
    formData.append("image", image);
  }

  const response = await axiosInstance.post("/admin/notice/save", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  return response.data;
};

// 임시저장
export const postAdminDraftNotice = async ({
  id,
  title,
  content,
  type,
  image,
}: {
  id: number | undefined;
  title: string;
  content: string;
  type: "ANNOUNCEMENT" | "EVENT";
  image: File | string | undefined;
}) => {
  const formData = new FormData();

  formData.append("request", JSON.stringify({ id, title, content, type }));

  if (image instanceof File) {
    formData.append("image", image);
  }

  const response = await axiosInstance.post("/admin/notice/draft", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  return response.data;
};

// 공지사항 상세 조회
export const getNoticeDetail = async (noticeId: number | undefined) => {
  if (!noticeId && noticeId !== 0) return null;

  const response = await axiosInstance.get(`/admin/notice/${noticeId}`);
  return response.data.result;
};

// 공지사항 수정
export const putAdminNotice = async ({
  id,
  title,
  content,
  type,
  image,
  memberSlide,
  ownerSlide,
}: FullEditNoticeForm) => {
  const formData = new FormData();

  formData.append("request", JSON.stringify({ id, title, content, type, memberSlide, ownerSlide }));

  if (image instanceof File) {
    formData.append("image", image);
  }

  const response = await axiosInstance.put("/admin/notice", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  return response.data;
};
