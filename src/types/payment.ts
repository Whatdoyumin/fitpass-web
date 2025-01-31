export type TPayOption = "registeredCard" | "creditCard" | "kakaoPay" | "naverPay";

export type TPaymentProps = {
  type: "subscribe" | "buy-coins";
};
