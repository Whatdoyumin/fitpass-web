import { useMutation } from "@tanstack/react-query";
import { TPayCoinBody, TPayCoinSuccess } from "../type/buyCoin";
import { postPayCoin, postPayCoinSuccess } from "../apis/buyCoin";

function usePostPayCoin() {
  return useMutation({
    mutationFn: (data: TPayCoinBody) => postPayCoin(data),
    mutationKey: ["payCoin"],
  });
}

function usePostPayCoinSuccess() {
  return useMutation({
    mutationFn: (data: TPayCoinSuccess) => postPayCoinSuccess(data),
    mutationKey: ["payCoinSuccess"],
  });
}

export { usePostPayCoin, usePostPayCoinSuccess };
