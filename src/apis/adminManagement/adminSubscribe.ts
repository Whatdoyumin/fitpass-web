import { TAdminSubsribe } from "../../types/adminSubsribe";
import { axiosInstance } from "../axios-instance";

const getAdminSubsribe = async () => {
  const { data } = await axiosInstance.get(`/admin/management/plan`);
  return data;
};

const putAdminSubsribe = async (subscriptions: TAdminSubsribe[]) => {
  const { data } = await axiosInstance.put(`/admin/management/plan`, subscriptions);
  return data;
};

export { getAdminSubsribe, putAdminSubsribe };
