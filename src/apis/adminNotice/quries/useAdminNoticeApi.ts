import { useMutation, useQuery } from "@tanstack/react-query";
import { AxiosError } from 'axios';
import { getAdminNotice, patchHomeSlideCheck } from '../axios/adminNoticeAPI';
export interface Notice {
  id: number;
  imageUrl: string;
  title: string;
  category: string;
  createdAt: string; 
  status: string; 
  isHomeSlide: boolean;
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

export const useGetAdminNotice = (keyword: string | null, page: number = 1, size: number = 10) => {
  return useQuery<NoticesResponse, AxiosError>({
    queryKey: ["notices", keyword, page, size], 
    queryFn: () => getAdminNotice(keyword, page, size),
  });
};

export const usePatchHomeSlideCheck = () => {
  return useMutation<
    { isSuccess: boolean; code: string; message: string; result: string; },
    AxiosError<ErrorResponse>, 
    { noticeId: number; isHomeSlide: boolean; } 
  >({
    mutationFn: ({ noticeId, isHomeSlide }) => patchHomeSlideCheck(noticeId, isHomeSlide),
    onError: (error: AxiosError<ErrorResponse>) => {
      console.error("오류:", error.response?.data?.message);
      alert(`${error.response?.data?.message}`);
    },
    onSuccess: (data: { isSuccess: boolean; code: string; message: string; result: string }) => {
      if (data.isSuccess) {
        console.log("홈슬라이드 변경 성공");
        window.location.reload();
      } else {
        console.log(`홈슬라이드 변경 실패: ${data.message}`);
      }
    },
  });
};

