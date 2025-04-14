import { useEffect, useState } from "react";
import { IcEmptyDollarBlue } from "../assets/svg";
import { PaymentCard } from "../components/paymentCard/PaymentCard";
import { Toggle } from "../components/paymentCard/Toggle";
import { useGetPayHistory, usePostPayDeactivate } from "../hooks/useGetPayHistory";
import { useInView } from "react-intersection-observer";
import { GuideLogin } from "./GuideLogin";
import { TPayHistoryItem, TPayQuery } from "../types/payHistory";
import { useAuth } from "../context/AuthContext";
import SkeletonPaymentCard from "./../components/paymentCard/SkeletonPaymentCard";
import Modal from "../components/Modal";
import { useNavigate } from "react-router-dom";

function PayHistory() {
  const navigate = useNavigate();
  const [query, setQuery] = useState<TPayQuery>("ALL");
  const [isSubscribing, setIsSubscribing] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);
  const { isLogin } = useAuth();

  const { data, isFetching, hasNextPage, fetchNextPage, isPending, isError, error } =
    useGetPayHistory(query);
  const { mutate } = usePostPayDeactivate();

  const handleAllClick = () => setQuery("ALL");
  const handlePlanClick = () => setQuery("PLAN");
  const handleCoinClick = () => setQuery("COIN");

  const handleModalOpen = () => {
    setIsModalOpen(true);
  };
  const handleCloseModal = () => {
    setIsModalOpen(false);
    if (isCompleted) {
      navigate("/my");
    }
  };
  const handleCompleteDeactivate = () => {
    mutate(undefined, {
      onSuccess: () => {
        setIsCompleted(true);
      },
      onError: () => {
        alert("에러가 발생했습니다. 다시 시도해주세요.");
      },
    });
  };

  const { ref, inView } = useInView({ threshold: 0 });
  useEffect(() => {
    if (inView && hasNextPage && !isFetching) {
      fetchNextPage();
    }
  }, [inView, hasNextPage, isFetching, fetchNextPage]);

  useEffect(() => {
    if (data?.pages[0]?.isSubscribing === true) {
      setIsSubscribing(true);
    } else {
      setIsSubscribing(false);
    }
  }, [data?.pages, setIsSubscribing]);

  if (isError) {
    if ((error as { status?: number })?.status === 401) {
      return (
        <div className="h-screen flex items-center justify-center">
          <GuideLogin />
        </div>
      );
    }
    console.log("다시 시도해주세요.");
    return;
  }

  if (!isLogin) {
    return (
      <div className="h-screen flex items-center justify-center">
        <GuideLogin />
      </div>
    );
  }

  const formatDate = (dateString: string) => {
    return dateString.split("T")[0].replace(/-/g, ".");
  };

  return (
    <div
      className={`bg-white-200 px-5 pt-6 w-full max-w-content min-h-full absolute ${
        isSubscribing ? "pb-36" : "pb-navbar"
      }`}
    >
      <div className="w-full flex flex-col gap-6">
        <div className="w-full flex justify-between items-center">
          <h1 className="text-25px font-extrabold">구매 내역</h1>
          <Toggle
            items={[
              { label: "전체", onClick: handleAllClick },
              { label: "요금제", onClick: handlePlanClick },
              { label: "코인", onClick: handleCoinClick },
            ]}
          />
        </div>
        {isPending ? (
          <div className="w-full flex flex-col justify-center gap-3">
            <SkeletonPaymentCard />
          </div>
        ) : (
          <div className="w-full flex flex-col justify-center items-center gap-1">
            {data?.pages.every((page) => page.data.length === 0) ? (
              <p className="text-gray-500 text-14px mt-10">구매 내역이 존재하지 않습니다.</p>
            ) : (
              data?.pages.map((page, pageIndex) => (
                <div key={pageIndex} className="w-full flex flex-col gap-3">
                  {page.data.map((item: TPayHistoryItem) => (
                    <PaymentCard
                      key={item.id}
                      color={item.planType === "NONE" ? "skyBlue" : "white"}
                      title={
                        item.planType === "NONE" ? (
                          <CoinTitle text={item.coinCount} />
                        ) : (
                          item.planType
                        )
                      }
                      content={`${item.price.toLocaleString()}원  |  ${formatDate(item.createdAt)}`}
                    />
                  ))}
                </div>
              ))
            )}
            <div ref={ref} />
          </div>
        )}
      </div>
      {isSubscribing ? (
        <button
          className="w-[340px] h-[51px] blueButton bottom-navbar fixed left-0 right-0 mx-auto"
          onClick={handleModalOpen}
        >
          정기 구독 해지하기
        </button>
      ) : null}

      {isModalOpen && (
        <Modal
          isOpen={isModalOpen}
          onClose={handleCloseModal}
          onSuccess={isCompleted ? handleCloseModal : handleCompleteDeactivate}
          title={isCompleted ? "구독 해지가 완료되었습니다." : "구독을 해지하시겠습니까?"}
          btn1Text={isCompleted ? null : "아니요"}
          btn2Text={isCompleted ? "확인" : "네"}
        />
      )}
    </div>
  );
}

const CoinTitle = ({ text }: { text: number }) => (
  <div className="w-full flex justify-center items-center gap-1">
    <IcEmptyDollarBlue className="w-[17px] h-[17px]" />
    <span>{text} 코인</span>
  </div>
);

export default PayHistory;
