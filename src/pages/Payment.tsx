import { useEffect, useRef, useState } from "react";
import BigDropdown from "../components/payment/BigDropdown";
import PaymentDetails from "../components/payment/PaymentDetails";
import SelectPayOption from "../components/payment/SelectPayOption";
import { COIN_PRICE, SUBSCRIBE_OPTION } from "../constants/price-menu";
import { TCoinBody, TPaymentProps, TPayOption, TSubscribeBody } from "../types/payment";
import PaymentInfo from "../components/payment/PaymentInfo";
import Modal from "../components/Modal";
import { useNavigate, useSearchParams } from "react-router-dom";
import { usePostPayCoin, usePostPayCoinSuccess } from "../hooks/usePostPayCoin";
import { usePostChangeSub, usePostPlan, usePostPlanSuccess } from "../hooks/usePostPlan";
import { usePostPayBillingKey, usePostPayPlanBillingKey } from "../hooks/useKpnPayment";

function Payment({ type }: TPaymentProps) {
  const [selectItem, setSelectItem] = useState<TCoinBody | TSubscribeBody>(
    type === "buy-coins" ? COIN_PRICE[0] : SUBSCRIBE_OPTION[0]
  );
  const [selectedPlan, setSelectedPlan] = useState<string | undefined>();
  const [selectedPayOption, setSelectedPayOption] = useState<string | null>(null);
  const [selectedCard, setSelectedCard] = useState<string | null | undefined>(null);
  const [isChecked, setIsChecked] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);
  const [isSubscribingState] = useState(localStorage.getItem("isSubscribing") === "true");
  const [isMobile, setIsMobile] = useState(false);
  const [searchParams] = useSearchParams();

  const { mutate: changeSubMutate } = usePostChangeSub();
  const { mutate } = usePostPayCoin();
  const { mutate: planMutate } = usePostPlan();
  const { mutate: mutatePaySuccess } = usePostPayCoinSuccess();
  const { mutate: mutatePlanSuccess } = usePostPlanSuccess();
  const { mutate: mutateKpnPayCoin } = usePostPayBillingKey();
  const { mutate: mutateKpnPayPlan } = usePostPayPlanBillingKey();

  const navigate = useNavigate();
  const itemName = localStorage.getItem("itemName") || null;

  // pc or mobile 기기 구분
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(
        "ontouchstart" in window || /iPhone|iPad|iPod|Android/i.test(navigator.userAgent)
      );
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
  }, []);

  const handleItemChange = (itemId: number) => {
    const items = type === "buy-coins" ? COIN_PRICE : SUBSCRIBE_OPTION;
    const item = items.find((i) => i.id === itemId);
    if (item) {
      setSelectItem(item);
      if (type === "subscribe" && "option_ko" in item) {
        setSelectedPlan(item.option_ko);
      }
    }
  };

  const handlePayOptionChange = (option: TPayOption | null) => {
    setSelectedPayOption(option);
  };

  const handleClickPay = () => {
    if (selectedPayOption === null) {
      alert("결제 수단을 선택해주세요.");
      return;
    }
    setIsModalOpen((prev) => !prev);
  };

  // 구독 상태 변경
  const hadnleModifySub = () => {
    if (!selectedPlan) {
      alert("플랜을 선택해주세요.");
      return;
    }
    changeSubMutate(
      { planName: selectedPlan },
      {
        onSuccess: () => {
          setIsCompleted(true);
          setIsModalOpen(true);
          localStorage.removeItem("isSubscribing");
          localStorage.removeItem("itemName");
        },
      }
    );
  };

  // 결제 요청
  const handleCompletePay = () => {
    if (!selectedPayOption) {
      alert("결제 수단을 선택해주세요.");
      return;
    }

    // KakaoPay 결제 로직
    if (selectedPayOption === "kakaoPay") {
      if (type === "buy-coins") {
        mutate(
          {
            itemName: `${selectItem.coinAmount} 코인`,
            quantity: selectItem.coinAmount,
            totalAmount: Number(selectItem.price),
            methodName: selectedPayOption,
          },
          {
            onSuccess: (response) => {
              const url = isMobile
                ? response?.result?.next_redirect_mobile_url
                : response?.result?.next_redirect_pc_url;

              if (url) window.location.href = url;
            },
            onError: (error) => {
              console.error(error.message);
              setIsModalOpen(false);
            },
          }
        );
      } else if (type === "subscribe" && "option_en" in selectItem) {
        planMutate(
          {
            itemName: selectItem.option_ko,
            totalAmount: Number(selectItem.price),
            methodName: selectedPayOption,
          },
          {
            onSuccess: (response) => {
              const url = isMobile
                ? response?.result?.next_redirect_mobile_url
                : response?.result?.next_redirect_pc_url;

              if (url) window.location.href = url;
            },
            onError: (error) => {
              console.error(error.message);
              setIsModalOpen(false);
            },
          }
        );
      }
    }

    // KPN 카드 등록 결제 로직
    if (selectedPayOption === "registeredCard") {
      if (!selectedCard) {
        alert("카드를 선택해주세요.");
        return;
      }

      if (type === "buy-coins") {
        mutateKpnPayCoin(
          {
            billingKey: selectedCard,
            orderName: `${selectItem.coinAmount} 코인`,
            amount: Number(selectItem.price),
          },
          {
            onSuccess: () => {
              setIsCompleted(true);
              setIsModalOpen(true);
            },
            onError: (error) => {
              console.error(error.message);
              setIsModalOpen(false);
            },
          }
        );
      } else if (type === "subscribe" && "option_en" in selectItem) {
        mutateKpnPayPlan(
          {
            billingKey: selectedCard,
            orderName: selectItem.option_ko,
            amount: Number(selectItem.price),
          },
          {
            onSuccess: () => {
              setIsCompleted(true);
              setIsModalOpen(true);
            },
            onError: (error) => {
              console.error(error.message);
              setIsModalOpen(false);
            },
          }
        );
      }
    }
  };

  const pgToken = searchParams.get("pg_token");
  const isRequestSent = useRef(false);

  useEffect(() => {
    if (!pgToken || isRequestSent.current) return;

    isRequestSent.current = true;

    if (type === "buy-coins") {
      mutatePaySuccess(
        { pgToken },
        {
          onSuccess: () => {
            setIsModalOpen(true);
            setIsCompleted(true);
          },
          onError: (error) => {
            console.error("결제 실패:", error);
          },
        }
      );
    } else if (type === "subscribe") {
      mutatePlanSuccess(
        { pgToken },
        {
          onSuccess: () => {
            setIsModalOpen(true);
            setIsCompleted(true);
          },
          onError: (error) => {
            console.error("결제 실패:", error);
          },
        }
      );
    }
  }, [mutatePaySuccess, mutatePlanSuccess, pgToken, type]);

  const handleCloseModal = () => {
    setIsModalOpen((prev) => !prev);
    if (isCompleted) {
      navigate("/my");
    }
  };

  const dropdownOptions =
    type === "buy-coins"
      ? COIN_PRICE.map((item) => `${item.coinAmount}코인`)
      : SUBSCRIBE_OPTION.filter((item) => item.option_ko !== itemName).map(
          (item) => `${item.option_ko} 요금제`
        );

  return (
    <div className="w-full h-full bg-white-200 overflow-y-auto flex flex-col justify-between">
      <div>
        <div className="w-full h-[140px] bg-white-100 flex flex-col px-[25px] py-[26px] gap-3">
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
          setSelectedCard={setSelectedCard}
          onPayOptionSelect={handlePayOptionChange}
        />
        <PaymentDetails type={type} item={selectItem} paymentMethod={selectedPayOption} />
        <PaymentInfo isChecked={isChecked} setIsChecked={setIsChecked} />
      </div>
      {type === "subscribe" && isSubscribingState ? (
        <button
          className={`w-full max-w-content h-navbar py-6 bottom-0 fixed text-white-100 flex justify-center items-center text-[20px] ${
            isChecked ? "bg-blue-500" : "bg-gray-400 pointer-events-none"
          }`}
          onClick={hadnleModifySub}
        >
          플랜 변경하기
        </button>
      ) : (
        <button
          className={`w-full max-w-content h-navbar py-6 bottom-0 fixed text-white-100 flex justify-center items-center text-[20px] ${
            isChecked ? "bg-blue-500" : "bg-gray-400 pointer-events-none"
          }`}
          onClick={handleClickPay}
        >
          구매하기
        </button>
      )}

      {isSubscribingState && type === "subscribe" && isModalOpen && (
        <Modal
          isOpen={isModalOpen}
          onClose={handleCloseModal}
          onSuccess={handleCloseModal}
          title={"플랜 변경이 완료되었습니다."}
          btn2Text={"확인"}
        />
      )}

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
