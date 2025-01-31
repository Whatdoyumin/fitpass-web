import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useAxiosInstance } from "../hooks/useAxiosInstance";

export const useSignin = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const axiosInstance = useAxiosInstance();

  return useMutation({
    mutationFn: async ({ id, password }: { id: string; password: string }) => {
      const response = await axiosInstance.post(`/auth/login`, {
        loginId: id,
        password,
      });

      console.log("로그인 응답:", response.data);
      return response.data;
    },
    mutationKey: ["signin"],
    onSuccess: (data: { result: { accessToken: string; refreshToken: string } }) => {
      console.log("로그인 성공");
      login(data.result.accessToken, data.result.refreshToken);
      navigate("/");
    },
    onError: (error: Error) => {
      console.error("로그인 실패:", error.message);
    },
  });
};
