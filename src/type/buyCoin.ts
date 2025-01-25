export type TPayCoinBody = {
  itemName: string;
  quantity: number;
  totalAmount: number;
  methodName: string;
};

export type TPayCoinSuccess = {
  pgToken: string;
};
