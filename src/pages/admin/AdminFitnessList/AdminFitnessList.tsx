import { useState } from "react";
import { SearchGray } from "../../../assets/svg";
import DotVector from "../../../assets/img/Vector.png"
import Dropdown from "./Dropdown";

type TListData = {
  fitnessId: number;
  fitnessName: string;
  categoryName: string[];
  fee: number;
  phoneNumber: string;
  joinDate: string;
  editDate: string;
  status: string;
}

const dummyData: TListData[] = [
  {
    fitnessId: 1,
    fitnessName: "00 피트니스",
    categoryName: ["헬스, 필라테스"],
    fee: 10,
    phoneNumber: "010-1234-5678",
    joinDate: "2024-01-15",
    editDate: "2024-02-10",
    status: "구매 가능",
  },
  {
    fitnessId: 2,
    fitnessName: "00 헬스장",
    categoryName: ["헬스"],
    fee: 5,
    phoneNumber: "010-5678-1234",
    joinDate: "2023-12-01",
    editDate: "2024-01-20",
    status: "구매 불가",
  },
];


function AdminFitnessList() {

  const [searchTerm, setSearchTerm] = useState("");  // 검색 데이터
  const [selectedFilter, setSelectedFilter] = useState<keyof TListData>("fitnessName");

  const dropDownMap: Record<string, keyof TListData> = {
    "업체명": "fitnessName",
    "이용 종목": "categoryName",
    "전화번호": "phoneNumber",
  };

  const handleDropdownSelect = (item: string) => {
    setSelectedFilter(dropDownMap[item])
  };

  const filteredData = dummyData.filter((info) => 
    info[selectedFilter].toString().toLowerCase().includes(searchTerm.toLowerCase())
  )

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
            {filteredData.map((item, index) => (
              <tr key={index} className="w-full h-[50px] gap-2 border border-gray-450 text-left">
                <td className="text-center">{item.fitnessId}</td> 
                <td>{item.fitnessName}</td>
                <td>{item.categoryName}</td>
                <td>{item.fee}코인</td>
                <td>{item.phoneNumber}</td>
                <td>{item.joinDate}</td>
                <td>{item.editDate}</td>
                <td>{item.status}</td>
                <td><img src={DotVector} alt="더보기" /></td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* pagination */}
      </div>
    </div>
  );
}

export default AdminFitnessList;
