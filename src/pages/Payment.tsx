import { useState } from "react";
import BigDropdown from "../components/payment/BigDropdown";
import PaymentDetails from "../components/payment/PaymentDetails";
import SelectPayOption from "../components/payment/SelectPayOption";
import { COIN_PRICE, SUBSCRIBE_OPTION } from "../constants/price-menu";
import { TPaymentProps, TPayOption } from "../type/payment";
import PaymentInfo from "../components/payment/PaymentInfo";
import Modal from "../components/Modal";
import { useNavigate } from "react-router-dom";

function Payment({ type }: TPaymentProps) {
  const [selectItem, setSelectItem] = useState(
    type === "buy-coins" ? COIN_PRICE[0] : SUBSCRIBE_OPTION[0]
  );
  const [selectedPayOption, setSelectedPayOption] = useState<string | null>(null);
  const [isChecked, setIsChecked] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);

  const navigate = useNavigate();

  const handleItemChange = (itemId: number) => {
    const items = type === "buy-coins" ? COIN_PRICE : SUBSCRIBE_OPTION;
    const item = items.find((i) => i.id === itemId);
    if (item) setSelectItem(item);
  };

  const handlePayOptionChange = (option: TPayOption | null) => {
    setSelectedPayOption(option);
  };

  const handleCloseModal = () => {
    setIsModalOpen((prev) => !prev);
    if (isCompleted) {
      navigate("/my");
    }
  };

  const handleCompletePay = () => {
    setIsCompleted((prev) => !prev);
  };

  const dropdownOptions =
    type === "buy-coins"
      ? COIN_PRICE.map((item) => `${item.coinAmount}코인`)
      : SUBSCRIBE_OPTION.map((item) => `${item.option_ko} 요금제`);

  return (
    <div className="w-full h-full bg-white-200 overflow-y-auto flex flex-col justify-between">
      <div>
        <div className="w-full bg-white-100 flex flex-col px-[25px] py-[26px] gap-3">
          <p className="text-16px">{type === "buy-coins" ? "코인 요금제 선택" : "플랜 선택"}</p>
          <BigDropdown
            options={dropdownOptions}
            onOptionSelect={(option) => {
              const selectedId =
                type === "buy-coins"
                  ? COIN_PRICE.find((item) => `${item.coinAmount}코인` === option)?.id
                  : SUBSCRIBE_OPTION.find((item) => `${item.option_ko} 요금제` === option)?.id;
              if (selectedId) handleItemChange(selectedId);
            }}
          />
        </div>
        <SelectPayOption
          selectedOption={selectedPayOption}
          setSelectedOption={setSelectedPayOption}
          onPayOptionSelect={handlePayOptionChange}
        />
        <PaymentDetails type={type} item={selectItem} paymentMethod={selectedPayOption} />
        <PaymentInfo isChecked={isChecked} setIsChecked={setIsChecked} />
      </div>
      <button
        className={`w-full max-w-content h-navbar py-6 bottom-0 fixed text-white-100 flex justify-center items-center text-[20px] ${
          isChecked ? "bg-blue-500" : "bg-gray-400 pointer-events-none"
        }`}
        onClick={() => setIsModalOpen((prev) => !prev)}
      >
        구매하기
      </button>

      {isModalOpen && (
        <Modal
          isOpen={isModalOpen}
          onClose={handleCloseModal}
          onSuccess={isCompleted ? handleCloseModal : handleCompletePay}
          title={isCompleted ? "구매가 완료되었습니다." : "구매하시겠습니까?"}
          btn1Text={isCompleted ? null : "아니요"}
          btn2Text={isCompleted ? "확인" : "네, 구매하겠습니다"}
        />
      )}
    </div>
  );
}

export default Payment;
