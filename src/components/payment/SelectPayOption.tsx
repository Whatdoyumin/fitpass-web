import { useState } from "react";
import { ArrowDown, ArrowUp, KakaoPay, NaverPay } from "../../assets/svg";
import { TPayOption } from "../../type/payment";
import BigDropdown from "./BigDropdown";

interface TSelectPayOptionProps {
  selectedOption: string | null;
  setSelectedOption: React.Dispatch<React.SetStateAction<string | null>>;
  onPayOptionSelect: (selectedOption: TPayOption | null) => void;
}

const SelectPayOption = ({
  selectedOption,
  setSelectedOption,
  onPayOptionSelect,
}: TSelectPayOptionProps) => {
  const [isOpen, setIsOpen] = useState(true);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleButtonClick = (option: TPayOption) => {
    const newSelection = option === selectedOption ? null : option;
    setSelectedOption(newSelection);
    onPayOptionSelect(newSelection);
  };

  return (
    <div className="w-full min-h-14 bg-white-100 px-[25px] gap-3 border-t-8 border-white-200">
      {/* 접히기 제어 상단 부분 */}
      <div
        className="w-full h-14 py-[26px] flex justify-between items-center cursor-pointer"
        onClick={toggleDropdown}
      >
        <p className="text-16px text-black-700">결제 수단 선택</p>
        {isOpen ? <ArrowUp width={"15px"} /> : <ArrowDown width={"15px"} />}
      </div>

      {/* 결제 옵션 */}
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
            <button
              className={`payOptionButton ${
                selectedOption === "creditCard" ? "selectedPayOption" : "unSelectedPayOption"
              }`}
              onClick={() => handleButtonClick("creditCard")}
            >
              신용/체크카드 등록
            </button>
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
          {/* 등록된 카드 목록 표시 */}
          {selectedOption === "registeredCard" && (
            <div className="w-full h-full pb-4">
              <BigDropdown options={RegisteredCardList} onOptionSelect={() => ""} />
            </div>
          )}
        </>
      )}
    </div>
  );
};

const RegisteredCardList = ["우리은행 가나다라카드(123*)", "국민은행 나라사랑카드(456*)"];

export default SelectPayOption;
