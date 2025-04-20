import { axiosInstance } from "../axios-instance";

  export const getAdminOwnerUsers = async (
    page: number = 0,
    size: number = 10,
    searchType: string="",
    keyword: string=""
  ) => {
    try {
      const response = await axiosInstance.get("/admin/owner/info", {
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
  