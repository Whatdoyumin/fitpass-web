import { useQuery } from "@tanstack/react-query";
import { AxiosError } from 'axios';
import { getAdminNotice } from '../axios/adminNoticeAPI';
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

export const useGetAdminNotice = (keyword: string | null, page: number = 1, size: number = 10) => {
  return useQuery<NoticesResponse, AxiosError>({
    queryKey: ["notices", keyword, page, size], 
    queryFn: () => getAdminNotice(keyword, page, size),
  });
};