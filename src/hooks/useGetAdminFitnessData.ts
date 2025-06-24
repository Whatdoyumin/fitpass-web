import { useMutation, useQuery } from "@tanstack/react-query";
import { getAdminFitnessData, putAdminFitness } from "../apis/adminFitness/adminFitnessData";

interface PutFitnessPayload {
  fitnessId: number;
  data: FormData;
}

const useGetAdminFitnessData = (fitnessId: number, options?: { enabled?: boolean }) => {
  return useQuery({
    queryKey: ["adminFitnessData", fitnessId],
    queryFn: () => getAdminFitnessData(fitnessId),
    enabled: options?.enabled ?? true,
  });
};

function usePutAdminFitnessData() {
  return useMutation({
    mutationFn: ({ fitnessId, data }: PutFitnessPayload) => putAdminFitness(fitnessId, data),
    mutationKey: ["editFitnessByAdmin"],
  });
}

export { useGetAdminFitnessData, usePutAdminFitnessData };
