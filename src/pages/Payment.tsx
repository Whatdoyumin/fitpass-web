import { useState } from "react";
import BigDropdown from "../components/payment/BigDropdown";
import PaymentDetails from "../components/payment/PaymentDetails";
import SelectPayOption from "../components/payment/SelectPayOption";
import { COIN_PRICE } from "../constants/price-menu";
import { TPayOption } from "../type/payment";
import PaymentInfo from "../components/payment/PaymentInfo";
import Modal from "../components/Modal";
import { useNavigate } from "react-router-dom";

interface IPaymentProps {
  type: "subscribe" | "buy-coins";
}

function Payment({ type }: IPaymentProps) {
  const [selectedCoin, setSelectedCoin] = useState(COIN_PRICE[0]);
  const [selectedPayOption, setSelectedPayOption] = useState<string | null>(null);
  const [isChecked, setIsChecked] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);

  const navigate = useNavigate();

  const handleCoinChange = (coinId: number) => {
    const coin = COIN_PRICE.find((item) => item.id === coinId);
    if (coin) setSelectedCoin(coin);
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

  const coinOptions =
    type === "buy-coins" ? COIN_PRICE.map((item) => `${item.coinAmount}코인`) : [];

  return (
    <div className="w-full h-full bg-white-200 overflow-y-auto flex flex-col justify-between">
      <div>
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
