import { axiosInstance } from "../axios-instance";

const getAdminFitnessData = async (fitnessId: number) => {
  const { data } = await axiosInstance.get(`/admin/fitness/${fitnessId}`);
  return data;
};

const putAdminFitness = async (fitnessId: number, formData: FormData) => {
  const { data } = await axiosInstance.put(`admin/fitness/${fitnessId}`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  return data;
};

export { getAdminFitnessData, putAdminFitness };
