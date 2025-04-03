import { useNavigate } from "react-router-dom";
import { CoinCard } from "../components/buyCoin/CoinCard";
import { COIN_PRICE } from "../constants/price-menu";
import { useGetCoinInfo } from "../hooks/useGetAdminCoins";

interface ICoin {
  coinType: string;
  coinQuantity: number;
  expirationPeriod: number;
  price: number;
}

function BuyCoins() {
  const navigate = useNavigate();
  const { data } = useGetCoinInfo();

  return (
    <div className="w-full h-[calc(100vh-165px)] bg-white-200 overflow-y-auto py-4">
      <div className="w-full h-full flex flex-col gap-6 items-center">
        <div className="w-full h-full flex flex-col gap-4 justify-center items-center">
          {data?.result?.map((coin: ICoin) => {
            const matchedCoin = COIN_PRICE.find((item) => item.coinAmount === coin.coinQuantity);
            const isBgBlue = matchedCoin?.isBgBlue ?? false;

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
