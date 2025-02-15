import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { axiosInstance } from "../../apis/axios-instance";
import config from "../../apis/config";
import SvgIcLeftPage from "../../assets/svg/IcLeftPage";
import SvgIcRightPage from "../../assets/svg/IcRightPage";
import SvgArrowDropDown from "../../assets/svg/ArrowDropDown";
import { IcSearch } from "../../assets/svg";
import useDebounce from "../../hooks/useDebounce"; // 🔄 검색 디바운스 훅

type TUserData = {
  id: number;
  name: string;
  registerType: string;
  loginId: string;
  phoneNumber: string;
  createdAt: string;
  lastLoginAt: string;
};

type UsersParams = {
  page?: number;
  size?: number;
  searchType?: string;
  keyword?: string;
};

function AdminUser() {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchType, setSearchType] = useState("name");
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const pagesPerGroup = 5;

  // 🔄 검색어 디바운스
  const debouncedSearchTerm = useDebounce(searchTerm, 1000);

  // API 요청 함수
  const fetchUsers = async ({ queryKey }: { queryKey: [string, number, string, string] }) => {
    const [, page, searchType, keyword] = queryKey;
    const params: UsersParams = {
      page: page-1,
      size: itemsPerPage,
      searchType,
      keyword: keyword || "",
    };
    const response = await axiosInstance.get(`${config.apiBaseUrl}/admin/members`, { params });
    return response.data;
  };

  const { data, isLoading, isError } = useQuery({
    queryKey: ["users", currentPage, searchType, debouncedSearchTerm],
    queryFn: fetchUsers,
  });

  console.log(data)

  const users = data?.result?.membersInfo || [];
  const totalPages = data?.result?.totalPages || 1;

  // 페이지 그룹 계산
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
    <div className="w-full px-[7px] h-full flex flex-col relative">
      <h1 className="adminTitle">사용자 → 회원 정보</h1>

      {/* 검색 및 필터링 */}
      <div className="flex justify-end relative pt-[64px]">
        <label className="text-[12px] text-black-600 w-[345px]">검색하기</label>
      </div>
      <div className="flex justify-end gap-[11px] relative z-[50] pt-[7px]">
        {/* 드롭다운 */}
        <div className="relative w-[89px]">
          <button
            className="h-[48px] w-[89px] bg-gray-200 border border-gray-300 flex items-center justify-between p-[5px] pl-[10px] rounded-md text-[12px] text-black-600"
            onClick={() => setDropdownOpen(!dropdownOpen)}
          >
            {searchType === "name" ? "회원명" : searchType === "loginId" ? "계정" : "전화번호"}
            <SvgArrowDropDown width={16} />
          </button>

          {dropdownOpen && (
            <ul className="absolute top-[50px] left-0 w-[89px] bg-white-100 shadow-lg rounded-md border border-gray-300 z-[50] text-black-600">
              <li className="p-3 text-[12px] cursor-pointer hover:bg-gray-100" onClick={() => { setSearchType("name"); setDropdownOpen(false); }}>회원명</li>
              <li className="p-3 text-[12px] cursor-pointer hover:bg-gray-100" onClick={() => { setSearchType("loginId"); setDropdownOpen(false); }}>계정</li>
              <li className="p-3 text-[12px] cursor-pointer hover:bg-gray-100" onClick={() => { setSearchType("phoneNumber"); setDropdownOpen(false); }}>전화번호</li>
            </ul>
          )}
        </div>

        {/* 검색창 */}
        <div className="relative flex w-[345px]">
          <input
            type="text"
            className="border border-gray-450 focus:outline-none rounded-md w-full h-[48px] p-[12px]"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button type="button" className="absolute right-0 flex items-center justify-center p-[12px]">
            <IcSearch width={24} />
          </button>
        </div>
      </div>

      {/* 사용자 정보 테이블 */}
      <div className="min-h-[580px] overflow-hidden pt-[26px]">
        <table className="w-full border-collapse border border-gray-450">
          <thead className="bg-blue-100 text-[13px] h-[49px] border-b border-gray-450">
            <tr>
              <th className="w-[44px] font-medium text-center">순번</th>
              <th className="w-[90px] font-medium text-left">회원명</th>
              <th className="w-[89px] font-medium text-left">회원 유형</th>
              <th className="w-[183px] font-medium text-left">계정</th>
              <th className="w-[115px] font-medium text-left">전화번호</th>
              <th className="w-[100px] font-medium text-left">가입일</th>
              <th className="w-[139px] font-medium text-left">접속일</th>
            </tr>
          </thead>
          <tbody className="text-[12px]">
            {users.map((user: TUserData) => (
              <tr key={user.id} className="h-[50px] border-b border-gray-450">
                <td className="text-center">{user.id}</td>
                <td>{user.name}</td>
                <td>{user.registerType}</td>
                <td>{user.loginId}</td>
                <td>{user.phoneNumber}</td>
                <td>{user.createdAt}</td>
                <td>{user.lastLoginAt}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      
      {/* 페이지네이션 */}
      <div className="w-full flex justify-center items-center pt-[40px] gap-[10px] mb-[26px]">
        {/* 이전 페이지 */}
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="text-gray-350 focus:outline-none"
        >
          <SvgIcLeftPage width={5} />
        </button>

        {/* 페이지 숫자 표시 */}
        {Array.from({ length: endPage - startPage + 1 }, (_, index) => {
          const pageNum = startPage + index;
          return (
            <button
              key={pageNum}
              onClick={() => handlePageChange(pageNum)}
              className={`text-sm rounded-md ${
                currentPage === pageNum ? "text-gray-600" : "text-gray-350"
              } focus:outline-none`}
            >
              {pageNum}
            </button>
          );
        })}

        {/* 다음 페이지 */}
        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage >= totalPages}
          className="text-gray-350 focus:outline-none"
        >
          <SvgIcRightPage width={5} />
        </button>
      </div>
    </div>
  );
}

export default AdminUser;
