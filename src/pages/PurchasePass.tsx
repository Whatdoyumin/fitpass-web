import { useState } from "react";
import Modal from "../components/Modal";
import { useNavigate, useParams } from "react-router-dom";
import { usePaymentPass } from "../hooks/useGetPaymentPass";


function PurchasePass() {
  const { id } = useParams<{ id: string }>();
  // console.log(id);

  // 체크박스
  const [isChecked, setIsChecked] = useState(false);

  const handleCheckbox = (event: React.ChangeEvent<HTMLInputElement>) => {
    setIsChecked(event.target.checked);
  }

  const navigate = useNavigate();

  // 패스 구매 모달
  const [isModal, setIsModal] = useState(false);

  const handleModalOpen = () => {
    setIsModal(!isModal);
  }

  const handleModalClose = () => {
    setIsModal(false);
  }

  const handlePurchaseDone = () => {
    navigate(`/purchase-pass/${id}/done`)
  }

  // 코인 부족 시 패스 구매 모달
  const [coinModal, setCoinModal] = useState(false);

  const handleCoinModalOpen = () => { 
    setCoinModal(!coinModal) 
  };

  const handleCoinModalClose = () => {
    setCoinModal(false);
  }

  const handleMoveToBuyCoin = () => {
    navigate("/buy-coins");
  }

  // api 연결
  const { data } = usePaymentPass( id!, 'buyPass');

  return (
    <>
      <div className="bg-white-200 h-[736px] flex items-center justify-center">
        <div className="flex flex-col h-[686.77px] items-center6 justify-center">
          <img src={data?.fitnessImage} alt="이미지" className="w-[340px] h-[191px] rounded-t-[7px]" />
          <div className="bg-white-100 w-[340px] h-[495.77px] font-medium text-base rounded-b ">
            <div className="p-4 flex flex-col gap-3">
              <p className="font-bold text-[18px] pt-3">결제 정보</p>
              <div className="flex justify-between"><span className="text-gray-600 ">매장명</span><span>{data?.name}</span></div>
            </div>
            <div className="p-4 flex flex-col gap-2">
              <div className="flex justify-between"><span className="text-gray-600 ">상품 금액</span><span>{data?.fee}코인</span></div>
              <div className="flex justify-between"><span className="text-gray-600">할인 금액</span><span>{data?.discount}코인</span></div>
              <div className="flex justify-between"><span className="text-gray-600">결제 금액</span><span>{data?.totalFee}코인</span></div>
            </div>
            <div className="border-b-2 my-2"></div>
            <div className="p-4 flex flex-col gap-2">
              <div className="flex justify-between"><span className="text-gray-600">결제 전 코인</span><span>{data?.feeBeforePay}코인</span></div>
              <div className="flex justify-between"><span className="text-gray-600">결제 후 코인</span>
                <span className={(data?.feeAfterPay ?? 0) < 0  ? 'text-red-500' : ''}>{data?.feeAfterPay}코인</span></div>
            </div>
            <div className="h-[15px] p-4 my-2 flex items-center">
              <input 
                type="checkbox" 
                id="agree" 
                className="mr-3"
                checked={isChecked}
                onChange={handleCheckbox}
                />
              <label htmlFor="agree" 
                className="font-medium text-xs text-gray-500 ">
                [필수] 위 구매 조건을 확인, 결제 진행 동의합니다.</label>
            </div>
            <div className="flex flex-col items-center">
              <button type="submit" className={`w-[300px] h-[46px] rounded-[5px] text-white-100 flex justify-center items-center text-[15px] font-bold mt-2 
              ${isChecked ? 'bg-blue-500' : 'bg-gray-400'}`}
                onClick={() => {
                  if ((data?.feeAfterPay ?? 0) < 0) {
                    handleCoinModalOpen();
                  } else {
                    handleModalOpen();
                  }
                }}
                disabled={!isChecked}>패스 구매하기
              </button>
            </div>
          </div>
        </div>
      </div>
      {isModal && <Modal
        isOpen={isModal}
        onClose={handleModalClose}
        onSuccess={handlePurchaseDone}
        title="패스를 구매하시겠습니까?"
        btn1Text="아니요"
        btn2Text="확인"/>}

        {coinModal && <Modal
          isOpen={coinModal}
          onClose={handleCoinModalClose}
          onSuccess={handleMoveToBuyCoin}
          title="코인이 부족합니다"
          subTitle="코인을 구매하시겠습니까?"
          btn1Text="아니요"
          btn2Text="확인"
        />}
    </>
  );
}

export default PurchasePass;