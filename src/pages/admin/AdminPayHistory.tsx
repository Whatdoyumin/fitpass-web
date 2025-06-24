import { useState } from "react";
import { Toggle } from "../../components/paymentCard/Toggle";
import SearchBar from "../../components/adminCommon/SearchBar";
import { useGetAdminPayHistory } from "../../hooks/useGetAdminPayHistory";
import { Pagination } from "../../components/Pagination";
import {
  TAdminPayHistory,
  TAdminPayHistoryResponse,
  TPayHistoryType,
} from "../../types/adminPayHistory";

function AdminPayHistory() {
  const [type, setType] = useState<TPayHistoryType>("코인");
  const [searchValue, setSearchValue] = useState("");
  const [searchQuery, setSearchQuery] = useState<string | null>(null);
  const [page, setPage] = useState(0);

  const handleCoinClick = () => {
    setType("코인");
    setSearchQuery(null);
    setPage(0);
    setSearchValue("");
  };

  const query: TAdminPayHistory = {
    type,
    size: 10,
    page,
    ...(searchQuery ? { memberName: searchQuery } : {}),
  };

  const { data } = useGetAdminPayHistory(query);

  const handleSearch = () => {
    setSearchQuery(searchValue.trim() || null);
    setPage(0);
  };

  return (
    <div className="w-full h-full overflow-y-auto">
      <div className="w-full flex flex-col gap-10">
        <h1 className="adminTitle">결제 → 구매 내역</h1>
        <div className="w-full flex flex-col gap-5">
          <div className="flex justify-between items-center">
            <Toggle items={[{ label: "코인", onClick: handleCoinClick }]} />
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
                <th>{type === "코인" ? "이메일" : "계정"}</th>
                <th>전화번호</th>
                <th>{type === "코인" ? "결제일" : "구매일"}</th>

                <>
                  <th>결제 플랜</th>
                  <th>결제 금액 (원)</th>
                </>
              </tr>
            </thead>
            <tbody className="text-12px">
              {data?.result?.content?.map((entry: TAdminPayHistoryResponse, index: number) => (
                <tr key={entry.id} className="border-t border-gray-300 h-12">
                  <td className="text-center">{index + 1 + page * 10}</td>
                  <td className="text-center">{entry.memberName}</td>
                  <td>{entry.account}</td>
                  <td>{entry.phoneNumber.replace(/(\d{3})(\d{4})(\d{4})/, "$1-$2-$3")}</td>
                  <td>{new Date(entry.createdAt).toLocaleString()}</td>
                  <>
                    <td>{entry.planType}</td>
                    <td>{entry.price?.toLocaleString()} 원</td>
                  </>
                </tr>
              ))}
              {data?.result?.content?.length === 0 && searchQuery && (
                <tr>
                  <td colSpan={type === "코인" ? 7 : 8} className="text-center py-4 text-gray-500">
                    검색 결과가 없습니다.
                  </td>
                </tr>
              )}
            </tbody>
          </table>

          {data?.result?.totalPages > 1 && (
            <Pagination
              totalPages={data.result.totalPages}
              currentPage={page}
              onPageChange={setPage}
            />
          )}
        </div>
      </div>
    </div>
  );
}

export default AdminPayHistory;
