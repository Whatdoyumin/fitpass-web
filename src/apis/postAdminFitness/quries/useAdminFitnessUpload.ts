import { useMutation } from "@tanstack/react-query"
import { postAdminFitnessData } from "../axios/postAdminFitnessData"

export const useAdminFitnessUpload = () => {
  return useMutation({
    mutationFn: postAdminFitnessData,
    onSuccess: (data) => {
      console.log(data);
      alert("업로드 성공");
    },
    onError: (error) => {
      console.log(error);
      alert("업로드 실패");
    }
  })
}