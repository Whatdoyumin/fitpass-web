import { useMutation } from "@tanstack/react-query";
import { axiosInstance } from "../apis/axios-instance"
import { useNavigate } from "react-router-dom";

type postRequestBody = {
  fitnessId: number,
  agree: boolean
}

interface CustomError {
  code: string,
  message: string,
}

const postPass = async (data: postRequestBody) => {
  const response = await axiosInstance.post("/fitness/pass", data);
  return response.data;
}

export const usePostPass = (navigate: ReturnType<typeof useNavigate>) => {
  return useMutation({
    mutationFn: postPass,
    onSuccess: (data, variables) => {
      console.log("결제 성공", data);

      const id = variables.fitnessId;
      navigate(`/purchase-pass/${id}/done`);
    },
    onError: (error: CustomError) => {
      console.log("패스 구매 실패: ", error);
      if (isCustomError(error)) {
        console.log(error.code)
        if (error.code === "ERR_BAD_REQUEST") {
          alert("이미 구매한 패스가 존재합니다.");
        } else {
          alert(`결제에 실패했습니다. (${error.message})`);
        }
      } else {
        alert("결제 중 알 수 없는 오류가 발생했습니다.");
      }
    }
  });
};

// 타입 가드 함수
function isCustomError(error: unknown): error is CustomError {
  return typeof error === "object" && error !== null && "code" in error && "message" in error;
}