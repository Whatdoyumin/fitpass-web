import { useState } from "react";
import { useNavigate } from "react-router-dom";
import SvgIcLeftPage from "../../assets/svg/IcLeftPage";
import SvgIcRightPage from "../../assets/svg/IcRightPage";

export interface Notice {
  id: number;
  type: "공지" | "이벤트";
  title: string;
  author: string;
  createdAt: string;
  views: number;
  text: string;
  imageUrl: string;
}

const notices: Notice[] = Array.from({ length: 82 }, (_, i) => ({
  id: i + 1,
  type: i % 2 === 0 ? "공지" : "이벤트",
  title: `공지/이벤트 ${i + 1} 제목`,
  author: `작성자${i + 1}`,
  createdAt: new Date(2025, 0, i + 1).toISOString(),
  views: Math.floor(Math.random() * 1000),
  text: `이것은 공지/이벤트 ${i + 1}의 상세 내용입니다.`,
  imageUrl: `/assets/img/img_notice.jpg`,
}));

const Notice = () => {
  const navigate = useNavigate();

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = notices.slice(indexOfFirstItem, indexOfLastItem);

  const totalPages = Math.ceil(notices.length / itemsPerPage);
  const getPagination = () => {
    const range = 1;
    const start = Math.max(currentPage - range, 1);
    const end = Math.min(currentPage + range, totalPages);

    let pages = [];
    for (let i = start; i <= end; i++) {
      pages.push(i);
    }
    if (start > 1) pages = [1, "...", ...pages];
    if (end < totalPages) pages = [...pages, "...", totalPages];

    return pages;
  };

  return (
    <div className="relative flex flex-col min-h-screen">
      <ul className="overflow-y-auto">
        {currentItems.map((notice) => (
          <li
            key={notice.id}
            className="border-b px-6 py-3"
            onClick={() => navigate(`/my/noticedetail/${notice.id}`)}
          >
            <span
              className={`font-medium ${notice.type === "공지" ? "text-blue-500" : "text-red-600"}`}
            >
              [{notice.type}]
            </span>{" "}
            <span className="text-gray-700">{notice.title}</span>
          </li>
        ))}
      </ul>

      {/* 페이지네이션 */}
      <div className="flex justify-center items-center w-full mt-auto pb-[100px]">
        <button
          onClick={() => setCurrentPage(currentPage > 1 ? currentPage - 1 : 1)}
          className="px-[5px] text-[14px] text-gray-350"
        >
          <SvgIcLeftPage width={"5px"} />
        </button>

        {getPagination().map((page, index) => (
          <button
            key={index}
            onClick={() => {
              if (page === "...") return;
              setCurrentPage(page as number);
            }}
            className={`px-[5px] text-[14px] ${
              currentPage === page
                ? "text-gray-600"
                : page === "..."
                ? "text-gray-350"
                : "text-gray-350"
            }`}
          >
            {page}
          </button>
        ))}

        <button
          onClick={() => setCurrentPage(currentPage < totalPages ? currentPage + 1 : totalPages)}
          className="px-[5px] text-[14px] text-gray-350"
        >
          <SvgIcRightPage width={"5px"} />
        </button>
      </div>
    </div>
  );
};

export default Notice;
