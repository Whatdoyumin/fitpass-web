import { useEffect, useState } from "react";
import { ArrowDown, ArrowUp } from "../../assets/svg";
import { ICoin, TPaymentProps } from "../../types/payment";

interface IPaymentDetailsProps {
  item: ICoin;
  paymentMethod: string | null;
}

const PaymentDetails = ({ type, item, paymentMethod }: TPaymentProps & IPaymentDetailsProps) => {
  const [isOpen, setIsOpen] = useState(true);
  const [paymentDate, setPaymentDate] = useState<string>("");
  const [expiryDate, setExpiryDate] = useState<string>("");

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    const today = new Date();
    setPaymentDate(today.toLocaleDateString());

    const expiry = new Date();
    if (type === "buy-coins" && item?.expirationPeriod !== undefined) {
      expiry.setDate(today.getDate() + item.expirationPeriod);
    } else {
      expiry.setDate(today.getDate() + 30);
    }
    setExpiryDate(expiry.toLocaleDateString());
  }, [item, type]);

  const getPaymentMethodText = () => {
    switch (paymentMethod) {
      case "registeredCard":
        return "등록 카드 결제";
      case "creditCard":
        return "신용/체크카드 결제";
      case "kakaoPay":
        return "카카오페이 간편 결제";
      case "naverPay":
        return "네이버페이 간편 결제";
      default:
        return "미선택";
    }
  };

  const formatPrice = (price: number) => {
    return price.toLocaleString();
  };

  return (
    <div className="w-full min-h-14 bg-white-100 px-[25px] gap-3 border-t-8 border-white-200">
      {/* 접히기 제어 상단 부분 */}
      <div
        className="w-full h-14 py-[26px] flex justify-between items-center"
        onClick={toggleDropdown}
      >
        <p className="text-16px text-black-700">결제 내역</p>
        {isOpen ? <ArrowUp width={"15px"} /> : <ArrowDown width={"15px"} />}
      </div>

      {/* 결제 상세 정보 */}
      {isOpen && (
        <div className="w-full border-t-2 border-white-200 py-4">
          <div className="w-full bg-white-200 px-5 py-6 flex flex-col gap-2 rounded-7">
            <span className="w-full flex justify-between items-center">
              <p className="text-16px text-gray-600">결제 금액</p>
              <p className="text-16px text-black-700">{formatPrice(item.price)}원</p>
            </span>
            <span className="w-full flex justify-between items-center">
              <p className="text-16px text-gray-600">플랜</p>
              <p className="text-16px text-black-700">{`${item.name}`}</p>
            </span>
            <span className="w-full flex justify-between items-center">
              <p className="text-16px text-gray-600">결제일</p>
              <p className="text-16px text-black-700">{paymentDate}</p>
            </span>
            <span className="w-full flex justify-between items-center">
              <p className="text-16px text-gray-600">사용 기한</p>
              <p className="text-16px text-black-700">{expiryDate}</p>
            </span>
            <span className="w-full flex justify-between items-center">
              <p className="text-16px text-gray-600">결제 수단</p>
              <p className="text-16px text-black-700">{getPaymentMethodText()}</p>
            </span>
          </div>
        </div>
      )}
    </div>
  );
};

export default PaymentDetails;
