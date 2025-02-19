import { axiosInstance } from "../../axios-instance";
import { DraftNoticeResponse } from "../quries/useAdminNoticeUploadApi";

export const getAdminDraftNotice = async (): Promise<DraftNoticeResponse> => {
  try {
    const response = await axiosInstance.get("admin/notice/draftList");

    if (response.data.isSuccess) {
      return {
        count: response.data.result.count,
        titles: response.data.result.titles,
      };
    }
    throw new Error(response.data.message);
  } catch (error) {
    console.error("Failed to fetch notice detail:", error);
    throw error;
  }
};

export const postAdminNotice = async ({
  title,
  content,
  type,
  image,
}: {
  title: string;
  content: string;
  type: "ANNOUNCEMENT" | "EVENT";
  image: File;
}) => {
  const formData = new FormData();

  formData.append("request", JSON.stringify({ title, content, type }));
  formData.append("image", image);

  const response = await axiosInstance.post("/admin/notice/save", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  return response.data;
};


export const postAdminDraftNotice = async ({
  title,
  content,
  type,
  image,
}: {
  title: string;
  content: string;
  type: "ANNOUNCEMENT" | "EVENT";
  image: File | string;
}) => {
  const formData = new FormData();

  formData.append("request", JSON.stringify({ title, content, type }));
  formData.append("image", image);

  const response = await axiosInstance.post("/admin/notice/draft", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  return response.data;
};