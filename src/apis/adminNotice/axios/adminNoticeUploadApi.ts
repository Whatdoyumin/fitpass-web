import { axiosInstance } from "../../axios-instance";
import { DraftNoticeResponse } from "../quries/useAdminNoticeUploadApi";

export const getAdminDraftNotice = async (): Promise<DraftNoticeResponse> => {
  try {
    const response = await axiosInstance.get("admin/notice/draftList");

    if (response.data.isSuccess) {
      return {
        notices: response.data.result.notices, // notices 배열 반환
      };
    }
    throw new Error(response.data.message);
  } catch (error) {
    console.error("오류:", error);
    throw error;
  }
};
async function convertUrlToFile(imageUrl: string, fileName: string): Promise<File> {
  const response = await fetch(imageUrl);
  const blob = await response.blob();
  const file = new File([blob], fileName, { type: blob.type });
  return file;
}

export const postAdminNotice = async ({
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
  image: File | string;
}) => {
  const formData = new FormData();

  formData.append("request", JSON.stringify({ id, title, content, type }));

  if (typeof image === 'string') {
    const file = await convertUrlToFile(image, "image.jpg");
    formData.append("image", file);
  } else {
    formData.append("image", image);
  }


  const response = await axiosInstance.post("/admin/notice/save", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  return response.data;
};

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
  image: File | string;
}) => {
  const formData = new FormData();
  
  formData.append("request", JSON.stringify({ id, title, content, type }));

  if (typeof image === 'string') {
    const file = await convertUrlToFile(image, "image.jpg");
    formData.append("image", file);
  } else {
    formData.append("image", image);
  }

  const response = await axiosInstance.post("/admin/notice/draft", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  return response.data;
};

export const getNoticeDetail = async (noticeId: number | undefined) => {
  if (typeof noticeId !== 'number') {
    return null;
  }
  const response = await axiosInstance.get(`/admin/notice/${noticeId}`);
  return response.data.result;
};
