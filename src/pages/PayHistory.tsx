import { useState } from "react";
import { IcEmptyDollarBlue } from "../assets/svg";
import { PaymentCard } from "../components/paymentCard/PaymentCard";
import { Toggle } from "../components/paymentCard/Toggle";

function PayHistory() {
  const [filteredItems, setFilteredItems] = useState(items);

  const handleAllClick = () => setFilteredItems(items);
  const handlePlanClick = () => setFilteredItems(items.filter((item) => item.planType !== "NONE"));
  const handleCoinClick = () => setFilteredItems(items.filter((item) => item.planType === "NONE"));

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
        <div className="flex flex-col gap-3">
          {filteredItems.map((item) => (
            <PaymentCard
              key={item.id}
              color={item.planType === "NONE" ? "skyBlue" : "white"}
              title={item.planType === "NONE" ? <CoinTitle text={item.coinCount} /> : item.planType}
              content={`${item.price.toLocaleString()}원  |  ${formatDate(item.createdAt)}`}
            />
          ))}
        </div>
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

const items = [
  {
    id: 17,
    planType: "NONE",
    isAgree: true,
    coinCount: 1,
    price: 550,
    createdAt: "2025-01-24T08:13:35.906202",
  },
  {
    id: 31,
    planType: "NONE",
    isAgree: true,
    coinCount: 1,
    price: 550,
    createdAt: "2025-01-24T08:13:35.906202",
  },
  {
    id: 30,
    planType: "NONE",
    isAgree: true,
    coinCount: 1,
    price: 550,
    createdAt: "2025-01-24T08:13:35.906202",
  },
  {
    id: 29,
    planType: "NONE",
    isAgree: true,
    coinCount: 1,
    price: 550,
    createdAt: "2025-01-24T08:13:35.906202",
  },
  {
    id: 27,
    planType: "BASIC",
    isAgree: true,
    coinCount: 1,
    price: 50000,
    createdAt: "2025-01-24T08:13:35.906202",
  },
  {
    id: 26,
    planType: "PRO",
    isAgree: true,
    coinCount: 1,
    price: 70000,
    createdAt: "2025-01-24T08:13:35.906202",
  },
  {
    id: 25,
    planType: "BASIC",
    isAgree: true,
    coinCount: 1,
    price: 50000,
    createdAt: "2025-01-24T08:13:35.906202",
  },
  {
    id: 24,
    planType: "NONE",
    isAgree: true,
    coinCount: 1,
    price: 550,
    createdAt: "2025-01-24T08:13:35.906202",
  },
  {
    id: 23,
    planType: "NONE",
    isAgree: true,
    coinCount: 1,
    price: 550,
    createdAt: "2025-01-24T08:13:35.906202",
  },
  {
    id: 22,
    planType: "NONE",
    isAgree: true,
    coinCount: 1,
    price: 550,
    createdAt: "2025-01-24T08:13:35.906202",
  },
  {
    id: 21,
    planType: "NONE",
    isAgree: true,
    coinCount: 1,
    price: 550,
    createdAt: "2025-01-24T08:13:35.906202",
  },
  {
    id: 20,
    planType: "NONE",
    isAgree: true,
    coinCount: 1,
    price: 550,
    createdAt: "2025-01-24T08:13:35.906202",
  },
  {
    id: 19,
    planType: "NONE",
    isAgree: true,
    coinCount: 1,
    price: 550,
    createdAt: "2025-01-24T08:13:35.906202",
  },
  {
    id: 18,
    planType: "NONE",
    isAgree: true,
    coinCount: 1,
    price: 550,
    createdAt: "2025-01-24T08:13:35.906202",
  },
  {
    id: 3,
    planType: "NONE",
    isAgree: true,
    coinCount: 1,
    price: 550,
    createdAt: "2025-01-24T08:13:35.906202",
  },
  {
    id: 16,
    planType: "NONE",
    isAgree: true,
    coinCount: 1,
    price: 550,
    createdAt: "2025-01-24T08:13:35.906202",
  },
  {
    id: 15,
    planType: "NONE",
    isAgree: true,
    coinCount: 1,
    price: 550,
    createdAt: "2025-01-24T08:13:35.906202",
  },
  {
    id: 14,
    planType: "NONE",
    isAgree: true,
    coinCount: 1,
    price: 550,
    createdAt: "2025-01-24T08:13:35.906202",
  },
  {
    id: 13,
    planType: "NONE",
    isAgree: true,
    coinCount: 1,
    price: 550,
    createdAt: "2025-01-24T08:13:35.906202",
  },
  {
    id: 12,
    planType: "NONE",
    isAgree: true,
    coinCount: 1,
    price: 550,
    createdAt: "2025-01-24T08:13:35.906202",
  },
  {
    id: 11,
    planType: "NONE",
    isAgree: true,
    coinCount: 1,
    price: 550,
    createdAt: "2025-01-24T08:13:35.906202",
  },
  {
    id: 10,
    planType: "NONE",
    isAgree: true,
    coinCount: 1,
    price: 550,
    createdAt: "2025-01-24T08:13:35.906202",
  },
  {
    id: 9,
    planType: "NONE",
    isAgree: true,
    coinCount: 1,
    price: 550,
    createdAt: "2025-01-24T08:13:35.906202",
  },
  {
    id: 8,
    planType: "NONE",
    isAgree: true,
    coinCount: 1,
    price: 5500,
    createdAt: "2025-01-24T08:13:35.906202",
  },
  {
    id: 7,
    planType: "NONE",
    isAgree: true,
    coinCount: 1,
    price: 2750,
    createdAt: "2025-01-24T08:13:35.906202",
  },
  {
    id: 6,
    planType: "NONE",
    isAgree: true,
    coinCount: 1,
    price: 11000,
    createdAt: "2025-01-24T08:13:35.906202",
  },
  {
    id: 5,
    planType: "NONE",
    isAgree: true,
    coinCount: 1,
    price: 0,
    createdAt: "2025-01-24T08:13:35.906202",
  },
  {
    id: 4,
    planType: "NONE",
    isAgree: true,
    coinCount: 1,
    price: 0,
    createdAt: "2025-01-24T08:13:35.906202",
  },
];

export default PayHistory;
