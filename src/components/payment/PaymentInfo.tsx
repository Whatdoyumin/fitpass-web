import { useState } from "react";
import { ArrowDown, ArrowUp } from "../../assets/svg";
import { PAYMENT_POLICY } from "../../constants/policies";

interface IPaymentInfoProps {
  isChecked: boolean;
  setIsChecked: React.Dispatch<React.SetStateAction<boolean>>;
}

const PaymentInfo = ({ isChecked, setIsChecked }: IPaymentInfoProps) => {
  const [isOpen, setIsOpen] = useState(true);
  const [isDetailOpen, setIsDetailOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const detailToggleDropdown = () => {
    setIsDetailOpen(!isDetailOpen);
  };

  return (
    <div className="w-full min-h-14 bg-white-100 px-[25px] gap-3 border-t-8 border-white-200">
      {/* 접히기 제어 상단 부분 */}
      <div
        className="w-full h-14 py-[26px] flex justify-between items-center"
        onClick={toggleDropdown}
      >
        <p className="text-16px text-black-700">결제 안내</p>
        {isOpen ? <ArrowUp width={"15px"} /> : <ArrowUp width={"15px"} />}
      </div>
      {isOpen && (
        <div className="flex flex-col gap-1 pb-4">
          {/* 체크 + 라벨 + 화살표 한 줄 정렬 */}
          <div className="w-full flex justify-between items-center pt-4 border-t-2 border-white-200">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkBox"
                onChange={() => setIsChecked((prev) => !prev)}
                checked={isChecked}
              />
              <p className="text-14px text-gray-500">
                [필수] 구매 조건을 확인, 코인 구매 약관에 동의합니다.
              </p>
            </label>

            <div
              className="flex justify-center items-center cursor-pointer"
              onClick={(e) => {
                e.stopPropagation();
                detailToggleDropdown();
              }}
            >
              {isDetailOpen ? <ArrowUp width={"9px"} /> : <ArrowDown width={"9px"} />}
            </div>
          </div>

          {/* 세부 약관 내용 */}
          {isDetailOpen && (
            <div className="w-full py-4">
              <div className="w-full bg-white-200 px-5 py-6 rounded-7 border border-gray-400">
                <p className="whitespace-pre-line text-gray-500 text-12px">
                  {PAYMENT_POLICY[0].content}
                </p>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default PaymentInfo;
