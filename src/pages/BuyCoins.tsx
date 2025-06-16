import { useNavigate } from "react-router-dom";
import { CoinCard } from "../components/buyCoin/CoinCard";
import { useGetCoinInfo } from "../hooks/useGetAdminCoins";
import { ICoin } from "../types/payment";
import { useCoinStore } from "../store/coinStore";
import { useEffect } from "react";

function BuyCoins() {
  const navigate = useNavigate();
  const { data: coinInfoData } = useGetCoinInfo();
  const setCoinInfo = useCoinStore((state) => state.setCoinInfo);

  useEffect(() => {
    if (coinInfoData?.result) {
      setCoinInfo(coinInfoData.result);
    }
  }, [coinInfoData, setCoinInfo]);

  return (
    <div className="w-full min-h-[calc(100vh-165px)] bg-white-200 overflow-y-auto py-4">
      <div className="w-full h-full flex flex-col gap-6 items-center">
        <div className="w-full flex flex-col gap-4 justify-center items-center">
          {coinInfoData?.result?.map((coin: ICoin, index: number) => {
            const totalCoins = coinInfoData.result.length;
            const isBgBlue = index >= totalCoins - 2;

            return (
              <CoinCard
                key={coin.coinType}
                coinAmount={coin.coinQuantity}
                coinPrice={coin.price}
                coinExp={coin.expirationPeriod}
                isBgBlue={isBgBlue}
              />
            );
          })}
        </div>
        <button className="w-[340px] blueButton py-3 mb-10" onClick={() => navigate("payment")}>
          코인 구매하기
        </button>
      </div>
    </div>
  );
}

export default BuyCoins;
