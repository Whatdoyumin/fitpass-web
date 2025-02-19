export type TAdminCoinName =
  | "1코인"
  | "5코인"
  | "10코인"
  | "20코인"
  | "30코인"
  | "100코인"
  | "300코인";

export type TAdminCoins = {
  name: TAdminCoinName;
  price: number;
  coinQuantity: number;
  coinAddition: number;
  expirationPeriod: string;
};
