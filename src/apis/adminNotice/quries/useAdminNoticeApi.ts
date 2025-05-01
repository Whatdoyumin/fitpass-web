import { useMutation, useQuery } from "@tanstack/react-query";
import { AxiosError } from 'axios';
import { getAdminNotice, patchMemberSlideCheck, patchOwnerSlideCheck } from '../axios/adminNoticeAPI';
export interface Notice {
  id: number;
  imageUrl: string;
  title: string;
  category: string;
  createdAt: string; 
  status: string; 
  isMemberHomeSlide: boolean;
  isOwnerHomeSlide: boolean;
  isMemberSlide: boolean;
  isOwnerSlide: boolean;
}

export interface AdminNoticesResponse {
  content: Notice[];
  pageSize: number;
  currentPage: number;
  totalPages: number;
  totalElements: number;
}

export interface NoticesResponse {
  isSuccess: boolean;
  code: string;
  message: string;
  result: AdminNoticesResponse;
}

interface ErrorResponse {
  message: string;
}

// 전체 공지사항 목록 불러오기 
export const useGetAdminNotice = (keyword: string | null, page: number = 1, size: number = 10) => {
  return useQuery<NoticesResponse, AxiosError<ErrorResponse>>({
    queryKey: ["notices", keyword, page, size], 
    queryFn: () => getAdminNotice(keyword, page, size),
  });
};

// 회원 홈 배너 이미지 선택 체크박스 
export const usePatchMemberSlideCheck = (refetch: () => void) => {
  return useMutation<
    { isSuccess: boolean; code: string; message: string; result: string },
    AxiosError<ErrorResponse>,
    { noticeId: number; isMemberSlide: boolean }
  >({
    mutationFn: ({ noticeId, isMemberSlide }) => patchMemberSlideCheck(noticeId, isMemberSlide),
    onError: (error: AxiosError<ErrorResponse>) => {
      alert(`${error.response?.data?.message}`);
    },
    onSuccess: async (data: { isSuccess: boolean; code: string; message: string; result: string }) => {
      if (data.isSuccess) {
        console.log("홈슬라이드 변경 성공");
        refetch(); // 성공 후 데이터 리패칭
      }
    },
  });
};

// 오너(시설) 홈 배너 이미지 선택 체크박스
export const usePatchOwnerSlideCheck = (refetch: () => void) => {
  return useMutation<
    { isSuccess: boolean; code: string; message: string; result: string },
    AxiosError<ErrorResponse>,
    { noticeId: number; isOwnerSlide: boolean }
  >({
    mutationFn: ({ noticeId, isOwnerSlide }) => patchOwnerSlideCheck(noticeId, isOwnerSlide),
    onError: (error: AxiosError<ErrorResponse>) => {
      alert(`${error.response?.data?.message}`);
    },
    onSuccess: async (data: { isSuccess: boolean; code: string; message: string; result: string }) => {
      if (data.isSuccess) {
        refetch(); // 성공 후 데이터 리패칭
      }
    },
  });
}
