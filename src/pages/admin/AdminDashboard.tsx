import { useState } from "react";
import SvgIcLeftPage from "../../assets/svg/IcLeftPage";
import SvgIcRightPage from "../../assets/svg/IcRightPage";
import { axiosInstance } from "../../apis/axios-instance";
import config from "../../apis/config";
import { useQuery } from "@tanstack/react-query";

type TDashboardData = {
  newMemberCount: number;
  visitant: number;
  pageView: number;
  buyPass: number;
  usePass: number;
  date: string;
};

type DashboardParams = {
  page?: number;
  size?: number;
};

function AdminDashboard() {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const pagesPerGroup = 5;

  const fetchDashboard = async ({ queryKey }: { queryKey: [string, number] }) => {
    const [, page] = queryKey;
    const params: DashboardParams = {
      page,
      size: itemsPerPage,
    };
    const response = await axiosInstance.get(`${config.apiBaseUrl}/admin/dashboard`, { params });
    return response.data;
  };

  const { data, isLoading, isError } = useQuery({
    queryKey: ["dashboard", currentPage],
    queryFn: fetchDashboard,
  });

  const dashboardData = data?.result?.items || [];
  const totalPages = data?.result?.totalPage || 1;

  const currentGroup = Math.ceil(currentPage / pagesPerGroup);
  const startPage = (currentGroup - 1) * pagesPerGroup + 1;
  const endPage = Math.min(startPage + pagesPerGroup - 1, totalPages);

  const handlePageChange = (newPage: number) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };

  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Error loading data.</p>;

  return (
    <div className="w-full h-full px-[7px] overflow-y-auto">
      <h1 className="adminTitle">대시보드</h1>

      <p className="text-[14px] mt-[64px] mb-[10px] h-[25px]">일자별 분석</p>
      <div className="min-h-[550px] overflow-hidden">
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

      {/* 페이지네이션 */}
      <div className="w-full flex justify-center items-center pt-[40px] gap-[10px]">
        <button onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1} className="text-gray-350 focus:outline-none">
          <SvgIcLeftPage width={5} />
        </button>

        {Array.from({ length: endPage - startPage + 1 }, (_, index) => (
          <button
            key={startPage + index}
            onClick={() => handlePageChange(startPage + index)}
            className={`text-sm ${currentPage === startPage + index ? "text-gray-600" : "text-gray-350"} focus:outline-none`}
          >
            {startPage + index}
          </button>
        ))}

        <button onClick={() => handlePageChange(currentPage + 1)} disabled={currentPage === totalPages} className="text-gray-350 focus:outline-none">
          <SvgIcRightPage width={5} />
        </button>
      </div>
    </div>
  );
}

export default AdminDashboard;
