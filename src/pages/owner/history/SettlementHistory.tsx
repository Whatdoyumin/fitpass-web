import { useGetMonthHistory } from "../../../hooks/useGetOwnerHistory";
import { LoadingSpinner } from "../../../components/LoadingSpinner";
import NotFound from "../../NotFound";
import { useSearchParams } from "react-router-dom";
import { formatDate } from "../../../utils/formatDate";
import { Pagination } from "../../../components/Pagination";

function SettlementHistory() {
  const fitnessId = "1"; // TODO: replace with real fitnessId from store/context

  const [searchParams, setSearchParams] = useSearchParams();
  const currentPage = Number(searchParams.get("page")) || 1;
  const itemsPerPage = 10;

  const { data, isLoading, isError } = useGetMonthHistory(fitnessId, currentPage - 1, itemsPerPage);

  if (isLoading) return <LoadingSpinner />;
  if (isError) return <NotFound />;

  interface Settlement {
    description: string;
    time: string;
    totalPrice: number;
  }

  const settlements: Settlement[] = data?.revenueHistoryDetailDTOS ?? [];
  const totalPages = data?.totalPage ?? 1;

  const handlePageChange = (page: number) => {
    setSearchParams({ page: (page + 1).toString() });
  };

  return (
    <div className="bg-white-200 flex flex-col items-center min-h-[calc(100vh-165px)] overflow-y-auto px-[25px] pt-[24px] pb-[25px]">
      <div className="w-[340px] h-[617px] bg-white-100 rounded-7 flex flex-col divide-y divide-white-200">
        {settlements.map((item, idx) => (
          <div key={idx} className="flex justify-between items-center p-4 text-[16px]">
            <div className="flex flex-col gap-[3px]">
              <p>{item.description}월 정산</p>
              <p className="text-[12px]">{formatDate(item.time)}</p>
            </div>
            <p>{item.totalPrice.toLocaleString()}원</p>
          </div>
        ))}
      </div>

      <Pagination
        totalPages={totalPages}
        currentPage={currentPage - 1}
        onPageChange={handlePageChange}
      />
    </div>
  );
}

export default SettlementHistory;
