import { useState } from "react";
import Modal from "../components/Modal";
import { useNavigate, useParams } from "react-router-dom";
import { usePaymentPass } from "../hooks/useGetPaymentPass";
import { usePostPass } from "../hooks/usePostPass";
import { ArrowDown, ArrowUp } from "../assets/svg";
import { PAYMENT_POLICY } from "../constants/policies";

function PurchasePass() {
  const { id } = useParams<{ id: string }>();
  const fitnessId = id ? parseInt(id, 10) : -1;

  // 체크박스
  const [isChecked, setIsChecked] = useState(false);
  const [isDetailOpen, setIsDetailOpen] = useState(false);

  const handleDetailToggle = () => {
    setIsDetailOpen((prev) => !prev);
  };

  const handleCheckbox = (event: React.ChangeEvent<HTMLInputElement>) => {
    setIsChecked(event.target.checked);
  };

  const navigate = useNavigate();

  // 패스 구매 post 연결
  const mutation = usePostPass(navigate);

  const handlePurchaseDone = () => {
    mutation.mutate({
      fitnessId,
      agree: true,
    });
  };

  // 패스 구매 모달
  const [isModal, setIsModal] = useState(false);

  const handleModalOpen = () => {
    setIsModal(!isModal);
  };

  const handleModalClose = () => {
    setIsModal(false);
  };

  // 코인 부족 시 패스 구매 모달
  const [coinModal, setCoinModal] = useState(false);

  const handleCoinModalOpen = () => {
    setCoinModal(!coinModal);
  };

  const handleCoinModalClose = () => {
    setCoinModal(false);
  };

  const handleMoveToBuyCoin = () => {
    navigate("/buy-coins");
  };

  // 패스 데이터 연결
  const { data } = usePaymentPass(fitnessId);

  return (
    <div className="bg-white-200 min-h-full flex items-center justify-center p-4">
      <div className="flex flex-col justify-center">
        <img src={data?.imageUrl} alt="이미지" className="w-[340px] h-[191px] rounded-t-[7px]" />
        <div className="bg-white-100 w-[340px] font-medium text-base rounded-b py-7">
          <div className="p-4 flex flex-col gap-3">
            <p className="font-bold text-[18px] pt-3">결제 정보</p>
            <div className="flex justify-between">
              <span className="text-gray-600 ">매장명</span>
              <span>{data?.fitnessName}</span>
            </div>
          </div>
          <div className="p-4 flex flex-col gap-2">
            <div className="flex justify-between">
              <span className="text-gray-600 ">상품 금액</span>
              <span>{data?.fee}코인</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">할인 금액</span>
              <span>{data?.discount}코인</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">결제 금액</span>
              <span>{data?.totalFee}코인</span>
            </div>
          </div>
          <div className="border-b-2 my-2"></div>
          <div className="p-4 my-2 flex flex-col gap-2">
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id="agree"
                  checked={isChecked}
                  onChange={handleCheckbox}
                  className="cursor-pointer"
                />
                <label htmlFor="agree" className="font-medium text-xs text-gray-500 cursor-pointer">
                  [필수] 위 구매 조건을 확인, 결제 진행 동의합니다.
                </label>
              </div>

              <div className="cursor-pointer" onClick={handleDetailToggle}>
                {isDetailOpen ? <ArrowUp width="10px" /> : <ArrowDown width="10px" />}
              </div>
            </div>

            {/* 상세 약관 표시 */}
            {isDetailOpen && (
              <div className="w-full bg-white-200 px-4 py-3 rounded-7 border">
                <p className="whitespace-pre-line text-gray-500 text-[11px] leading-relaxed">
                  {PAYMENT_POLICY[1].content}
                </p>
              </div>
            )}
          </div>
          <div className="flex flex-col items-center">
            <button
              type="submit"
              className={`w-[300px] h-[46px] rounded-[5px] text-white-100 flex justify-center items-center text-[15px] font-bold mt-2 
              ${isChecked ? "bg-blue-500" : "bg-gray-400"}`}
              onClick={() => {
                if ((data?.feeBeforePay ?? 0) <= 0) {
                  handleCoinModalOpen();
                } else {
                  handleModalOpen();
                }
              }}
              disabled={!isChecked}
            >
              패스 구매하기
            </button>
          </div>
        </div>
        {/* div 반원 */}
        <div className="flex justify-between relative mt-2">
          <div className="w-[40px] h-[40px] rounded-full bg-white-200 absolute bottom-[-20px] left-[-20px]"></div>
          <div className="w-[40px] h-[40px] rounded-full bg-white-200 absolute bottom-[-20px] right-[-20px]"></div>
        </div>
      </div>
      {isModal && (
        <Modal
          isOpen={isModal}
          onClose={handleModalClose}
          onSuccess={handlePurchaseDone}
          title="패스를 구매하시겠습니까?"
          btn1Text="아니요"
          btn2Text="확인"
        />
      )}

      {coinModal && (
        <Modal
          isOpen={coinModal}
          onClose={handleCoinModalClose}
          onSuccess={handleMoveToBuyCoin}
          title="코인이 부족합니다"
          subTitle="코인을 구매하시겠습니까?"
          btn1Text="아니요"
          btn2Text="확인"
        />
      )}
    </div>
  );
}

export default PurchasePass;
