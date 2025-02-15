import { useState } from "react";
import { SearchGray } from "../../../assets/svg";
import DotVector from "../../../assets/img/Vector.png"
import Dropdown from "./Dropdown";
import { axiosInstance } from "../../../apis/axios-instance";
import config from "../../../apis/config";
import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";

type TListData = {
  fitnessId: number;
  fitnessName: string;
  categoryNames: string[];
  totalFee: number;
  phoneNumber: string;
  createdAt: string;
  editDate?: string;
  status: boolean;
}

type FitnessParams = {
  page?: number;
  size?: number;
  searchType?: string;
  keyword?: string;
}

function AdminFitnessList() {

  const [searchTerm, setSearchTerm] = useState("");  // 검색 데이터
  const [selectedFilter, setSelectedFilter] = useState<keyof TListData>("fitnessName");
  const [page, setPage] = useState(0);

  const dropDownMap: Record<string, keyof TListData> = {
    "업체명": "fitnessName",
    "이용 종목": "categoryNames",
    "전화번호": "phoneNumber",
  };

  const handleDropdownSelect = (item: string) => {
    setSelectedFilter(dropDownMap[item])
  };

  // api 연결
  const fetchFitness = async () => {
    const params: FitnessParams = {
      page: page,
      size: 10,
      searchType: selectedFilter,
      keyword: searchTerm
    }
    const response = await axiosInstance.get(`${config.apiBaseUrl}/admin/fitness`, { params });
    return response.data;
  };

  const { data } = useQuery({
    queryKey: ['fitnessList', page, selectedFilter, searchTerm],
    queryFn: fetchFitness,
  })

  console.log(data);

  const listData = data?.result?.fitnessList;
  const totalPages = data?.result?.totalPages;

  // 검색 필터링
  const filteredListData = (listData ?? []).filter((info: TListData) => {
    const value = info[selectedFilter];
  
    if (Array.isArray(value)) {
      return value.join(", ").toLowerCase().includes(searchTerm.toLowerCase());
    }
  
    return value?.toString().toLowerCase().includes(searchTerm.toLowerCase());
  });
  
  const navigate = useNavigate();

  return (
    <div className="w-full h-full overflow-y-auto">
      <h1 className="mb-[50px] font-bold text-[18px] ">피트니스 센터 → 시설 목록</h1>
      <div className="flex justify-end gap-2">
        <Dropdown onSelect={handleDropdownSelect} />
        <div className="flex relative">
          <input 
            value={searchTerm}
            type="text"
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-[345px] h-[48px] border border-gray-450 rounded-[6px] focus:outline-none pl-2"/>
          <SearchGray className="w-[24px] absolute right-3 top-1/2 -translate-y-1/2"/>
        </div>
      </div>

      <div className="font-medium text-[13px] mt-[20px] text-black-700">
        <table className="w-full table-fixed">
          <thead className="w-full h-[50px] border bg-blue-100 border border-gray-450 text-left">
            <tr>
              <th className="text-center w-[44px]">순번</th>
              <th className="w-[90px] ">업체명</th>
              <th className="w-[90px]">이용 종목</th>
              <th className="w-[70px] ">가격</th>
              <th className="w-[115px] ">전화번호</th>
              <th className="w-[114px] ">가입일</th>
              <th className="w-[114px] ">접속일</th>
              <th className="w-[90px] ">상태</th>
              <th className="w-[20px] "></th>
            </tr>
          </thead>
          <tbody>
            {filteredListData &&
              (filteredListData.map((item: TListData, index: number) => (
                <tr key={item.fitnessId} className="w-full h-[50px] gap-2 border border-gray-450 text-left">
                  <td className="text-center">{index + 1}</td> 
                  <td>{item.fitnessName}</td>
                  <td>{item.categoryNames.join(", ")}</td>
                  <td>{item.totalFee}코인</td>
                  <td>{item.phoneNumber}</td>
                  <td>{item.createdAt.split("T")[0]}</td>
                  <td>{item.editDate}</td>
                  {item.status ? (<td>구매 가능</td>) : (<td>구매 불가</td>)}
                  <td><img src={DotVector} alt="더보기"
                    onClick={() => navigate(`/admin/fitness/upload/${item.fitnessId}`)}
                  /></td>
                </tr>
              )))}
          </tbody>
        </table>

        {/* pagination */}
        <div className="w-full mt-3 flex justify-center text-gray-350 font-medium text-[14px] ">
          <button
            disabled={page === 0}
            onClick={() => setPage((prev) => Math.max(prev - 1, 0))}
          >&lt;</button>
          {Array.from({ length: totalPages }, (_, index) => index + 1).map((pageNum) => (
            <button 
              key={pageNum}
              onClick={() => setPage(pageNum - 1)}
              className={`mx-2 ${page === pageNum - 1 ? 'text-gray-600' : ''}`}
            >{pageNum}</button>
          ))}
          <button
            disabled={page === totalPages - 1}
            onClick={() => setPage((prev) => Math.min(prev + 1, totalPages - 1))}
          >&gt;</button>
        </div>
      </div>
    </div>
  );
}

export default AdminFitnessList;
