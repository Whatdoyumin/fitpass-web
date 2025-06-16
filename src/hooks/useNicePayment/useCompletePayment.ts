import { useMutation } from "@tanstack/react-query";
import { requestNicePaymentComplete } from "../../apis/payment/NICEPayment";
import { IPaymentCompleteRequest, IPaymentCompleteResponse } from "../../types/nicePayment";

export const useCompleteNicePayment = () => {
  return useMutation<IPaymentCompleteResponse, Error, IPaymentCompleteRequest>({
    mutationFn: requestNicePaymentComplete,
  });
};
