import { AxiosError } from "axios";
import { patchChangePassword } from "../axios/authChangeApi";
import { useMutation } from "@tanstack/react-query";
import { ErrorResponse } from "react-router-dom";

// export const useChangePhoneNumber = () => {
//   return useMutation<
//     { isSuccess: boolean; code: string; message: string; result: {} },
//     AxiosError,
//     { name: string; password: string; newPhoneNumber: string }
//   >({
//     mutationFn: ({ name, password, newPhoneNumber }) =>
//       postChangePhoneNumber({ name, password, newPhoneNumber }),
//     onError: (error: AxiosError) => {
//       console.error("📌 전화번호 변경 오류:", error);
//     },
//   });
// };

export const useChangePassword = () => {
  return useMutation<
    { isSuccess: boolean; code: string; message: string; result: string }, // 수정된 응답 타입
    AxiosError<ErrorResponse>, // 에러 타입
    { password: string; newPassword: string } // 요청 타입
  >({
    mutationFn: ({ password, newPassword }) => patchChangePassword({ password, newPassword }),
    onError: (error: AxiosError) => {
      console.error("📌 비밀번호 변경 오류:", error);
      alert(`비밀번호 변경 오류: ${JSON.stringify(error?.response?.data, null, 2)}`);
    },
    onSuccess: (data) => {
      if (data.isSuccess) {
        alert("비밀번호 변경 성공!");
      } else {
        alert(`비밀번호 변경 실패: ${data.message}`);
      }
    },
  });
};
