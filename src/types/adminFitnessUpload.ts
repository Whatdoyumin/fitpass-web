export interface IAdminFitnessUpload {
  totalFee: number | string;
  detailAddress: string;
  loginId: string;
  fee: number | string;
  latitude: number;
  time: {
    [key: string]: string;
  };
  longitude: number;
  fitnessName: string;
  isPurchasable: boolean;
  address: string;
  phoneNumber: string;
  notice: string;
  howToUse: string;
  categoryList: string[];
  purchasable: boolean;
}
