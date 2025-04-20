import { axiosInstance } from "../axios-instance";

export type UsersParams = {
    page?: number;
    size?: number;
    searchType?: string;
    keyword?: string;
  };
  
  export const getAdminUsers = async (
    page: number = 0,
    size: number = 10,
    searchType: string="",
    keyword: string=""
  ) => {
    try {
      const response = await axiosInstance.get("/admin/members", {
        params: {
          page,
          size,
          searchType,
          keyword,
        },
      });
  
      if (response.data.isSuccess) {
        return {
          content: response.data.result,
        };
      }
      throw new Error(response.data.message);
    } catch (error) {
      console.error("Failed to fetch users:", error);
      throw error;
    }
  };
  