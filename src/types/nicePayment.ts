// NICE 페이
// /coin/pay/start 요청
export interface IPaymentStartRequest {
  itemId: string;
  price: number;
}

export interface IPaymentStartResponse {
  result: {
    paymentId: string;
  };
}

// /coin/pay/payment/complete 요청
export interface IPaymentCompleteRequest {
  paymentId: string;
}

export interface IPaymentCompleteResponse {
  result: {
    success: boolean;
    message: string;
  };
}

// /coin/pay/payment/webhook 요청 (헤더 + 바디)
export interface IPaymentWebhookHeaders {
  "webhook-id": string;
  "webhook-timestamp": string;
  "webhook-signature": string;
}

export type IPaymentWebhookBody = string;
