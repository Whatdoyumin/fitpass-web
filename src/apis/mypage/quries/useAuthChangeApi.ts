import { AxiosError } from "axios";
import { patchChangePassword, patchChangePhoneNumber } from "../axios/authChangeApi";
import { useMutation } from "@tanstack/react-query";
interface ErrorResponse {
  message: string;
}

export const useChangePhoneNumber = () => {
  return useMutation<
    { isSuccess: boolean; code: string; message: string },
    AxiosError<ErrorResponse>,
    { name: string; password: string; newPhoneNumber: string }
  >({
    mutationFn: ({ name, password, newPhoneNumber }) =>
      patchChangePhoneNumber({ name, password, newPhoneNumber }),
    onError: (error) => {
      console.error("전화번호 변경 오류:", error);
      alert(`${error?.response?.data?.message}`);
    },
    onSuccess: (data: { isSuccess: boolean; code: string; message: string }) => {
      if (data.isSuccess) {
        alert("전화번호 변경 성공");
      } else {
        alert(`${data.message}`);
      }
    },
  });
};

export const useChangePassword = () => {
  return useMutation<
    { isSuccess: boolean; code: string; message: string },
    AxiosError<ErrorResponse>,
    { password: string; newPassword: string }
  >({
    mutationFn: ({ password, newPassword }) => patchChangePassword({ password, newPassword }),
    onError: (error: AxiosError<ErrorResponse>) => {
      console.error("비밀번호 변경 오류:", error);
      alert(`${error?.response?.data?.message}`);
    },
    onSuccess: (data: { isSuccess: boolean; code: string; message: string }) => {
      if (data.isSuccess) {
        alert("비밀번호 변경 성공");
      } else {
        alert(`${data.message}`);
      }
    },
  });
};
