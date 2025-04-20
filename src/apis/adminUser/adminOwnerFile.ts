import { axiosInstance } from "../axios-instance";

export const getOwnerFile = async (loginId: string, name: "businessRegistrationUrl" | "bankCopyUrl") => {
  const response = await axiosInstance.get("/admin/owner/file", {
    params: {
      loginId,
      name,
    },
  });

  if (response.data.isSuccess) {
    return response.data.result.url;
  }

  throw new Error(response.data.message);
};
