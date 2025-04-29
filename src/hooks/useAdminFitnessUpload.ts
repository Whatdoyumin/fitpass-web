import { useMutation } from "@tanstack/react-query";
import { postAdminFitnessData } from "../apis/postAdminFitness/postAdminFitnessData";

export const useAdminFitnessUpload = () => {
  return useMutation({
    mutationFn: postAdminFitnessData,
  });
};
