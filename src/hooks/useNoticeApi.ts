import { useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { getNotices, getNoticeById } from "../apis/mypage/axios/noticeApi";
import { getOwnerNotices, getOwnerNoticeById } from "../apis/owner/notices";

export interface Notice {
  id: number;
  noticeType: string;
  title: string;
  createdAt: string;
  imageUrl: string;
  content: string;
  views: number;
}

export interface NoticesResponse {
  content: { content: Notice[]; totalElements: number | undefined; totalPages: number };
}

// 일반 회원 공지사항 목록 조회 훅
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

// 사장님 공지사항 목록 조회 훅
export const useGetOwnerNotices = (page: number = 0, size: number = 10) => {
  return useQuery<NoticesResponse, AxiosError>({
    queryKey: ["ownerNotices", page, size],
    queryFn: () => getOwnerNotices(page, size),
  });
};

// 사장님 특정 공지사항 조회 훅
export const useGetOwnerNoticeById = (noticeId: number) => {
  return useQuery<Notice, AxiosError>({
    queryKey: ["ownerNotice", noticeId],
    queryFn: () => getOwnerNoticeById(noticeId),
  });
}