import * as PortOne from "@portone/browser-sdk/v2";
import type {
  PaymentRequest,
  IssueBillingKeyRequest,
  PaymentResponse,
  IssueBillingKeyResponse,
} from "@portone/browser-sdk/v2";

import {
  IKpnPaymentRequest,
  IKpnBillingRequest,
  TPayBillingKeyRequest,
} from "../../types/kpnPayment";
import { axiosInstance } from "../axios-instance";

const storeId = import.meta.env.VITE_STORE_ID;
const kpnPayChannel = import.meta.env.VITE_KPN_CHANNEL;
const redirectUrl = import.meta.env.VITE_REDIRECT_URL;

// 단건 결제
const requestKpnPayment = async ({
  orderName,
  totalAmount,
  payMethod,
}: IKpnPaymentRequest): Promise<PaymentResponse> => {
  const paymentPayload: PaymentRequest = {
    storeId,
    channelKey: kpnPayChannel,
    paymentId: crypto.randomUUID().replace(/-/g, ""),
    orderName,
    totalAmount,
    currency: "CURRENCY_KRW",
    payMethod,
    redirectUrl,
  };

  const response = await PortOne.requestPayment(paymentPayload);

  if (!response) {
    throw new Error("KPN 결제 요청에 실패했습니다.");
  }

  return response;
};

// 빌링키 발급 (카드 등록)
const requestKpnBillingKey = async ({
  totalAmount,
  customerId,
  fullName,
}: IKpnBillingRequest): Promise<IssueBillingKeyResponse> => {
  const billingPayload: IssueBillingKeyRequest = {
    storeId,
    channelKey: kpnPayChannel,
    billingKeyMethod: "CARD",
    currency: "CURRENCY_KRW",
    issueName: "코인 정기 결제",
    displayAmount: totalAmount || 0,
    redirectUrl,
    customer: {
      customerId,
      fullName,
    },
  };

  const response = await PortOne.requestIssueBillingKey(billingPayload);

  if (!response) {
    throw new Error("빌링키 발급 요청에 실패했습니다.");
  }

  return response;
};

const getRegisteredCard = async () => {
  const { data } = await axiosInstance.get(`/coin/pay/pg/cards`);
  return data;
};

// 등록된 카드로 코인 단건 결제
const postPayBillingKey = async ({ billingKey, orderName, amount }: TPayBillingKeyRequest) => {
  const { data } = await axiosInstance.post("/coin/pay/pg/billing-keys", {
    billingKey,
    orderName,
    amount,
  });

  return data;
};

// 등록된 카드로 정기 결제
const postPayPlanBillingKey = async ({ billingKey, orderName, amount }: TPayBillingKeyRequest) => {
  const { data } = await axiosInstance.post("/plan/pay/pg/billing-keys", {
    billingKey,
    orderName,
    amount,
  });

  return data;
};

export {
  requestKpnBillingKey,
  requestKpnPayment,
  getRegisteredCard,
  postPayBillingKey,
  postPayPlanBillingKey,
};
