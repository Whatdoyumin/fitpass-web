export type TFacilities = {
  id: number;
  img: string;
  name: string;
  address: string;
};

export type TFacilitiesRegister = {
  totalFee: number;
  detailAddress: string;
  fee: number;
  latitude: number;
  longitude: number;
  fitnessName: string;
  isPurchasable: boolean;
  address: string;
  phoneNumber: string;
  notice: string;
  howToUse: string;
  categoryList: string[];
  purchasable: boolean;
  time: {
    [key: string]: string;
  };
};

export type TFacilitiesRegisterForm = {
  formData: TFacilitiesRegister;
  mainImage: File | null;
  additionalImages: File[];
};

export interface IFacilitiesRegisterState {
  formState: TFacilitiesRegisterForm;
  setFormState: React.Dispatch<React.SetStateAction<TFacilitiesRegisterForm>>;
}
