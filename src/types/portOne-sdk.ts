export interface IPortOneRequestPaymentParams {
  storeId: string;
  channelKey: string;
  paymentId: string;
  orderName: string;
  totalAmount: number;
  currency: "KRW";
  payMethod: "CARD" | "VIRTUAL_ACCOUNT" | "TRANSFER" | "MOBILE" | "EASY_PAY";
}
