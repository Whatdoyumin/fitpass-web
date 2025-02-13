import { useState } from "react";
import { SearchGray } from "../../assets/svg";
function AdminUser() {
  // Mock Data
  const mockUsers = [
    { id: 11, name: "김철수", type: "SNS 가입", account: "kimcs@gmail.com", phone: "010-1234-5678", joined: "2024-12-31", lastLogin: "1일전" },
    { id: 10, name: "이영희", type: "회원가입", account: "leeyh@gmail.com", phone: "010-5678-1234", joined: "2024-12-30", lastLogin: "2일전" },
    { id: 9, name: "박지민", type: "SNS 가입", account: "pjm@gmail.com", phone: "010-8888-7777", joined: "2024-12-29", lastLogin: "3일전" },
    { id: 8, name: "정우성", type: "회원가입", account: "jws@gmail.com", phone: "010-9999-1111", joined: "2024-12-28", lastLogin: "4일전" },
    { id: 7, name: "한소희", type: "SNS 가입", account: "hsh@gmail.com", phone: "010-2222-3333", joined: "2024-12-27", lastLogin: "5일전" },
    { id: 6, name: "최민호", type: "회원가입", account: "choimh@gmail.com", phone: "010-4444-5555", joined: "2024-12-26", lastLogin: "6일전" },
    { id: 5, name: "강다니엘", type: "SNS 가입", account: "kd@gmail.com", phone: "010-6666-7777", joined: "2024-12-25", lastLogin: "7일전" },
    { id: 4, name: "배수지", type: "회원가입", account: "bsj@gmail.com", phone: "010-7777-8888", joined: "2024-12-24", lastLogin: "8일전" },
    { id: 3, name: "손흥민", type: "SNS 가입", account: "shm@gmail.com", phone: "010-5555-9999", joined: "2024-12-23", lastLogin: "9일전" },
    { id: 2, name: "이강인", type: "회원가입", account: "lki@gmail.com", phone: "010-8888-1111", joined: "2024-12-22", lastLogin: "10일전" },
    { id: 1, name: "유재석", type: "SNS 가입", account: "yjs@gmail.com", phone: "010-9999-2222", joined: "2024-12-21", lastLogin: "11일전" },
  ];
  
  const [users, setUsers] = useState(mockUsers);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchType, setSearchType] = useState("name");
  const [currentPage, setCurrentPage] = useState(1);
  const usersPerPage = 10;

  // 검색 필터링
  const filteredUsers = users.filter(user =>
    user[searchType].toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalPages = Math.ceil(filteredUsers.length / usersPerPage);
  const startIdx = (currentPage - 1) * usersPerPage;
  const currentUsers = filteredUsers.slice(startIdx, startIdx + usersPerPage);

  const pageGroup = Math.ceil(currentPage / 5);
  const pageStart = (pageGroup - 1) * 5 + 1;
  const pageEnd = Math.min(pageStart + 4, totalPages);

  // 페이지 변경 핸들러
  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };

  return (
    <div className="w-full h-full overflow-y-auto">
      <h1 className="adminTitle">사용자 → 회원 정보</h1>

      {/* 검색 필터 */}
      <div className="flex pl-[702px] mb-3 gap-[11px]">
        <select className="h-[48px] bg-gray-200 border border-gray-300 p-[5px] pl-[10px] rounded-md text-[12px] text-black-600" value={searchType} onChange={(e) => setSearchType(e.target.value)}>
          <option value="name">회원명</option>
          <option value="account">계정</option>
          <option value="phone">전화번호</option>
        </select>
        <div className="relative flex">
          <input type="text" 
          className="border border-gray-450 focus:outline-none focus:ring-1 rounded-md w-[345px] h-[48px] p-[12px]" 
          placeholder="검색하기" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
          <button 
          type="button"
          className="absolute right-0 flex items-center justify-center p-[12px]">
          <SearchGray width={24} />
          </button>
        </div>
      </div>

      {/* 사용자 정보 테이블 */}
      <div className="w-[1120px] border border-gray-450 overflow-hidden">
        <table className="w-full border-collapse">
          <thead className="bg-blue-100 text-[13px] h-[49px] border-b border-gray-450">
            <tr>
              <th className="w-[44px] font-medium text-center pl-[6px]">순번</th>
              <th className="w-[90px] font-medium text-left pl-[58px]">회원명</th>
              <th className="w-[89px] font-medium text-left pl-[58px]">회원 유형</th>
              <th className="w-[183px] font-medium text-left pl-[58px]">계정</th>
              <th className="w-[115px] font-medium text-left pl-[58px]">전화번호</th>
              <th className="w-[100px] font-medium text-left pl-[58px]">가입일</th>
              <th className="w-[139px] font-medium text-left pl-[58px]">접속일</th>
            </tr>
          </thead>
          <tbody className="text-[12px] h-[50px]">
            {currentUsers.map((user, index) => (
              <tr key={user.id} className={`h-[50px] ${index !== currentUsers.length - 1 ? "border-b border-gray-450" : ""}`}>
                <td className="text-center pl-[6px]">{user.id}</td>
                <td className="pl-[58px]">{user.name}</td>
                <td className="pl-[58px]">{user.type}</td>
                <td className="pl-[58px]">{user.account}</td>
                <td className=" pl-[58px]">{user.phone}</td>
                <td className="pl-[58px]">{user.joined}</td>
                <td className="pl-[58px]">{user.lastLogin}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* 페이지네이션 */}
      <div className="w-full flex items-center mt-[20px] pl-[437px]">
        <div className="text-gray-350 flex gap-[12px] text-[14px] w-[300px] justify-center">
          <button onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1}>{"<"}</button>
          {Array.from({ length: pageEnd - pageStart + 1 }, (_, i) => pageStart + i).map((pageNum) => (
            <button key={pageNum} className={`${currentPage === pageNum ? "text-gray-600" : "text-gray-350"}`} onClick={() => handlePageChange(pageNum)}>
              {pageNum}
            </button>
          ))}
          <button onClick={() => handlePageChange(currentPage + 1)} disabled={currentPage >= totalPages}>{">"}</button>
        </div>
      </div>
    </div>
  );
}

export default AdminUser;
