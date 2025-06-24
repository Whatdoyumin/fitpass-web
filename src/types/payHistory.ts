export type TPayQuery = "ALL" | "COIN";

export type TPayHistory = {
  query: TPayQuery;
  cursor: number;
  size: number;
};

export type TPayHistoryItem = {
  id: number;
  isAgree: boolean;
  coinCount: number;
  price: number;
  createdAt: string;
};
