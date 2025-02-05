import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useGetNotices } from "../../apis/mypage/quries/useNoticeApi"; // react-query 훅을 가져옵니다
import SvgIcLeftPage from "../../assets/svg/IcLeftPage";
import SvgIcRightPage from "../../assets/svg/IcRightPage";
import { LoadingSpinner } from "../../components/LoadingSpinner";
import NotFound from "../NotFound";

export interface Notice {
  id: number;
  noticeType: string;
  title: string;
  createdAt: string;
  imageUrl: string;
  content: string;
  views: number;
}

export interface NoticesResponse {
  content: { content: Notice[]; totalElements: number | undefined; totalPages: number };
}

const NoticeList = () => {
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState<number>(1);
  const itemsPerPage = 10;

  const { data, error, isLoading } = useGetNotices(currentPage - 1, itemsPerPage);

  if (isLoading) return <LoadingSpinner />;
  if (error instanceof Error) {
    console.log(error.message);
    return <NotFound />;
  }

  const noticesData = data;
  const notices: Notice[] = noticesData?.content?.content ?? [];
  const totalPages: number = noticesData?.content?.totalPages ?? 1;

  const getPagination = () => {
    const range = 1;
    const start = Math.max(currentPage - range, 1);
    const end = Math.min(currentPage + range, totalPages);

    let pages: (number | string)[] = [];
    for (let i = start; i <= end; i++) {
      pages.push(i);
    }
    if (start > 1) pages = [1, "...", ...pages];
    if (end < totalPages) pages = [...pages, "...", totalPages];

    return pages;
  };

  return (
    <div className="relative flex flex-col min-h-[calc(100vh-165px)] overflow-y-auto">
      <ul className=" flex-grow">
        {notices.map((notice) => (
          <li
            key={notice.id}
            className="border-b px-6 py-3"
            onClick={() => navigate(`/my/noticedetail/${notice.id}`)}
          >
            <span className="font-medium text-blue-500">
              [{notice.noticeType === "공지사항" ? "공지" : notice.noticeType}]
            </span>
            <span className="text-gray-700"> {notice.title}</span>
          </li>
        ))}
      </ul>

      {/* 페이지네이션 */}
      <div className="flex justify-center items-center w-full mb-[24px]">
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
              currentPage === page ? "text-gray-600" : "text-gray-350"
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

export default NoticeList;
