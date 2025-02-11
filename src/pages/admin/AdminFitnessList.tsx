import { useState } from "react";
import { ArrowDropDown, ArrowDropUp, SearchGray } from "../../assets/svg";
import DotVector from "../../assets/img/Vector.png"

type TListData = {
  fitnessId: number;
  fitnessName: string;
  categoryName: string;
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
    categoryName: "헬스, 필라테스",
    fee: 10,
    phoneNumber: "010-1234-5678",
    joinDate: "2024-01-15",
    editDate: "2024-02-10",
    status: "구매 가능",
  },
  {
    fitnessId: 2,
    fitnessName: "00 헬스장",
    categoryName: "헬스",
    fee: 5,
    phoneNumber: "010-5678-1234",
    joinDate: "2023-12-01",
    editDate: "2024-01-20",
    status: "구매 불가",
  },
]

function Dropdown() {

  const [adminDropdown, setAdminDropdown] = useState(false);
  const [selectedItem, setSelectedItem] = useState("업체명");

  const dropdown: string[] = ["업체명", "이용 종목", "전화번호"];

  const showDropdown = () => {
    setAdminDropdown(!adminDropdown);
  }

  const handleDropdownClick = (item: string) => {
    setAdminDropdown(false);
    setSelectedItem(item);
  }

  return(
    <div className="text-medium text-[12px]">
      <button
        onClick={showDropdown} 
        className="relative w-[89px] h-[48px] rounded-[6px] border border-gray-300 bg-gray-200">
      <div className="flex justify-evenly items-center">
        <span className="w-[49px] h-[14px]">{selectedItem}</span>
        <span className="w-5 h-5">{adminDropdown ? <ArrowDropUp /> : <ArrowDropDown />}</span>
      </div>
      </button>
      {adminDropdown ? (
        <div className="absolute flex flex-col w-[89px] h-[115px] rounded-[5px] justify-center bg-white-100 shadow-lg z-10">
          {dropdown.map((item, index) => (
            <button 
              key={index} 
              value={item}
              onClick={() => handleDropdownClick(item)}
              className='w-full h-[35px] rounded-[5px] hover:bg-gray-200 bg-white-100'
            >{item}</button>
          ))}
        </div>
      ) : (null)}
    </div>
  );
}

function AdminFitnessList() {
  return (
    <div className="w-full h-full overflow-y-auto">
      <h1 className="mb-[50px] font-bold text-[18px] ">피트니스 센터 → 시설 목록</h1>
      <div className="flex justify-end gap-2">
        <Dropdown />
        <div className="flex relative">
          <input 
            type="text" 
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
            {dummyData.map((item, index) => (
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
      </div>
    </div>
  );
}

export default AdminFitnessList;
