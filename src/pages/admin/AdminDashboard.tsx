import { useState, useEffect } from "react";
import { axiosInstance } from "../../apis/axios-instance";
import config from "../../apis/config";
import { useQuery } from "@tanstack/react-query";
import { Pagination } from "../../components/Pagination";
import { LoadingSpinner } from "../../components/LoadingSpinner";
import NotFound from "../NotFound";

type TDashboardData = {
  newMemberCount: number;
  visitant: number;
  pageView: number;
  buyPass: number;
  usePass: number;
  date: string;
};

type DashboardResponse = {
  result: {
    items: TDashboardData[];
    pageNo: number;
    size: number;
    totalPage: number;
  };
};

function AdminDashboard() {
  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = 10;

  const fetchDashboard = async ({ queryKey }: { queryKey: [string, number] }) => {
    const [, page] = queryKey;
    const params = { page: page + 1, size: itemsPerPage }; // ✅ API에서 페이지가 1부터 시작하므로 요청 시 +1
    const response = await axiosInstance.get<DashboardResponse>(`${config.apiBaseUrl}/admin/dashboard`, { params });
    return response.data;
  };

  const { data, isLoading, isError } = useQuery({
    queryKey: ["dashboard", currentPage],
    queryFn: fetchDashboard,
  });

  useEffect(() => {
    if (data?.result?.pageNo !== undefined) {
      setCurrentPage(data.result.pageNo - 1);
    }
  }, [data]);

  const dashboardData = data?.result?.items || [];
  const totalPages = data?.result?.totalPage || 1;

  if (isLoading) return <LoadingSpinner />;
  if (isError) return <NotFound />;

  return (
    <div className="w-full h-full px-[7px]">
      <h1 className="adminTitle">대시보드</h1>

      <p className="text-[14px] mt-[64px] mb-[10px] h-[25px]">일자별 분석</p>
      <div className="min-h-[580px]">
        <table className="w-full h-full border-collapse border border-gray-450">
          <thead className="bg-blue-100 text-[13px] text-center h-[49px] border-b border-gray-450">
            <tr>
              <th className="w-[200px] font-medium">일자</th>
              <th className="w-[9px]"></th> {/* 사이 간격 */}
              <th className="w-[160px] font-medium">신규 회원</th>
              <th className="w-[4px]"></th>
              <th className="w-[180px] font-medium">방문자</th>
              <th className="w-[180px] font-medium">페이지 뷰</th>
              <th className="w-[180px] font-medium">패스 구매</th>
              <th className="w-[180px] font-medium">패스 사용</th>
            </tr>
          </thead>
          <tbody className="text-[12px] text-center">
            {dashboardData.map((row: TDashboardData, index: number) => (
              <tr key={index} className={`h-[50px] ${index !== dashboardData.length - 1 ? "border-b border-gray-450" : ""}`}>
                <td className="w-[200px]">{row.date}</td>
                <td className="w-[9px]"></td>
                <td className="w-[160px]">{row.newMemberCount}</td>
                <td className="w-[4px]"></td>
                <td className="w-[180px]">{row.visitant}</td>
                <td className="w-[180px]">{row.pageView}</td>
                <td className="w-[180px]">{row.buyPass}</td>
                <td className="w-[180px]">{row.usePass}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {totalPages > 1 && (
        <Pagination
          totalPages={totalPages}
          currentPage={currentPage}
          onPageChange={setCurrentPage}
        />
      )}
    </div>
  );
}

export default AdminDashboard;
