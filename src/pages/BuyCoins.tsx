import { useNavigate } from "react-router-dom";
import { CoinCard } from "../components/buyCoin/CoinCard";
import { useGetCoinInfo } from "../hooks/useGetAdminCoins";

interface ICoin {
  coinType: string;
  coinQuantity: number;
  expirationPeriod: number;
  price: number;
}

function BuyCoins() {
  const navigate = useNavigate();
  const { data: coinInfoData } = useGetCoinInfo();

  const isBgBlueCoin = (quantity: number, period: number) => {
    return (quantity === 180 && period === 90) || (quantity === 300 && period === 180);
  };

  return (
    <div className="w-full min-h-[calc(100vh-165px)] bg-white-200 overflow-y-auto py-4">
      <div className="w-full h-full flex flex-col gap-6 items-center">
        <div className="w-full flex flex-col gap-4 justify-center items-center">
          {coinInfoData?.result?.map((coin: ICoin) => {
            const isBgBlue = isBgBlueCoin(coin.coinQuantity, coin.expirationPeriod);

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
