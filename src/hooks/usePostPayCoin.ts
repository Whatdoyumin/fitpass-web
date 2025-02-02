import { useMutation } from "@tanstack/react-query";
import { TKakaoPayBody, TPayCoinSuccess } from "../types/buyCoin";
import { postPayCoin, postPayCoinSuccess } from "../apis/buyCoin";

function usePostPayCoin() {
  return useMutation({
    mutationFn: (data: TKakaoPayBody) => postPayCoin(data),
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
