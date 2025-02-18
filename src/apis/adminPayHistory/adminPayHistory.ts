import { TAdminPayHistory } from "../../types/adminPayHistory";
import { axiosInstance } from "../axios-instance";

const getAdminPayHistory = async ({ memberName, type, size, page }: TAdminPayHistory) => {
  const { data } = await axiosInstance.get(`/admin/payment/history`, {
    params: { memberName, type, size, page },
  });
  return data;
};

export { getAdminPayHistory };
