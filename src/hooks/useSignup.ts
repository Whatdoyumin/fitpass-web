import { useMutation } from "@tanstack/react-query";
import { signUp, checkID, TSignUpData, TCheckIDData } from "../apis/signup/signup";
import { useNavigate } from "react-router-dom";

// 회원가입 Mutation
export const useSignUpMutation = () => {
    const navigate = useNavigate();

  return useMutation({
    mutationFn: (data: TSignUpData) => signUp(data),
    mutationKey: ["signup"],
    onSuccess: () => {
        navigate("/signin");
    },
    onError: (error: Error) => {
      console.error("회원가입 실패:", error.message);
    },
  });
};

// 아이디 중복 확인 Mutation
export const useCheckIDMutation = () => {
    return useMutation({
        mutationFn: (data: TCheckIDData) => checkID(data),
        mutationKey: ["checkID"],
        onError: (error: Error) => {
        console.error("아이디 중복 확인 실패:", error.message);
        },
    });
};
