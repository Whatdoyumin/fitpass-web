import { useEffect, useState } from "react";
import BigDropdown from "../components/payment/BigDropdown";
import PaymentDetails from "../components/payment/PaymentDetails";
import SelectPayOption from "../components/payment/SelectPayOption";
import { ICoin, TPaymentProps, TPayOption } from "../types/payment";
import PaymentInfo from "../components/payment/PaymentInfo";
import PaymentButton from "../components/payment/PaymentButton";
import { useCoinStore } from "../store/coinStore";

function Payment({ type }: TPaymentProps) {
  const [selectItem, setSelectItem] = useState<ICoin | null>(null);
  const [selectedPayOption, setSelectedPayOption] = useState<string | null>(null);
  const [isChecked, setIsChecked] = useState(false);

  const coinInfo = useCoinStore((state) => state.coinInfo);

  // coinInfo 받아오면 초기값 설정
  useEffect(() => {
    if (coinInfo.length) {
      const first = coinInfo[0];
      setSelectItem({
        coinType: first.coinType,
        name: first.name,
        price: first.price,
        coinQuantity: first.coinQuantity,
        coinAddition: first.coinAddition,
        expirationPeriod: first.expirationPeriod,
      });
    }
  }, [coinInfo]);

  const handlePayOptionChange = (option: TPayOption | null) => {
    setSelectedPayOption(option);
  };

  const dropdownOptions = coinInfo?.map((item: ICoin) => `${item.name}`);

  return (
    <div className="w-full h-full bg-white-200 overflow-y-auto flex flex-col justify-between">
      <div>
        <div className="w-full h-[140px] bg-white-100 flex flex-col px-[25px] py-[26px] gap-3">
          <p className="text-16px">{type === "buy-coins" ? "코인 요금제 선택" : "플랜 선택"}</p>
          <BigDropdown
            options={dropdownOptions}
            onOptionSelect={(option) => {
              const selectedItem = coinInfo?.find((item) => `${item.name}` === option);
              if (selectedItem) {
                setSelectItem(selectedItem);
              }
            }}
          />
        </div>
        <SelectPayOption
          selectedOption={selectedPayOption}
          setSelectedOption={setSelectedPayOption}
          onPayOptionSelect={handlePayOptionChange}
        />
        {selectItem && (
          <PaymentDetails type={type} item={selectItem} paymentMethod={selectedPayOption} />
        )}
        <PaymentInfo isChecked={isChecked} setIsChecked={setIsChecked} />
      </div>

      <PaymentButton
        selectedPayOption={selectedPayOption}
        isChecked={isChecked}
        selectItem={selectItem as ICoin}
      />
    </div>
  );
}

export default Payment;
