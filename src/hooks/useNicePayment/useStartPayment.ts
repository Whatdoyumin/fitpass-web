import { useMutation } from "@tanstack/react-query";
import { requestNicePaymentStart } from "../../apis/payment/NICEPayment";
import { IPaymentStartRequest, IPaymentStartResponse } from "../../types/nicePayment";

export const useStartNicePayment = () => {
  return useMutation<IPaymentStartResponse, Error, IPaymentStartRequest>({
    mutationFn: requestNicePaymentStart,
  });
};
