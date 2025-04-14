import { useMutation, useQuery } from "@tanstack/react-query";
import { IKpnPaymentRequest, IKpnBillingRequest, TPayBillingKeyRequest } from "../types/kpnPayment";
import type { PaymentResponse, IssueBillingKeyResponse } from "@portone/browser-sdk/v2";
import {
  getRegisteredCard,
  postPayBillingKey,
  postPayPlanBillingKey,
  requestKpnBillingKey,
  requestKpnPayment,
} from "../apis/payment/KPNPayment";

const useKpnPayment = () => {
  return useMutation<PaymentResponse, Error, IKpnPaymentRequest>({
    mutationFn: (paymentData) => requestKpnPayment(paymentData),
  });
};

const useKpnBillingKey = () => {
  return useMutation<IssueBillingKeyResponse, Error, IKpnBillingRequest>({
    mutationFn: (billingData) => requestKpnBillingKey(billingData),
  });
};

// 카드 등록 로직
function useGetRegisteredCard() {
  return useQuery({
    queryKey: ["getRegisteredCard"],
    queryFn: () => getRegisteredCard(),
  });
}

// 등록된 카드로 코인 결제하기 로직
function usePostPayBillingKey() {
  return useMutation({
    mutationFn: (data: TPayBillingKeyRequest) => postPayBillingKey(data),
    mutationKey: ["payByBillingKey"],
  });
}

// 등록된 카드로 플랜 결제하기 로직
function usePostPayPlanBillingKey() {
  return useMutation({
    mutationFn: (data: TPayBillingKeyRequest) => postPayPlanBillingKey(data),
    mutationKey: ["payPlanByBillingKey"],
  });
}

export {
  useKpnPayment,
  useKpnBillingKey,
  useGetRegisteredCard,
  usePostPayBillingKey,
  usePostPayPlanBillingKey,
};
