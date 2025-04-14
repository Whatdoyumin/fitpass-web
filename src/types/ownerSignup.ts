export interface TOwnerSignUpData {
    name: string;
    id: string;
    password: string;
    phoneNumber: string;
    agreements: {
      terms: boolean;
      privacy: boolean;
      thirdParty: boolean;
      marketing: boolean;
    };
    agree: boolean;
    corporation: string;
    businessRegistrationNumber: string;
    bankName: string;
    depositAccountName: string;
    depositAccountNumber: string;
    businessRegistrationUrl: string;
    bankCopyUrl: string;
  }