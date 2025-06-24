export type TPayHistoryType = "코인" | "패스";

export type TAdminPayHistory = {
  memberName?: string | null;
  type: TPayHistoryType;
  size?: number;
  page?: number;
};

export type TAdminPayHistoryResponse = {
  id: number;
  memberName?: string;
  account: string;
  phoneNumber: string;
  createdAt: string;
  planType?: string;
  price?: number;
  fitnessName?: string;
  coinCount?: number;
  activeTime?: string | null;
};
