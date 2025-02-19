import { axiosInstance } from "../axios-instance";

const getAdminSubsribe = async () => {
  const { data } = await axiosInstance.get(`/admin/management/plan`);
  return data;
};

export { getAdminSubsribe };
