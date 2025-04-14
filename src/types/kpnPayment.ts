export interface IKpnPaymentRequest {
  orderName: string;
  totalAmount: number;
  payMethod: "CARD" | "TRANSFER" | "VIRTUAL_ACCOUNT" | "MOBILE" | "EASY_PAY";
}

export interface IKpnBillingRequest {
  orderName?: string;
  totalAmount?: number;
  customerId: string;
  fullName?: string;
}

export type TRegisteredCard = {
  billingKey: string;
  bank: string;
  type: string;
  number: string;
};

export type TPayBillingKeyRequest = {
  billingKey: string;
  orderName: string;
  amount: number;
};
