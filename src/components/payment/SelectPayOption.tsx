import { useState } from "react";
import { ArrowDown, ArrowUp } from "../../assets/svg";
import { TPayOption } from "../../types/payment";

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
      <div
        className="w-full h-14 py-[26px] flex justify-between items-center cursor-pointer"
        onClick={toggleDropdown}
      >
        <p className="text-16px text-black-700">결제 수단 선택</p>
        {isOpen ? <ArrowUp width={"15px"} /> : <ArrowDown width={"15px"} />}
      </div>

      {isOpen && (
        <div className="w-full py-[26px] border-t-2 border-white-200">
          <button
            className={`w-full payOptionButton ${
              selectedOption === "creditCard" ? "selectedPayOption" : "unSelectedPayOption"
            }`}
            onClick={() => handleButtonClick("creditCard")}
          >
            신용/체크카드 결제
          </button>
        </div>
      )}
    </div>
  );
};

export default SelectPayOption;
