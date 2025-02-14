import { useState } from "react";

function AdminDashboard() {
  // mock data
  const [dashboardData, setDashboardData] = useState([
    { date: "2024-12-30", newUsers: 2, visitors: 30, pageViews: 200, passPurchases: 5, passUsage: 4 },
    { date: "2024-12-29", newUsers: 1, visitors: 25, pageViews: 180, passPurchases: 5, passUsage: 5 },
  ]);

  return (
    <div className="w-full h-full overflow-y-auto">
      <h1 className="adminTitle">대시보드</h1>

      <p className="text-[14px] mt-[64px] mb-[10px] h-[25px]">일자별 분석</p>
      <div className="w-[1120px] h-[150px] border border-gray-450 overflow-hidden">
        <table className="w-full h-full border-collapse">
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
          <tbody className="text-[12px] text-center h-[50px]">
            {dashboardData.map((row, index) => (
              <tr key={index} className={index !== dashboardData.length - 1 ? "border-b border-gray-450" : ""}>
                <td className="w-[200px]">{row.date}</td>
                <td className="w-[9px]"></td>
                <td className="w-[160px]">{row.newUsers}</td>
                <td className="w-[4px]"></td>
                <td className="w-[180px]">{row.visitors}</td>
                <td className="w-[180px]">{row.pageViews}</td>
                <td className="w-[180px]">{row.passPurchases}</td>
                <td className="w-[180px]">{row.passUsage}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default AdminDashboard;
