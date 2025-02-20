import axios from "axios"
import config from "../apis/config"
import { axiosInstance } from "../apis/axios-instance";
import { useAuth } from "../context/AuthContext";
import { useQuery } from "@tanstack/react-query";

const fetchNoLoginRecommend = async () => {
  const response = await axios.get(`${config.apiBaseUrl}/fitness/recommend`);
  return response.data.result;
}

const fetchLoginRecommend = async () => {
  const response = await axiosInstance.get("/fitness/recommend");
  return response.data.result;
}

export const useFetchRecommendFitness = () => {
  const { isLogin } = useAuth();

  return useQuery({
    queryKey: ["fitnessCenter", isLogin],
    queryFn: isLogin ? fetchLoginRecommend : fetchNoLoginRecommend,
  })
};

const fetchHomeSlide =  async () => {
  const response = await axios.get(`${config.apiBaseUrl}/notice/homeSlide`);
  return response.data.result;
}

export const useFetchHomeSlide = () => {
  return useQuery({
    queryKey: ['homeSlide'],
    queryFn: fetchHomeSlide,
  })
}