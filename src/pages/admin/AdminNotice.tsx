import { useState, useEffect } from "react";
import { IcCheckEmpty, IcCheckFull, IcImage, IcSearch } from "../../assets/svg";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Notice, useGetAdminNotice } from "../../apis/adminNotice/quries/useAdminNoticeApi";
import SvgIcLeftPage from "../../assets/svg/IcLeftPage";
import SvgIcRightPage from "../../assets/svg/IcRightPage";
import { usePatchHomeSlideCheck } from "../../apis/adminNotice/quries/useAdminNoticeApi";
import { LoadingSpinner } from "../../components/LoadingSpinner";

function AdminNotice() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalType, setModalType] = useState<"add" | "remove" | null>(null);
  const [modalNoticeId, setModalNoticeId] = useState<number | null>(null);
  const [checkedCount, setCheckedCount] = useState(0);
  const [searchKeyword, setSearchKeyword] = useState<string>("");

  const [debouncedSearchKeyword, setDebouncedSearchKeyword] = useState<string>("");
  const [searchParams, setSearchParams] = useSearchParams();

  const navigate = useNavigate();
  const [scrollPosition, setScrollPosition] = useState(0);

  const itemsPerPage = 10;
  const pagesPerGroup = 5;
  const currentPage = Number(searchParams.get("page")) || 1;

  // API 요청 -> debouncedSearchKeyword가 바뀔 때
  const { data, isLoading, error } = useGetAdminNotice(
    debouncedSearchKeyword || null,
    currentPage,
    itemsPerPage
  );

  const handleSearchClick = () => {
    setDebouncedSearchKeyword(searchKeyword);
    setSearchParams({ page: "1" });
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      setDebouncedSearchKeyword(searchKeyword);
      setSearchParams({ page: "1" });
    }
  };

  const totalPages = data?.result?.totalElements
    ? Math.ceil(data.result.totalElements / itemsPerPage)
    : 0;
  const currentGroup = Math.ceil(currentPage / pagesPerGroup);
  const startPage = (currentGroup - 1) * pagesPerGroup + 1;
  const endPage = Math.min(startPage + pagesPerGroup - 1, totalPages);

  // 페이지 변경 시 URL 업데이트
  const handlePageChange = (page: number) => {
    setScrollPosition(window.scrollY);
    setSearchParams({ page: page.toString() });
  };

  useEffect(() => {
    window.scrollTo({ top: scrollPosition, behavior: "instant" });
  }, [data, scrollPosition]);

  const { mutate: patchHomeSlideCheck } = usePatchHomeSlideCheck();

  const handleCheckboxChange = (id: number, isChecked: boolean) => {
    setModalNoticeId(id);
    setModalType(isChecked ? "remove" : "add");
    setIsModalOpen(true);
  };

  const handleModalAction = (confirm: boolean) => {
    if (confirm && modalNoticeId !== null) {
      const updatedCheckedCount = checkedCount + (modalType === "add" ? 1 : -1);
      setCheckedCount(updatedCheckedCount);

      // 체크박스 상태 변경을 위한 API 호출
      if (modalType === "add") {
        patchHomeSlideCheck({ noticeId: modalNoticeId, isHomeSlide: true });
      } else if (modalType === "remove") {
        patchHomeSlideCheck({ noticeId: modalNoticeId, isHomeSlide: false });
      }
    }

    setIsModalOpen(false);
    setModalNoticeId(null);
    setModalType(null);
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const day = date.getDate().toString().padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  useEffect(() => {
    if (error) {
      alert(error.response?.data?.message);
    }
  }, [error]);

  if (isLoading) {
    return <LoadingSpinner />;
  }

  return (
    <div className="w-full px-[7px]">
      <h1 className="adminTitle">공지사항</h1>
      <div className="min-w-[920px]">
        {/* 검색 */}
        <div className="w-[345px] flex flex-col justify-end items-start gap-2 mt-[64px] ml-auto">
          <label className="text-[12px] text-black-600">검색하기</label>
          <div className="relative w-full">
            <input
              className="w-full h-12 pl-4 pr-12 border border-gray-450 rounded-md bg-white focus:outline-none"
              value={searchKeyword}
              onChange={(e) => setSearchKeyword(e.target.value)}
              onKeyDown={handleKeyDown}
            />
            <IcSearch
              width="24px"
              className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-500 cursor-pointer"
              onClick={handleSearchClick}
            />
          </div>
        </div>

        {/* 공지사항 목록 테이블 */}
        <div className="mt-[26px] min-h-[550px] whitespace-nowrap">
          <table className="w-full table-fixed border border-gray-450">
            <thead className="bg-blue-100 border-b border-gray-450">
              <tr className="h-[50px] text-[13px] text-black-700">
                <th className="pr-4 pl-10 py-2 w-[80px] text-center">순번</th>
                <th className="px-4 py-2 w-[60px] text-center">이미지</th>
                <th className="px-4 py-2 w-[260px] text-left">제목</th>
                <th className="px-4 py-2 w-[120px] text-left">카테고리</th>
                <th className="px-4 py-2 w-[120px] text-left">게시일</th>
                <th className="px-4 py-2 w-[80px] text-left">상태</th>
                <th className="px-4 py-2 w-[180px] text-center">홈 슬라이드 게시</th>
              </tr>
            </thead>

            <tbody>
              {data?.result.content.map((notice: Notice) => (
                <tr className="border-b border-gray-450 h-[50px] text-[12px] " key={notice.id}>
                  <td className="pr-4 pl-10 py-2 text-center">{notice.id}</td>
                  <td className="px-4 py-2">
                    <span className="flex justify-center items-center mx-auto">
                      {notice.imageUrl && notice.imageUrl !== "none" ? (
                        <IcImage width={19.5} />
                      ) : (
                        ""
                      )}
                    </span>
                  </td>
                  <td className="px-4 py-2 text-left min-w-[260px] overflow-hidden text-ellipsis whitespace-nowrap">
                    {notice.title}
                  </td>
                  <td className="px-4 py-2">{notice.category}</td>
                  <td className="px-4 py-2">{formatDate(notice.createdAt)}</td>
                  <td className="px-4 py-2">{notice.status}</td>
                  <td className="px-4 py-2 text-center border-b border-gray-450">
                    <span className="flex justify-center items-center cursor-pointer">
                      {notice.isHomeSlide ? (
                        <IcCheckFull
                          width={24}
                          onClick={() => handleCheckboxChange(notice.id, true)}
                        />
                      ) : (
                        <IcCheckEmpty
                          width={24}
                          onClick={() => handleCheckboxChange(notice.id, false)}
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
        <div className="flex pt-[26px] justify-end">
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
            onClick={() => currentPage > 1 && handlePageChange(currentPage - 1)}
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
            onClick={() => currentPage < totalPages && handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="text-gray-350 focus:outline-none"
          >
            <SvgIcRightPage width={5} />
          </button>
        </div>
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