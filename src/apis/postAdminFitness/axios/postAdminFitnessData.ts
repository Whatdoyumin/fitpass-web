import { axiosInstance } from "../../axios-instance"
import config from "../../config"

export const postAdminFitnessData = async ( formData: FormData ) => {
  const response = await axiosInstance.post(`${config.apiBaseUrl}/admin/fitness/createFitness`, formData, {
    headers: {
      "Content-Type" : "multipart/form-data",
    },
  });

  return response.data;
}