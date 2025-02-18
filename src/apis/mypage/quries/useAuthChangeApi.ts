import { AxiosError } from "axios";
import { patchChangePassword } from "../axios/authChangeApi";
import { useMutation } from "@tanstack/react-query";
interface ErrorResponse {
  message: string;
}

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
    { isSuccess: boolean; code: string; message: string }, // result 제거
    AxiosError<ErrorResponse>,
    { password: string; newPassword: string }
  >({
    mutationFn: ({ password, newPassword }) => patchChangePassword({ password, newPassword }),
    onError: (error: AxiosError<ErrorResponse>) => {
      console.error("비밀번호 변경 오류:", error);
      alert(`${error?.response?.data?.message}`); // result 대신 message 사용
    },
    onSuccess: (data: { isSuccess: boolean; code: string; message: string; }) => {
      if (data.isSuccess) {
        alert("비밀번호 변경 성공");
      } else {
        alert(`비밀번호 변경 실패: ${data.message}`);
      }
    },
  });
};

