import { useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { getNotices, getNoticeById } from "../axios/noticeApi";

export interface Notice {
  id: number;
  type: string;
  title: string;
  createdAt: string;
  imageUrl: string;
  content: string;
}

export interface NoticesResponse {
  content: { content: Notice[]; totalElements: number | undefined; totalPages: number };
}

export const useGetNotices = (page: number = 0, size: number = 10) => {
  return useQuery<NoticesResponse, AxiosError>({
    queryKey: ["notices", page, size],
    queryFn: () => getNotices(page, size),
  });
};

// 특정 공지사항 조회 훅
export const useGetNoticeById = (noticeId: number) => {
  return useQuery<Notice, AxiosError>({
    queryKey: ["notice", noticeId],
    queryFn: () => getNoticeById(noticeId),
  });
};
