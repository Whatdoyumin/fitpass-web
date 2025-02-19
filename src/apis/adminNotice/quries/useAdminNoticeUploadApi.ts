import { useMutation, useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";
import {
  getAdminDraftNotice,
  postAdminDraftNotice,
  postAdminNotice,
} from "../axios/adminNoticeUploadApi";

export interface DraftNotice {
  id: number;
  title: string;
}
export interface DraftNoticeResponse {
  notices: DraftNotice[];
}

interface ErrorResponse {
  message: string;
}

export const useGetAdminNotice = () => {
  return useQuery<DraftNoticeResponse, AxiosError>({
    queryKey: ["adminDraftNotices"], // queryKey를 더 명확하게 수정
    queryFn: getAdminDraftNotice, // 바로 함수 전달 가능
  });
};

export const usePostAdminNotice = () => {
  return useMutation<
    void,
    AxiosError<ErrorResponse>,
    { title: string; content: string; type: "ANNOUNCEMENT" | "EVENT"; image: File }
  >({
    mutationFn: postAdminNotice,
    onError: (error) => {
      console.error("게시 실패: ", error.response?.data?.message);
      alert(`${error.response?.data?.message}`);
    },
  });
};

export const usePostAdminDraftNotice = () => {
  return useMutation<
    void,
    AxiosError<ErrorResponse>,
    { title: string; content: string; type: "ANNOUNCEMENT" | "EVENT"; image: File | string }
  >({
    mutationFn: postAdminDraftNotice,
    onError: (error) => {
      console.error("임시저장 실패: ", error.response?.data?.message);
      alert(`${error.response?.data?.message}`);
    },
  });
};


