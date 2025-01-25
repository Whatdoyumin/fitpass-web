import axios from "axios";

const accessToken = localStorage.getItem("accessToken");

const axiosInstance = axios.create({
  headers: {
    Authorization: `Bearer ${accessToken}`,
  },
  baseURL: import.meta.env.VITE_API_BASE_URL,
});

export { axiosInstance };
