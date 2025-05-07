import { useEffect, useState } from "react";
import { ArrowDown, ArrowUp, KakaoPay, NaverPay } from "../../assets/svg";
import { TPayOption } from "../../types/payment";
import BigDropdown from "./BigDropdown";
import { KpnPaymentButton } from "./kpnPaymentButton";
import { useGetRegisteredCard } from "../../hooks/useKpnPayment";
import { TRegisteredCard } from "../../types/kpnPayment";
import { CARD_KR_NAME_MAP } from "../../constants/cardNames";

interface TSelectPayOptionProps {
  selectedOption: string | null;
  setSelectedOption: React.Dispatch<React.SetStateAction<string | null>>;
  setSelectedCard: React.Dispatch<React.SetStateAction<string | null | undefined>>;
  onPayOptionSelect: (selectedOption: TPayOption | null) => void;
}

const SelectPayOption = ({
  selectedOption,
  setSelectedOption,
  setSelectedCard,
  onPayOptionSelect,
}: TSelectPayOptionProps) => {
  const [isOpen, setIsOpen] = useState(true);
  const [cardData, setCardData] = useState<TRegisteredCard[]>([]);
  const { data, refetch } = useGetRegisteredCard();

  useEffect(() => {
    if (data?.result?.items) {
      setCardData(data.result.items);
    }
  }, [data]);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleButtonClick = (option: TPayOption) => {
    const newSelection = option === selectedOption ? null : option;
    setSelectedOption(newSelection);
    onPayOptionSelect(newSelection);
  };

  const handleCardSelect = (label: string) => {
    const selected = cardData.find((card) => {
      const bankName = CARD_KR_NAME_MAP[card.bank] || card.bank;
      return `${bankName} (${card.number})` === label;
    });
    if (selected) {
      setSelectedCard(selected.billingKey);
    }
  };

  const formattedCardLabels = cardData.map((card) => {
    const bankName = CARD_KR_NAME_MAP[card.bank] || card.bank;
    return `${bankName} (${card.number})`;
  });

  return (
    <div className="w-full min-h-14 bg-white-100 px-[25px] gap-3 border-t-8 border-white-200">
      <div
        className="w-full h-14 py-[26px] flex justify-between items-center cursor-pointer"
        onClick={toggleDropdown}
      >
        <p className="text-16px text-black-700">결제 수단 선택</p>
        {isOpen ? <ArrowUp width={"15px"} /> : <ArrowDown width={"15px"} />}
      </div>

      {isOpen && (
        <>
          <div className="w-full py-[26px] grid grid-cols-2 gap-2 border-t-2 border-white-200">
            <button
              className={`payOptionButton ${
                selectedOption === "registeredCard" ? "selectedPayOption" : "unSelectedPayOption"
              }`}
              onClick={() => handleButtonClick("registeredCard")}
            >
              등록된 카드
            </button>
            <KpnPaymentButton
              selectedOption={selectedOption}
              myOption="creditCard"
              onClick={() => handleButtonClick("creditCard")}
              onRegisterSuccess={refetch}
            />
            <button
              className={`payOptionButton ${
                selectedOption === "naverPay" ? "selectedPayOption" : "unSelectedPayOption"
              }`}
              onClick={() => handleButtonClick("naverPay")}
            >
              <NaverPay width={"56px"} />
            </button>
            <button
              className={`payOptionButton ${
                selectedOption === "kakaoPay" ? "selectedPayOption" : "unSelectedPayOption"
              }`}
              onClick={() => handleButtonClick("kakaoPay")}
            >
              <KakaoPay width={"64px"} />
            </button>
          </div>

          {selectedOption === "registeredCard" && (
            <div className="w-full h-full pb-4">
              {formattedCardLabels.length > 0 ? (
                <BigDropdown options={formattedCardLabels} onOptionSelect={handleCardSelect} />
              ) : (
                <p className="text-center text-sm text-gray-500">등록된 카드가 없습니다.</p>
              )}
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default SelectPayOption;
