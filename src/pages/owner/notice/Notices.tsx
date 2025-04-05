import { useNavigate } from "react-router-dom";
import { useState } from "react";
import SvgIcLeftPage from "../../../assets/svg/IcLeftPage";
import SvgIcRightPage from "../../../assets/svg/IcRightPage";

const mockNotices = Array.from({ length: 28 }, (_, i) => ({
  id: i + 1,
  title: `${i + 1}번 테스트`,
  noticeType: i % 3 === 0 ? "이벤트" : "공지사항",
}));

const itemsPerPage = 10;

const OwnerNotices = () => {
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(mockNotices.length / itemsPerPage);
  const pagesPerGroup = 5;
  const currentGroup = Math.ceil(currentPage / pagesPerGroup);
  const startPage = (currentGroup - 1) * pagesPerGroup + 1;
  const endPage = Math.min(startPage + pagesPerGroup - 1, totalPages);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const currentNotices = mockNotices.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <div className="relative flex flex-col min-h-[calc(100vh-165px)] overflow-y-auto">
      <ul className="flex-grow">
        {currentNotices.map((notice) => (
          <li
            key={notice.id}
            className="border-b px-6 py-3 flex min-w-[375px] cursor-pointer"
            onClick={() => navigate(`/my/notices/${notice.id}`)}
          >
            <span
              className={`font-medium whitespace-nowrap ${
                notice.noticeType === "공지사항"
                  ? "text-blue-500"
                  : notice.noticeType === "이벤트"
                  ? "text-red-600"
                  : "text-gray-500"
              }`}
            >
              [{notice.noticeType === "공지사항" ? "공지" : notice.noticeType}]&nbsp;
            </span>
            <span className="text-gray-700 overflow-hidden whitespace-nowrap text-ellipsis">
              {notice.title}
            </span>
          </li>
        ))}
      </ul>

      {/* 페이지네이션 */}
      <div className="flex justify-center items-center pt-[14px] gap-[10px] mb-[26px]">
        <button
          onClick={() => handlePageChange(currentPage - 1)}
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
              currentPage === startPage + index
                ? "text-gray-600"
                : "text-gray-350"
            } focus:outline-none`}
          >
            {startPage + index}
          </button>
        ))}

        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="text-gray-350 focus:outline-none"
        >
          <SvgIcRightPage width={5} />
        </button>
      </div>
    </div>
  );
};

export default OwnerNotices;
