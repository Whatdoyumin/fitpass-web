import { useMutation } from "@tanstack/react-query";
import { TKakaoPayBody, TPayCoinSuccess } from "../types/buyCoin";
import { postPayPlanSuccess, postSubscibe } from "../apis/subscibe";

function usePostPlan() {
  return useMutation({
    mutationFn: (data: TKakaoPayBody) => postSubscibe(data),
    mutationKey: ["payCoin"],
  });
}

function usePostPlanSuccess() {
  return useMutation({
    mutationFn: (data: TPayCoinSuccess) => postPayPlanSuccess(data),
    mutationKey: ["payCoinSuccess"],
  });
}

export { usePostPlan, usePostPlanSuccess };
