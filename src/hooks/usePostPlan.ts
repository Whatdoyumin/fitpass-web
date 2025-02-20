import { useMutation } from "@tanstack/react-query";
import { TKakaoPayBody, TPayCoinSuccess } from "../types/buyCoin";
import {
  postPayPlanSuccess,
  postPlanChange,
  postPlanSidStatus,
  postSubscibe,
} from "../apis/subscribe";
import { TChangeSub } from "../types/payment";

function usePostPlan() {
  return useMutation({
    mutationFn: (data: TKakaoPayBody) => postSubscibe(data),
    mutationKey: ["payPlan"],
  });
}

function usePostPlanSuccess() {
  return useMutation({
    mutationFn: (data: TPayCoinSuccess) => postPayPlanSuccess(data),
    mutationKey: ["payPlanSuccess"],
  });
}

function usePostPlanSidStatus() {
  return useMutation({
    mutationFn: () => postPlanSidStatus(),
    mutationKey: ["payPlanSidStatus"],
  });
}

function usePostChangeSub() {
  return useMutation({
    mutationFn: (body: TChangeSub) => postPlanChange(body),
    mutationKey: ["payPlanChange"],
  });
}

export { usePostPlan, usePostPlanSuccess, usePostPlanSidStatus, usePostChangeSub };
