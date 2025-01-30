import { useState } from "react";
import Modal from "../components/Modal";
import { useNavigate } from "react-router-dom";

function PurchasePass() {

  // 체크박스
  const [isChecked, setIsChecked] = useState(false);

  const handleCheckbox = (event: React.ChangeEvent<HTMLInputElement>) => {
    setIsChecked(event.target.checked);
  }

  // 패스 구매 모달
  const [isModal, setIsModal] = useState(false);

  const handleModalOpen = () => {
    setIsModal(!isModal);
  }

  const handleModalClose = () => {
    setIsModal(false);
  }

  const navigate = useNavigate();

  const handlePurchaseDone = () => {
    navigate(`/purchase-pass/1/done`)
  }

  const imgurl: string = "https://s3-alpha-sig.figma.com/img/9771/3785/008387989af4aead9a0b02db565f1ca0?Expires=1736726400&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=keikTmna2x6G2RNM~AJfZPEQ8GLIRVkUj8uV39FdgmBSNhPtcCsbYmx4TUtHSc45mqkkUK9Kme6sCAsytIzjSXFm1yVf0Xdwn1z6MjcNpd6jUQ4zU3YJwiuU9lTQ~ka74kZiU5WHriQQATmPMe1Wl3yRmWXTWMHxM-He9TpQot-gIi944ECLqOM7p0D3mZQeg8-BSFFoiXybxXYMUCQSPcAhY587xbNAgHwXeZog23iWpVYN1PRIiGV3Ba4G1PcQTPB1SJVgL6fDyEEh31DiSvaR6TR4rZ9mZMD8~WKluhc2XekN2W1OzCT~An0H1d0HtInNcGaAV4PDeCi1-IOfLQ__"

  return (
    <>
      <div className="bg-white-200 h-[736px] flex items-center justify-center">
        <div className="flex flex-col h-[686.77px] items-center justify-center">
          <img src={imgurl} alt="이미지" className="w-[340px] h-[191px] rounded-t-[7px]" />
          <div className="bg-white-100 w-[340px] h-[495.77px] font-medium text-base rounded-b ">
            <div className="p-4 flex flex-col gap-3">
              <p className="font-bold text-[18px] pt-3">결제 정보</p>
              <div className="flex justify-between"><span className="text-gray-600 ">매장명</span><span>동국대학교 헬스장</span></div>
            </div>
            <div className="p-4 flex flex-col gap-2">
              <div className="flex justify-between"><span className="text-gray-600 ">상품 금액</span><span>100코인</span></div>
              <div className="flex justify-between"><span className="text-gray-600">할인 금액</span><span>10코인</span></div>
              <div className="flex justify-between"><span className="text-gray-600">결제 금액</span><span>90코인</span></div>
            </div>
            <div className="border-b-2 my-2"></div>
            <div className="p-4 flex flex-col gap-2">
              <div className="flex justify-between"><span className="text-gray-600">결제 전 코인</span><span>100코인</span></div>
              <div className="flex justify-between"><span className="text-gray-600">결제 후 코인</span><span>10코인</span></div>
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
                onClick={() => handleModalOpen()}
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
    </>
  );
}

export default PurchasePass;