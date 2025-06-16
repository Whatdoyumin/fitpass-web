import { useEffect, useState } from "react";
import { ICoin } from "../../types/payment";
import Modal from "../Modal";
import { useNavigate } from "react-router-dom";
import { useStartNicePayment } from "../../hooks/useNicePayment/useStartPayment";
import PortOne from "@portone/browser-sdk/v2";
import { useCompleteNicePayment } from "../../hooks/useNicePayment/useCompletePayment";

interface PaymentButtonProps {
  selectedPayOption: string | null;
  isChecked: boolean;
  selectItem: ICoin;
}

const PaymentButton = ({ selectedPayOption, isChecked, selectItem }: PaymentButtonProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);
  const [isLoadingComplete, setIsLoadingComplete] = useState(false);
  const navigate = useNavigate();
  const storeId = import.meta.env.VITE_STORE_ID;
  const channelKey = import.meta.env.VITE_CHANNEL_KEY;

  const { mutate: startNicePayment } = useStartNicePayment();
  const { mutate: completeNicePayment } = useCompleteNicePayment();

  // 리다이렉트 방식(모바일) 후 복귀 시 complete 처리
  useEffect(() => {
    const isReturned = sessionStorage.getItem("isReturnedFromPayment");
    const paymentId = sessionStorage.getItem("paymentId");

    if (isReturned === "true" && paymentId) {
      completeNicePayment(
        { paymentId },
        {
          onSuccess: () => {
            setIsCompleted(true);
            setIsModalOpen(true);
            sessionStorage.removeItem("paymentId");
            sessionStorage.removeItem("isReturnedFromPayment");
          },
          onError: (error) => {
            console.error(error.message);
            alert("결제 처리에 실패했습니다.");
            setIsModalOpen(false);
            sessionStorage.removeItem("paymentId");
            sessionStorage.removeItem("isReturnedFromPayment");
          },
        }
      );
    }
  }, []);

  const handleClickPay = () => {
    if (selectedPayOption === null) {
      alert("결제 수단을 선택해주세요.");
      return;
    }
    setIsModalOpen(true);
  };

  // paymentId로 포트원 결제창 호출
  const handleRequestPortOne = (paymentId: string) => {
    sessionStorage.setItem("paymentId", paymentId);
    sessionStorage.setItem("isReturnedFromPayment", "true");

    const isMobile = /iPhone|Android/i.test(navigator.userAgent);

    PortOne.requestPayment({
      storeId,
      channelKey,
      paymentId,
      orderName: `${selectItem.name} (${selectItem.expirationPeriod}일 유효)`,
      totalAmount: selectItem.price,
      currency: "CURRENCY_KRW",
      payMethod: "CARD",
      ...(isMobile && {
        redirectUrl: window.location.href,
      }),
    }).then((response) => {
      const savedPaymentId = sessionStorage.getItem("paymentId");

      const message = response?.message?.toLowerCase();
      const isCanceled = message?.includes("취소") || message?.includes("cancel");

      if (!response || isCanceled) {
        alert("결제가 취소되었습니다.");
        sessionStorage.removeItem("paymentId");
        sessionStorage.removeItem("isReturnedFromPayment");
        setIsModalOpen(false);
        return;
      }

      if (!savedPaymentId) return;

      setIsLoadingComplete(true);
      completeNicePayment(
        { paymentId: savedPaymentId },
        {
          onSuccess: () => {
            setIsLoadingComplete(false);
            setIsCompleted(true);
            setIsModalOpen(true);
            sessionStorage.removeItem("paymentId");
            sessionStorage.removeItem("isReturnedFromPayment");
          },
          onError: (error) => {
            console.error(error.message);
            alert("결제 처리에 실패했습니다.");
            setIsLoadingComplete(false);
            setIsModalOpen(false);
            sessionStorage.removeItem("paymentId");
            sessionStorage.removeItem("isReturnedFromPayment");
          },
        }
      );
    });
  };

  // 결제 시작 → paymentId 발급
  const handleStartPay = () => {
    startNicePayment(
      {
        itemId: selectItem.name,
        price: selectItem.price,
      },
      {
        onSuccess: (response) => {
          const paymentId = response.result.paymentId;
          handleRequestPortOne(paymentId);
        },
        onError: (error) => {
          console.error(error.message);
          setIsModalOpen(false);
        },
      }
    );
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    if (isCompleted) {
      navigate("/my");
    }
  };

  if (isLoadingComplete) {
    return (
      <Modal
        isOpen={isModalOpen}
        onClose={() => {}}
        onSuccess={() => {}}
        title="구매 처리 중입니다."
        btn2Text="잠시만 기다려주세요."
      />
    );
  }

  return (
    <>
      <button
        className={`w-full max-w-content h-navbar py-6 bottom-0 fixed text-white-100 flex justify-center items-center text-[20px] ${
          isChecked ? "bg-blue-500" : "bg-gray-400 pointer-events-none"
        }`}
        onClick={handleClickPay}
      >
        구매하기
      </button>

      {isModalOpen && (
        <Modal
          isOpen={isModalOpen}
          onClose={handleCloseModal}
          onSuccess={isCompleted ? handleCloseModal : handleStartPay}
          title={isCompleted ? "구매가 완료되었습니다." : "구매하시겠습니까?"}
          btn1Text={isCompleted ? null : "아니요"}
          btn2Text={isCompleted ? "확인" : "네, 구매하겠습니다"}
        />
      )}
    </>
  );
};

export default PaymentButton;
