import { useMutation, useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";
import {
  getAdminDraftNotice,
  getNoticeDetail,
  postAdminDraftNotice,
  postAdminNotice,
  putAdminNotice,
} from "../axios/adminNoticeUploadApi";

// 공통 타입
export type SlideType = {
  memberSlide: boolean;
  ownerSlide: boolean;
};

export type NoticeForm = {
  title: string;
  content: string;
  type: "ANNOUNCEMENT" | "EVENT";
  image: File | string | undefined;
};

export type FullNoticeForm = NoticeForm & SlideType;
export type FullEditNoticeForm = FullNoticeForm & { id: number };

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

// 임시저장 목록 불러오기
export const useGetAdminNotice = () => {
  return useQuery<DraftNoticeResponse, AxiosError>({
    queryKey: ["adminDraftNotices"],
    queryFn: getAdminDraftNotice,
  });
};

// 공지사항 글 작성
export const usePostAdminNotice = () => {
  return useMutation<void, AxiosError<ErrorResponse>, FullNoticeForm>({
    mutationFn: postAdminNotice,
    onError: (error) => {
      console.error("게시 실패: ", error.response?.data?.message);
      alert(`${error.response?.data?.message}`);
    },
  });
};

// 공지사항 글 수정
export const usePatchAdminNotice = () => {
  return useMutation<void, AxiosError<ErrorResponse>, FullEditNoticeForm>({
    mutationFn: putAdminNotice,
    onError: (error) => {
      if (error.code === "ERR_NETWORK") {
        alert("이미지 파일이 너무 큽니다. 더 작은 파일을 업로드해 주세요.");
      } else if (error.code === "ERR_BAD_RESPONSE") {
        alert("제목 또는 내용이 너무 깁니다.");
      } else {
        console.error(error);
      }
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
    } & NoticeForm
  >({
    mutationFn: postAdminDraftNotice,
    onError: (error) => {
      if (error.code === "ERR_NETWORK") {
        alert("이미지 파일이 너무 큽니다. 더 작은 파일을 업로드해 주세요.");
      } else if (error.code === "ERR_BAD_RESPONSE") {
        alert("제목 또는 내용이 너무 깁니다.");
      } else {
        console.error(error);
      }
    },
  });
};

// 공지사항 상세 조회
export const useGetNoticeDetail = (noticeId: number | undefined) => {
  return useQuery<NoticeDetailResponse, AxiosError>({
    queryKey: ["NoticeDetail", noticeId],
    queryFn: () => getNoticeDetail(noticeId),
  });
};
