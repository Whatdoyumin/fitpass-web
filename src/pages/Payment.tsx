import { useState } from "react";
import BigDropdown from "../components/payment/BigDropdown";
import PaymentDetails from "../components/payment/PaymentDetails";
import SelectPayOption from "../components/payment/SelectPayOption";
import { COIN_PRICE } from "../constants/price-menu";
import { TPayOption } from "../type/payment";
import PaymentInfo from "../components/payment/PaymentInfo";

interface IPaymentProps {
  type: "subscribe" | "buy-coins";
}

function Payment({ type }: IPaymentProps) {
  const [selectedCoin, setSelectedCoin] = useState(COIN_PRICE[0]);
  const [selectedPayOption, setSelectedPayOption] = useState<string | null>(null);

  const handleCoinChange = (coinId: number) => {
    const coin = COIN_PRICE.find((item) => item.id === coinId);
    if (coin) setSelectedCoin(coin);
  };

  const handlePayOptionChange = (option: TPayOption | null) => {
    setSelectedPayOption(option);
  };

  const coinOptions =
    type === "buy-coins" ? COIN_PRICE.map((item) => `${item.coinAmount}코인`) : [];

  return (
    <div className="w-full h-full bg-white-200 overflow-y-auto">
      <div className="w-full bg-white-100 flex flex-col px-[25px] py-[26px] gap-3">
        <p className="text-16px">요금제 선택</p>
        <BigDropdown
          options={coinOptions}
          onOptionSelect={(option) => {
            const selectedId = COIN_PRICE.find((item) => `${item.coinAmount}코인` === option)?.id;
            if (selectedId) handleCoinChange(selectedId);
          }}
        />
      </div>
      <SelectPayOption
        selectedOption={selectedPayOption}
        setSelectedOption={setSelectedPayOption}
        onPayOptionSelect={handlePayOptionChange}
      />
      <PaymentDetails coinInfo={selectedCoin} paymentMethod={selectedPayOption} />
      <PaymentInfo />
    </div>
  );
}

export default Payment;
