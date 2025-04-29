import { useMutation } from "@tanstack/react-query";
import { postAdminFitnessData } from "../apis/adminFitness/postAdminFitnessData";

export const useAdminFitnessUpload = () => {
  return useMutation({
    mutationFn: postAdminFitnessData,
  });
};
