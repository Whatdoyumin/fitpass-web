import { useMutation, useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";
import {
  getAdminDraftNotice,
  getNoticeDetail,
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

export interface NoticeDetailResponse {
  id: number | null;
  title: string;
  content: string;
  imageUrl: File | string | undefined;
  category: "EVENT" | "ANNOUNCEMENT";
}

// 임시저장 목록 불러오기기
export const useGetAdminNotice = () => {
  return useQuery<DraftNoticeResponse, AxiosError>({
    queryKey: ["adminDraftNotices"],
    queryFn: getAdminDraftNotice,
  });
};

// 공지사항 글 작성
export const usePostAdminNotice = () => {
  return useMutation<
    void,
    AxiosError<ErrorResponse>,
    {
      id: number | undefined;
      title: string;
      content: string;
      type: "ANNOUNCEMENT" | "EVENT";
      image: File | string | undefined;
    }
  >({
    mutationFn: postAdminNotice,
    onError: (error) => {
      console.error("게시 실패: ", error.response?.data?.message);
      alert(`${error.response?.data?.message}`);
    },
  });
};

// 공지사항 글 임시저장
export const usePostAdminDraftNotice = () => {
  return useMutation<
    void,
    AxiosError,
    {
      id: number | undefined;
      title: string;
      content: string;
      type: "ANNOUNCEMENT" | "EVENT";
      image: File | string | undefined;
    }
  >({
    mutationFn: postAdminDraftNotice,
    onError: (error) => {
      console.error("임시저장 실패: ", error);
      alert(`${error}`);
    },
  });
};

// 임시저장 글 불러오기
export const useGetNoticeDetail = (noticeId: number | undefined) => {
  return useQuery<NoticeDetailResponse, AxiosError>({
    queryKey: ["NoticeDetail", noticeId],
    queryFn: () => getNoticeDetail(noticeId),
  });
};
