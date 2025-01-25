import { TLocationBody } from "../type/setLocation";
import { axiosInstance } from "./axios-instance";

const patchLocation = async ({ latitude, longitude }: TLocationBody) => {
  const { data } = await axiosInstance.patch("/auth/location", {
    latitude: latitude,
    longitude: longitude,
  });
  return data;
};

export { patchLocation };
