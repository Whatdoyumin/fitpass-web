import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { Pagination } from "../../../components/Pagination";

const mockNotices = Array.from({ length: 28 }, (_, i) => ({
  id: i + 1,
  title: `${i + 1}번 테스트`,
  noticeType: i % 3 === 0 ? "이벤트" : "공지사항",
}));

const itemsPerPage = 10;

const OwnerNotices = () => {
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(0); 
  const totalPages = Math.ceil(mockNotices.length / itemsPerPage);

  const currentNotices = mockNotices.slice(
    currentPage * itemsPerPage,
    (currentPage + 1) * itemsPerPage
  );

  return (
    <div className="relative flex flex-col min-h-[calc(100vh-165px)] overflow-y-auto">
      <ul className="flex-grow">
        {currentNotices.map((notice) => (
          <li
            key={notice.id}
            className="border-b px-6 py-3 flex min-w-[375px] cursor-pointer"
            onClick={() => navigate(`/owner/notices/${notice.id}`)}
          >
            <span
              className={`font-medium whitespace-nowrap ${
                notice.noticeType === "공지사항"
                  ? "text-blue-500"
                  : "text-red-600"
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

      <Pagination
        totalPages={totalPages}
        currentPage={currentPage}
        onPageChange={setCurrentPage}
      />
    </div>
  );
};

export default OwnerNotices;
