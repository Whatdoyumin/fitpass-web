export type TPayQuery = "ALL" | "PLAN" | "COIN";

export type TPayHistory = {
  query: TPayQuery;
  cursor: number;
  size: number;
};

export type TPayHistoryItem = {
  id: number;
  planType: "NONE" | "BASIC" | "PRO" | "STANDARD";
  isAgree: boolean;
  coinCount: number;
  price: number;
  createdAt: string;
};
