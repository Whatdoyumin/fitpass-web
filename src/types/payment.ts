export type TPayOption = "registeredCard" | "creditCard" | "kakaoPay" | "naverPay";

export type TPaymentProps = {
  type: "subscribe" | "buy-coins";
};

export type TCoinBody = {
  id: number;
  coinAmount: number;
  price: number;
  coinExp: number;
  isBgBlue: boolean;
};

export type TSubscribe = {
  planType: string;
  price: number;
  coinQuantity: number;
  coinAddition: number;
  expirationPeriod: number;
};

export type TSubscribeBody = {
  id: number;
  option_ko: string;
  option_en: string;
  coinAmount: number;
  extroCoinAmount: number | null;
  totalCoinAmount: number;
  price: number;
  recommendTarget: string;
  benefit: string;
  comment: string;
};

export type TChangeSub = {
  planName: string;
};
