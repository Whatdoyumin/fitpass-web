import { useSearchParams } from "react-router-dom";
import { useGetUsageHistory } from "../../../hooks/useGetOwnerHistory";
import { LoadingSpinner } from "../../../components/LoadingSpinner";
import NotFound from "../../NotFound";
import { Pagination } from "../../../components/Pagination";
import { formatDate } from "../../../utils/formatDate";

function maskName(name: string) {
  if (name.length < 2) return name;
  return name[0] + "*" + name.slice(2);
}

function maskLoginId(id: string) {
  if (id.length <= 3) return "***";
  return id.slice(0, id.length - 3) + "***";
}

function UsageHistory() {
  const fitnessId = "1"; // TODO: replace with real fitnessId from store/context

  const [searchParams, setSearchParams] = useSearchParams();
  const currentPage = Number(searchParams.get("page")) || 1;
  const itemsPerPage = 10;

  const { data, isLoading, isError } = useGetUsageHistory(fitnessId, currentPage - 1, itemsPerPage);

  type UsageDetail = {
    memberName: string;
    loginId: string;
    activeTime: string;
    totalFee: number;
  };

  const usageData: UsageDetail[] = data?.fitnessUsageDetailDTOS ?? [];

  if (isLoading) return <LoadingSpinner />;
  if (isError) return <NotFound />;

  const totalPages = data?.totalPage ?? 1;

  const handlePageChange = (page: number) => {
    setSearchParams({ page: (page + 1).toString() });
  };

  return (
    <div className="bg-white-200 flex flex-col items-center min-h-[calc(100vh-165px)] overflow-y-auto px-[25px] pt-[24px] pb-[25px]">
      <div className="w-[340px] h-[617px] bg-white-100 rounded-7 flex flex-col divide-y divide-white-200">
        {usageData.map((item, idx) => (
          <div key={idx} className="flex justify-between items-center p-4 text-[16px]">
            <div className="flex flex-col gap-[3px]">
            <p>{maskName(item.memberName)}({maskLoginId(item.loginId)})</p>
              <p className="text-[12px]">{formatDate(item.activeTime)}</p>
            </div>
            <p>{item.totalFee.toLocaleString()} 코인</p>
          </div>
        ))}
      </div>
      <Pagination totalPages={totalPages} currentPage={currentPage - 1} onPageChange={handlePageChange} />
    </div>
  );
}

export default UsageHistory;
