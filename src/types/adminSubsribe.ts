export type TAdminPlanType = "BASIC" | "STANDARD" | "PRO";

export type TAdminSubsribe = {
  planType: TAdminPlanType;
  price: string;
  coinQuantity: string;
  coinAddition: string;
  expirationPeriod: string;
};
