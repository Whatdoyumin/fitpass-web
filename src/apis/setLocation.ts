import { TLocationBody } from "../types/setLocation";
import { axiosInstance } from "./axios-instance";

const patchLocation = async ({ latitude, longitude }: TLocationBody) => {
  const { data } = await axiosInstance.patch("/auth/member/location", {
    latitude: latitude,
    longitude: longitude,
  });
  return data;
};

export { patchLocation };
