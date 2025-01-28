import axios from "axios";
import config from "./config";

const accessToken = localStorage.getItem("accessToken");

const axiosInstance = axios.create({
  headers: {
    Authorization: `Bearer ${accessToken}`,
  },
  baseURL: config.apiBaseUrl,
});

export { axiosInstance };
