import { useMutation } from "@tanstack/react-query";
import { postAdminFitnessData } from "../axios/postAdminFitnessData";

export const useAdminFitnessUpload = () => {
  return useMutation({
    mutationFn: postAdminFitnessData,
    onSuccess: () => {
      alert("업로드 성공");
    },
    onError: () => {
      alert("업로드 실패");
    },
  });
};
