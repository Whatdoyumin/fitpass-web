  import { useState } from "react";
  import SvgArrowDropDown from "../../../assets/svg/ArrowDropDown";
  import { IcSearch } from "../../../assets/svg";
  import useDebounce from "../../../hooks/useDebounce";
  import { Pagination } from "../../../components/Pagination";
  import { LoadingSpinner } from "../../../components/LoadingSpinner";
  import NotFound from "../../NotFound";
import { useGetAdminFitnessUsers, TFitnessUserData } from "../../../hooks/useGetAdminUser";
import { patchAdminOwnerRequest } from "../../../apis/adminUser/adminOwnerRequest";

    function AdminFitnessRequest() {
      const [searchTerm, setSearchTerm] = useState("");
      const [searchType, setSearchType] = useState("corporation");
      const [dropdownOpen, setDropdownOpen] = useState(false);
      const [currentPage, setCurrentPage] = useState(0);
      const itemsPerPage = 10;
    
      const debouncedSearchTerm = useDebounce(searchTerm, 1000);
    
      const { data, isLoading, isError } = useGetAdminFitnessUsers(currentPage, itemsPerPage, searchType, debouncedSearchTerm);
      const users = data?.content?.ownersApprovals || [];
      const totalPages = data?.content?.totalPages || 1;
    
      if (isLoading) return <LoadingSpinner />;
      if (isError) return <NotFound />;
    
      const handleApproval = async (loginId: string, isApproval: boolean) => {
        try {
          await patchAdminOwnerRequest(loginId, isApproval);
        } catch (error) {
          alert("요청 처리에 실패했습니다.");
        }
      };

      return (
        <div className="w-full px-[7px] h-full flex flex-col relative">
          <h1 className="adminTitle">시설 승인 요청</h1>
    
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
              {searchType === "corporation" ? "업체명" : "전화번호"}
              <SvgArrowDropDown width={16} />
            </button>
  
            {dropdownOpen && (
              <ul className="absolute top-[50px] left-0 w-[89px] bg-white-100 shadow-lg rounded-md border border-gray-300 z-[50] text-black-600">
                <li className="p-3 text-[12px] cursor-pointer hover:bg-gray-100" onClick={() => { setSearchType("corporation"); setDropdownOpen(false); }}>업체명</li>
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
          <div className="min-h-[580px] pt-[26px]">
            <table className="w-full border-collapse border border-gray-450">
            <thead className="bg-blue-100 text-[13px] h-[49px] border-b border-gray-450">
            <tr>
              <th className="w-[80px] font-medium text-center">순번</th>
              <th className="w-[90px] font-medium text-left">회원명</th>
              <th className="w-[89px] font-medium text-left">업체명 (상호)</th>
              <th className="w-[115px] font-medium text-left">전화번호</th>
              <th className="w-[90px] font-medium text-left">사업자 등록증</th>
              <th className="w-[50px] font-medium text-left">통장 사본</th>
              <th className="w-[100px] font-medium text-left">가입 요청일</th>
              <th className="w-[135px]" /> {/* 버튼 칼럼*/}
            </tr>
          </thead>

          <tbody className="text-[12px]">
            {users.map((user: TFitnessUserData) => (
              <tr key={user.id} className="h-[50px] border-b border-gray-450">
                <td className="text-center">{user.id}</td>
                <td>{user.name}</td>
                <td>{user.corporation}</td>
                <td>{user.phoneNumber}</td>
                <td>파일</td>
                <td>파일</td>
                <td>{user.createdAt}</td>
                <td>
                  <div className="flex gap-[13px] text-[14px]">
                  <button
                    className="w-[60px] h-[40px] text-white-100 bg-blue-500 rounded-md hover:bg-blue-400"
                    onClick={() => handleApproval(user.loginId, true)}
                  >
                    승인하기
                  </button>
                  <button
                    className="w-[60px] h-[40px] text-white-100 bg-gray-400 rounded-md hover:bg-gray-500"
                    onClick={() => handleApproval(user.loginId, false)}
                  >
                    반려하기
                  </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>

            </table>
          </div>
    
          {totalPages > 1 && (
              <Pagination
                totalPages={totalPages}
                currentPage={currentPage}
                onPageChange={setCurrentPage} />
            )}
        </div>
      );
    }
  
    export default AdminFitnessRequest;
    