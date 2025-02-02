import { useMutation } from "@tanstack/react-query";
import { axiosInstance } from "../apis/axios-instance"
import { useNavigate } from "react-router-dom";

type postRequestBody = {
  fitnessId: number,
  agree: boolean
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
      // navigate(`/purchase-pass/${data.result.memberFitnessId}/done`);
    },
    onError: (error) => {
      console.log("패스 구매 실패: ", error);
      alert("결제에 실패했습니다.");
    }
  });
};

// 내가 구매한 패스 get to it 피트니스 memberfitnessid === 49