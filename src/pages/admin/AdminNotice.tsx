import { IcSearch } from "../../assets/svg";

function AdminNotice() {
  return (
    <div className="w-full px-[7px]">
      <h1 className="adminTitle">공지사항</h1>

      {/* 검색 */}
      <div className="w-[345px] flex flex-col justify-end items-start gap-2 mt-[86px] ml-auto">
        <label className="block text-12px text-black-600">검색하기</label>

        <div className="relative w-full">
          <input className="w-full h-12 pl-4 pr-12 border border-gray-450 rounded-md bg-white focus:outline-none" />
          <IcSearch
            width="24px"
            className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-500"
          />
        </div>
      </div>

      {/* 공지사항 목록 테이블 */}
      <div className="mt-[26px]">
        <table className="w-full table-auto">
          <thead>
            <tr className="text-sm text-gray-600">
              <th className="px-4 py-2">순번</th>
              <th className="px-4 py-2">이미지</th>
              <th className="px-4 py-2">제목</th>
              <th className="px-4 py-2">카테고리</th>
              <th className="px-4 py-2">게시일</th>
              <th className="px-4 py-2">상태</th>
              <th className="px-4 py-2">홈 슬라이드 게시</th>
            </tr>
          </thead>

          <tbody>
            <tr className="border-b">
              <td className="px-4 py-2">1</td>
              <td className="px-4 py-2 text-center">
                <span>이미지 있음</span>
              </td>
              <td className="px-4 py-2">공지사항 제목 1</td>
              <td className="px-4 py-2">카테고리 1</td>
              <td className="px-4 py-2">2024-01-05</td>
              <td className="px-4 py-2">정상</td>
              <td className="px-4 py-2 text-center">
                <input type="checkbox" checked={true} />
              </td>
            </tr>
            <tr className="border-b">
              <td className="px-4 py-2">2</td>
              <td className="px-4 py-2 text-center">
                <span>이미지 없음</span>
              </td>
              <td className="px-4 py-2">공지사항 제목 2</td>
              <td className="px-4 py-2">카테고리 2</td>
              <td className="px-4 py-2">2024-01-06</td>
              <td className="px-4 py-2">정상</td>
              <td className="px-4 py-2 text-center">
                <input type="checkbox" checked={false} />
              </td>
            </tr>
            <tr className="border-b">
              <td className="px-4 py-2">3</td>
              <td className="px-4 py-2 text-center">
                <span>이미지 있음</span>
              </td>
              <td className="px-4 py-2">공지사항 제목 3</td>
              <td className="px-4 py-2">카테고리 3</td>
              <td className="px-4 py-2">2024-01-07</td>
              <td className="px-4 py-2">정상</td>
              <td className="px-4 py-2 text-center">
                <input type="checkbox" checked={true} />
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default AdminNotice;
