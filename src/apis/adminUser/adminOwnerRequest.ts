import { axiosInstance } from "../axios-instance";

export const patchAdminOwnerRequest = async (loginId: string, isApproval: boolean) => {
    try {
      const response = await axiosInstance.patch("/admin/owner/approval", null, {
        params: {
          loginId,
          isApproval,
        },
      });
  
      if (response.data.isSuccess) {
        return response.data.result;
      }
      throw new Error(response.data.message);
    } catch (error) {
      console.error("승인/반려 요청 실패:", error);
      throw error;
    }
  };
  