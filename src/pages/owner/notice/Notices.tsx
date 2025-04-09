import { useNavigate, useSearchParams } from "react-router-dom";
import { Pagination } from "../../../components/Pagination";
import { useGetOwnerNotices } from "../../../hooks/useNoticeApi";
import { LoadingSpinner } from "../../../components/LoadingSpinner";
import NotFound from "../../NotFound";

const OwnerNotices = () => {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();

  // URL에서 현재 페이지 번호 가져오기 (없으면 1로 기본값 설정)
  const currentPage = Number(searchParams.get("page")) || 1;
  const itemsPerPage = 10;

  const { data, error, isLoading } = useGetOwnerNotices(currentPage - 1, itemsPerPage);

  if (isLoading) return <LoadingSpinner />;
  if (error instanceof Error) {
    console.log(error.message);
    return <NotFound />;
  }

  const noticesData = data;
  const notices = noticesData?.content?.content ?? [];
  const totalPages = noticesData?.content?.totalPages ?? 1;

  const handlePageChange = (pageIndex: number) => {
    setSearchParams({ page: (pageIndex + 1).toString() });
  };

  return (
    <div className="relative flex flex-col min-h-[calc(100vh-165px)] overflow-y-auto">
      <ul className="flex-grow">
      {notices.map((notice) => (
          <li
            key={notice.id}
            className="border-b px-6 py-3 flex min-w-[375px] cursor-pointer"
            onClick={() => navigate(`/owner/notices/${notice.id}`)}
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

      <Pagination
        totalPages={totalPages}
        currentPage={currentPage}
        onPageChange={handlePageChange}
      />
    </div>
  );
};

export default OwnerNotices;
