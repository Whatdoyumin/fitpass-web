import { useMutation, useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";
import {
  getAdminDraftNotice,
  postAdminDraftNotice,
  postAdminNotice,
} from "../axios/adminNoticeUploadApi";

export interface DraftNoticeResponse {
  count: number;
  titles: string[];
}
interface ErrorResponse {
  message: string;
}

export const useGetAdminNotice = () => {
  return useQuery<DraftNoticeResponse, AxiosError>({
    queryKey: ["notices"],
    queryFn: () => getAdminDraftNotice(),
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
