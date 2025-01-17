import { useNavigate } from "react-router-dom";
import { CoinCard } from "../components/buyCoin/CoinCard";
import { COIN_PRICE } from "../constants/price-menu";

function BuyCoins() {
  const navigate = useNavigate();

  return (
    <div className="w-full h-full bg-white-200 overflow-y-auto py-4">
      <div className="w-full h-full flex flex-col gap-6 items-center">
        <div className="w-full h-full flex flex-col gap-4 justify-center items-center">
          {COIN_PRICE.map((item) => (
            <CoinCard
              key={item.id}
              coinAmount={item.coinAmount}
              coinPrice={item.price}
              coinExp={item.coinExp}
              isBgBlue={item.isBgBlue}
            />
          ))}
        </div>
        <button className="w-[340px] blueButton py-3" onClick={() => navigate("payment")}>
          코인 구매하기
        </button>
      </div>
    </div>
  );
}

export default BuyCoins;
