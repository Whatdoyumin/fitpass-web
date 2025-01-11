import { useState } from "react";
import { ArrowDown, ArrowUp } from "../../assets/svg";

interface IPaymentInfoProps {
  isChecked: boolean;
  setIsChecked: React.Dispatch<React.SetStateAction<boolean>>;
}

const PaymentInfo = ({ isChecked, setIsChecked }: IPaymentInfoProps) => {
  const [isOpen, setIsOpen] = useState(true);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="w-full min-h-14 bg-white-100 px-[25px] gap-3 border-t-8 border-white-200">
      {/* 접히기 제어 상단 부분 */}
      <div
        className="w-full h-14 py-[26px] flex justify-between items-center"
        onClick={toggleDropdown}
      >
        <p className="text-16px text-black-700">결제 안내</p>
        {isOpen ? <ArrowUp width={"15px"} /> : <ArrowDown width={"15px"} />}
      </div>
      {isOpen && (
        <div className="flex flex-col gap-1 pb-4">
          <div className="w-full border-t-2 border-white-200 py-4">
            <div className="w-full h-[150px] bg-white-200 px-5 py-6 rounded-7 border border-gray-400"></div>
          </div>

          <div className="w-full flex gap-2 pb-4">
            <input
              type="checkBox"
              onClick={() => setIsChecked((prev) => !prev)}
              checked={isChecked}
            />
            <p className="text-14px text-gray-500">
              [필수] 위 구매 조건을 확인, 결제 진행 동의합니다.
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default PaymentInfo;
