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

const deleteAdminFitness = async (fitnessId: number) => {
  const { data } = await axiosInstance.delete(`/admin/fitness/${fitnessId}`);
  return data;
};

const changeAdminFitnessStatus = async (fitnessId: number) => {
  const { data } = await axiosInstance.patch(`/admin/fitness/${fitnessId}`);
  return data;
};

export { getAdminFitnessData, putAdminFitness, deleteAdminFitness, changeAdminFitnessStatus };
