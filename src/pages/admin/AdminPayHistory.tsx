import { useState } from "react";
import { TPayQuery } from "../../types/payHistory";
import { Toggle } from "../../components/paymentCard/Toggle";
import SearchBar from "../../components/adminCommon/SearchBar";

function AdminPayHistory() {
  const [query, setQuery] = useState<TPayQuery>("COIN");
  const [searchValue, setSearchValue] = useState("");
  const [searchQuery, setSearchQuery] = useState("");

  const handlePlanClick = () => {
    setQuery("PLAN");
    setSearchQuery("");
  };

  const handleCoinClick = () => {
    setQuery("COIN");
    setSearchQuery("");
  };

  const handleSearch = () => {
    setSearchQuery(searchValue.trim());
  };

  const getPlanTypeLabel = (planType: string, coinCount: number) => {
    if (planType === "NONE") return `${coinCount} 코인`;
    const planLabels: { [key: string]: string } = {
      BASIC: "베이직",
      STANDARD: "스탠다드",
      PRO: "프로",
    };
    return planLabels[planType] || planType;
  };

  const filteredData = mockData
    .filter((data) => (query === "COIN" ? data.planType === "NONE" : data.planType !== "NONE"))
    .filter((data) => (searchQuery ? data.name.includes(searchQuery) : true));

  return (
    <div className="w-full h-full overflow-y-auto">
      <div className="flex flex-col gap-10">
        <h1 className="adminTitle">결제 → 구매 내역</h1>
        <div className="flex flex-col gap-5">
          <div className="flex justify-between items-center">
            <Toggle
              items={[
                { label: "코인", onClick: handleCoinClick },
                { label: "플랜", onClick: handlePlanClick },
              ]}
            />
            <div className="flex gap-4">
              <SearchBar
                onSearch={handleSearch}
                searchValue={searchValue}
                setSearchValue={setSearchValue}
              />
            </div>
          </div>

          <table className="text-left border border-gray-300 px-4 w-full">
            <thead className="h-[50px] text-13px text-black-700 bg-blue-100 font-light">
              <tr>
                <th className="text-center w-16">순번</th>
                <th className="text-center w-32">회원명</th>
                <th>이메일</th>
                <th>전화번호</th>
                <th>결제일</th>
                <th>결제 플랜</th>
                <th>결제 금액 (원)</th>
              </tr>
            </thead>
            <tbody className="text-12px">
              {filteredData.map((data, index) => (
                <tr key={data.id} className="border-t border-gray-300 h-12">
                  <td className="text-center">{index + 1}</td>
                  <td className="text-center">{data.name}</td>
                  <td>{data.email}</td>
                  <td>{data.phone}</td>
                  <td>{data.createdAt}</td>
                  <td>{getPlanTypeLabel(data.planType, data.coinCount)}</td>
                  <td>{data.amount.toLocaleString()} 원</td>
                </tr>
              ))}
              {filteredData.length === 0 && (
                <tr>
                  <td colSpan={7} className="text-center py-4 text-gray-500">
                    검색 결과가 없습니다.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

const mockData = [
  {
    id: 1,
    name: "홍길동",
    email: "hong@example.com",
    phone: "010-1234-5678",
    createdAt: "2025-01-10",
    planType: "BASIC",
    amount: 10000,
    coinCount: 95,
  },
  {
    id: 2,
    name: "김영희",
    email: "kim@example.com",
    phone: "010-2345-6789",
    createdAt: "2025-02-05",
    planType: "PRO",
    amount: 30000,
    coinCount: 200,
  },
  {
    id: 3,
    name: "이철수",
    email: "lee@example.com",
    phone: "010-3456-7890",
    createdAt: "2025-02-10",
    planType: "STANDARD",
    amount: 20000,
    coinCount: 135,
  },
  {
    id: 4,
    name: "이유민",
    email: "lee2@example.com",
    phone: "010-3256-7390",
    createdAt: "2025-02-12",
    planType: "NONE",
    amount: 5500,
    coinCount: 10,
  },
];

export default AdminPayHistory;
