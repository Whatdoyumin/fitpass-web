import { useState } from "react";
import { IcCheckEmpty, IcCheckFull, IcImage, IcSearch } from "../../assets/svg";
import { useNavigate } from "react-router-dom";
import { mockNotices, Notice } from "../../mocks/mockNotices";
import SvgIcLeftPage from "../../assets/svg/IcLeftPage";
import SvgIcRightPage from "../../assets/svg/IcRightPage";

function AdminNotice() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalType, setModalType] = useState<"add" | "remove" | null>(null);
  const [modalNoticeId, setModalNoticeId] = useState<number | null>(null); // 현재 모달 공지사항 ID
  const [isIconChecked, setIsIconChecked] = useState<{ [key: number]: boolean }>({}); // 각 공지사항별 체크 상태
  const [checkedCount, setCheckedCount] = useState(0); // 체크된 아이콘의 개수 추적

  const itemsPerPage = 10;
  const pagesPerGroup = 5;
  const totalPages = Math.ceil(mockNotices.length / itemsPerPage);
  const [currentPage, setCurrentPage] = useState(1);

  const currentGroup = Math.ceil(currentPage / pagesPerGroup);
  const startPage = (currentGroup - 1) * pagesPerGroup + 1;
  const endPage = Math.min(startPage + pagesPerGroup - 1, totalPages);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentNotices = mockNotices.slice().reverse().slice(indexOfFirstItem, indexOfLastItem);
  const navigate = useNavigate();

  // 체크박스를 클릭 함수 
  const handleCheckboxChange = (id: number, isChecked: boolean) => {
    // 이미 3개가 체크, 추가 x
    if (checkedCount >= 3 && !isChecked) {
      return; 
    }

    setModalNoticeId(id);
    setModalType(isChecked ? "remove" : "add");
    setIsModalOpen(true); // 모달 열기
  };

  // 모달에서 "예" 클릭
  const handleModalAction = (confirm: boolean) => {
    if (confirm && modalNoticeId !== null) {
      // 아이콘 변경
      const updatedCheckedCount = isIconChecked[modalNoticeId] ? checkedCount - 1 : checkedCount + 1;
      
      setCheckedCount(updatedCheckedCount); // 체크된 아이콘 개수 업데이트

      setIsIconChecked((prev) => ({
        ...prev,
        [modalNoticeId]: modalType === "add" ? true : false, // add일 때는 true (IcCheckFull), remove일 때는 false (IcCheckEmpty)
      }));
    }
    setIsModalOpen(false);
    setModalNoticeId(null);
    setModalType(null);
  };

  return (
    <div className="w-full px-[7px]">
      <h1 className="adminTitle">공지사항</h1>

      {/* 검색 */}
      <div className="w-[345px] flex flex-col justify-end items-start gap-2 mt-[64px] ml-auto">
        <label className="text-[12px] text-black-600">검색하기</label>
        <div className="relative w-full">
          <input className="w-full h-12 pl-4 pr-12 border border-gray-450 rounded-md bg-white focus:outline-none" />
          <IcSearch
            width="24px"
            className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-500"
          />
        </div>
      </div>

      {/* 공지사항 목록 테이블 */}
      <div className="mt-[26px] min-h-[550px]">
        <table className="w-full table-auto border border-gray-450">
          <thead className="bg-blue-100 border-b border-gray-450">
            <tr className="h-[50px] text-[13px] text-black-700">
              <th className="px-4 py-2 text-center">순번</th>
              <th className="px-4 py-2 text-center">이미지</th>
              <th className="px-4 py-2 text-left">제목</th>
              <th className="px-4 py-2 text-left">카테고리</th>
              <th className="px-4 py-2 text-left">게시일</th>
              <th className="px-4 py-2 text-left">상태</th>
              <th className="px-4 py-2">홈 슬라이드 게시</th>
            </tr>
          </thead>

          <tbody>
            {currentNotices.map((notice: Notice) => (
              <tr className="border-b border-gray-450 h-[50px] text-[12px]" key={notice.id}>
                <td className="px-4 py-2 text-center min-w-[100px]">{notice.id}</td>
                <td className="px-4 py-2">
                  <span className="flex justify-center min-w-[50px] items-center">
                    {notice.image ? <IcImage width={19.5} /> : ""}
                  </span>
                </td>
                <td className="px-4 py-2 text-left max-w-[260px] min-w-[260px] overflow-hidden text-ellipsis whitespace-nowrap">
                  {notice.title}
                </td>
                <td className="px-4 py-2 min-w-[120px]">{notice.category}</td>
                <td className="px-4 py-2 min-w-[130px]">{notice.publishDate}</td>
                <td className="px-4 py-2 min-w-[90px]">{notice.status}</td>
                <td className="px-4 py-2 min-w-[180px] text-center border-b border-gray-450">
                  <span className="flex justify-center items-center cursor-pointer">
                    {isIconChecked[notice.id] ? (
                      <IcCheckFull
                        width={24}
                        onClick={() =>
                          handleCheckboxChange(notice.id, isIconChecked[notice.id] || false)
                        }
                      />
                    ) : (
                      <IcCheckEmpty
                        width={24}
                        onClick={() =>
                          handleCheckboxChange(notice.id, isIconChecked[notice.id] || false)
                        }
                      />
                    )}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* 작성하기 버튼 */}
      <div className="flex pt-[26px] justify-end pr-[12px]">
        <button
          className="bg-blue-500 text-white-100 w-[150px] h-[51px] py-[14px] rounded-5 text-[15px]"
          onClick={() => navigate("/admin/notice/upload")}
        >
          작성하기
        </button>
      </div>

      {/* 페이지네이션 */}
      <div className="flex justify-center items-center pt-[14px] gap-[10px] mb-[26px]">
        <button
          onClick={() => currentPage > 1 && setCurrentPage(currentPage - 1)}
          disabled={currentPage === 1}
          className="text-gray-350 focus:outline-none"
        >
          <SvgIcLeftPage width={5} />
        </button>

        {Array.from({ length: endPage - startPage + 1 }, (_, index) => (
          <button
            key={startPage + index}
            onClick={() => handlePageChange(startPage + index)}
            className={`text-sm ${
              currentPage === startPage + index ? "text-gray-600" : "text-gray-350"
            } focus:outline-none`}
          >
            {startPage + index}
          </button>
        ))}

        <button
          onClick={() => currentPage < totalPages && setCurrentPage(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="text-gray-350 focus:outline-none"
        >
          <SvgIcRightPage width={5} />
        </button>
      </div>

      {/* 모달 */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black-700 bg-opacity-50 flex justify-center items-center z-10">
          <div className="bg-white-100 p-[30px] pt-[40px] rounded-lg shadow-lg w-[480px]">
            <p className="text-center text-[25px] py-2 font-extrabold">
              {modalType === "add"
                ? "홈 슬라이드에 게시하겠습니까?"
                : "홈 슬라이드 게시를 취소하겠습니까?"}
            </p>
            <div className="flex justify-around mt-[50px] text-18px text-white-100 gap-[20px]">
              <button
                onClick={() => handleModalAction(false)}
                className="w-[100%] py-4 bg-blue-250 rounded-md"
              >
                아니요
              </button>
              <button
                onClick={() => handleModalAction(true)}
                className="w-[100%] py-4 bg-blue-500 rounded-md"
              >
                예
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default AdminNotice;
