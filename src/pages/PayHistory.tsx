import { useEffect, useState } from "react";
import { IcEmptyDollarBlue } from "../assets/svg";
import { PaymentCard } from "../components/paymentCard/PaymentCard";
import { Toggle } from "../components/paymentCard/Toggle";
import { useGetPayHistory } from "../hooks/useGetPayHistory";
import { useInView } from "react-intersection-observer";
import { GuideLogin } from "./GuideLogin";
import { TPayHistoryItem, TPayQuery } from "../type/payHistory";
import { useAuth } from "../context/AuthContext";
import SkeletonPaymentCard from "./../components/paymentCard/SkeletonPaymentCard";

function PayHistory() {
  const [query, setQuery] = useState<TPayQuery>("ALL");
  const { isLogin } = useAuth();

  const { data, isFetching, hasNextPage, fetchNextPage, isPending, isError, error } =
    useGetPayHistory(query);

  const handleAllClick = () => setQuery("ALL");
  const handlePlanClick = () => setQuery("PLAN");
  const handleCoinClick = () => setQuery("COIN");

  const { ref, inView } = useInView({ threshold: 0 });

  useEffect(() => {
    if (inView && hasNextPage && !isFetching) {
      fetchNextPage();
    }
  }, [inView, hasNextPage, isFetching, fetchNextPage]);

  if (isError) {
    if ((error as { status?: number })?.status === 401) {
      return (
        <div className="h-screen flex items-center justify-center">
          <GuideLogin />
        </div>
      );
    }
    alert("다시 시도해주세요.");
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
    <div className="w-full h-full overflow-y-auto px-4 py-6 bg-white-200">
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
            {data?.pages.map((page, pageIndex) => (
              <>
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
                <div ref={ref} />
              </>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

const CoinTitle = ({ text }: { text: number }) => (
  <div className="w-20 flex justify-center items-center gap-1">
    <IcEmptyDollarBlue className="w-[17px] h-[17px]" />
    <p>{text} 코인</p>
  </div>
);

export default PayHistory;
