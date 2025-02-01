import { useNavigate } from "react-router-dom";
import { PassPayment } from "../assets/svg";
import { usePaymentPass } from "../hooks/useGetPaymentPass";
import { useParams } from "react-router-dom";

const PassPaymentSuccess = () => {
  const { id } = useParams<{ id: string }>();
  const fitnessId = id ? parseInt(id, 10) : 0;

  const navigate = useNavigate();

  const navigateToUsePass = () => {
    navigate("/use-pass");
  }

  const { data } = usePaymentPass( fitnessId, 'afterBuyPass' );
  console.log(data);

  return (
    <div className="flex flex-col bg-white-200 h-[736px] items-center justify-center">
      <div className="flex flex-col items-center justify-center gap-[33px]">
        <PassPayment className="w-[95px] h-[95px]" />
        <p className="font-bold text-[22px] mb-5">결제가 완료되었습니다</p>
      </div>
      <div className="w-[350px] h-[203px] rounded-[7px] bg-white-100 p-4 flex flex-col gap-2 mt-8 mb-3 ">
        <p className="font-bold text-[18px] pt-3">결제 정보</p>
        <div className="p-4 flex flex-col gap-2 text-base font-medium">
          <div className="flex justify-between"><span className="text-gray-600 ">매장명</span><span>{data?.name}</span></div>
          <div className="flex justify-between"><span className="text-gray-600">결제 금액</span><span>{data?.totalFee}코인</span></div>
          <div className="flex justify-between"><span className="text-gray-600">결제 후 코인</span><span>{data?.feeBeforePay}코인</span></div>
        </div>
      </div>
      <div className="flex flex-col items-center">
        <button type="submit" onClick={() => navigateToUsePass()}
          className="w-[300px] h-[46px] rounded-[5px] bg-blue-500 text-white-100 flex justify-center items-center text-[15px] font-bold mt-5">확인하기</button>
      </div>
    </div>
  );
}

export default PassPaymentSuccess;