import { TAdminCoins } from "../../types/adminCoint";
import { axiosInstance } from "../axios-instance";

const getAdminCoins = async () => {
  const { data } = await axiosInstance.get(`/admin/management/coin`);
  return data;
};

const putAdminCoins = async (coins: TAdminCoins[]) => {
  const { data } = await axiosInstance.put(`/admin/management/coin`, coins);
  return data;
};

export { getAdminCoins, putAdminCoins };
