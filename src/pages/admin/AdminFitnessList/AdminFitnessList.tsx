import { useEffect, useState } from "react";
import { SearchGray } from "../../../assets/svg";
import Dropdown from "./Dropdown";
import FitnessRowDropdown from "./FitnessRowDropdown";
import { axiosInstance } from "../../../apis/axios-instance";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { Pagination } from "../../../components/Pagination";
import { LoadingSpinner } from "../../../components/LoadingSpinner";
import NotFound from "../../NotFound";

type TListData = {
  fitnessId: number;
  fitnessName: string;
  categoryNames: string[];
  totalFee: number;
  phoneNumber: string;
  createdAt: string;
  purchasable: boolean;
};

type FitnessParams = {
  page?: number;
  size?: number;
  searchType?: string;
  keyword?: string;
};

function AdminFitnessList() {
  const [searchInput, setSearchInput] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedFilterLabel, setSelectedFilterLabel] = useState("업체명");
  const [selectedFilter, setSelectedFilter] = useState<keyof TListData>("fitnessName");
  const [page, setPage] = useState(0);

  const queryClient = useQueryClient();

  const dropDownMap: Record<string, keyof TListData> = {
    업체명: "fitnessName",
    "이용 종목": "categoryNames",
    전화번호: "phoneNumber",
  };

  const handleDropdownSelect = (label: string) => {
    setSelectedFilterLabel(label);
    setSelectedFilter(dropDownMap[label]);
    setPage(0);
  };

  const handleDataChange = () => {
    queryClient.invalidateQueries({ queryKey: ["fitnessList"] });
  };

  // 디바운싱
  useEffect(() => {
    const debounce = setTimeout(() => {
      setSearchTerm(searchInput);
      setPage(0);
    }, 500);

    return () => clearTimeout(debounce);
  }, [searchInput]);

  const fetchFitness = async () => {
    const params: FitnessParams = {
      page,
      size: 10,
      searchType: selectedFilter,
      keyword: searchTerm,
    };
    const response = await axiosInstance.get(`/admin/fitness`, { params });
    return response.data;
  };

  const { data, isFetching, isError } = useQuery({
    queryKey: ["fitnessList", page, selectedFilter, searchTerm],
    queryFn: fetchFitness,
  });

  if (isFetching) return <LoadingSpinner />;
  if (isError) return <NotFound />;

  const listData = data?.result?.fitnessList;
  const totalPages = data?.result?.totalPages;

  const filteredListData = (listData ?? []).filter((info: TListData) => {
    const value = info[selectedFilter];
    if (Array.isArray(value)) {
      return value.join(", ").toLowerCase().includes(searchTerm.toLowerCase());
    }
    return value?.toString().toLowerCase().includes(searchTerm.toLowerCase());
  });

  return (
    <div className="w-full h-full overflow-y-auto">
      <h1 className="mb-[50px] font-bold text-[18px]">피트니스 센터 → 시설 목록</h1>

      <div className="flex justify-end gap-2">
        <Dropdown selectedItem={selectedFilterLabel} onSelect={handleDropdownSelect} />

        <div className="flex relative">
          <input
            value={searchInput}
            type="text"
            onChange={(e) => setSearchInput(e.target.value)}
            className="w-[345px] h-[48px] border border-gray-450 rounded-[6px] focus:outline-none pl-2"
            placeholder="검색어 입력"
          />
          <SearchGray className="w-[24px] absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer" />
        </div>
      </div>

      <div className="min-h-[500px] font-medium text-[13px] mt-[20px] text-black-700">
        <table className="w-full table-fixed">
          <thead className="w-full h-[50px] bg-blue-100 border border-gray-450 text-left">
            <tr>
              <th className="text-center w-[44px]">순번</th>
              <th className="w-[90px]">업체명</th>
              <th className="w-[90px]">이용 종목</th>
              <th className="w-[70px]">가격</th>
              <th className="w-[115px]">전화번호</th>
              <th className="w-[114px]">가입일</th>
              <th className="w-[90px]">상태</th>
              <th className="w-[20px]"></th>
            </tr>
          </thead>
          <tbody>
            {filteredListData.map((item: TListData, index: number) => (
              <tr
                key={item.fitnessId}
                className="w-full h-[50px] gap-2 border border-gray-450 text-left"
              >
                <td className="text-center">{index + 1}</td>
                <td>{item.fitnessName}</td>
                <td>{item.categoryNames.join(", ")}</td>
                <td>{item.totalFee}코인</td>
                <td>{item.phoneNumber}</td>
                <td>{item.createdAt.split("T")[0]}</td>
                <td>{item.purchasable ? "구매 가능" : "구매 불가"}</td>
                <td className="relative">
                  <FitnessRowDropdown 
                    fitnessId={item.fitnessId} 
                    onDataChange={handleDataChange}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {totalPages > 1 && (
          <Pagination totalPages={totalPages} currentPage={page} onPageChange={setPage} />
        )}
      </div>
    </div>
  );
}

export default AdminFitnessList;
