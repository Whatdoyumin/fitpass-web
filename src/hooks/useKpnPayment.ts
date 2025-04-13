import { useMutation, useQuery } from "@tanstack/react-query";
import { IKpnPaymentRequest, IKpnBillingRequest } from "../types/kpnPayment";
import type { PaymentResponse, IssueBillingKeyResponse } from "@portone/browser-sdk/v2";
import {
  getRegisteredCard,
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

function useGetRegisteredCard() {
  return useQuery({
    queryKey: ["getRegisteredCard"],
    queryFn: () => getRegisteredCard(),
  });
}

export { useKpnPayment, useKpnBillingKey, useGetRegisteredCard };
