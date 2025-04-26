import { useState, useEffect } from "react";
import { IcCheckEmpty, IcCheckFull, IcImage, IcSearch } from "../../assets/svg";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Notice, useGetAdminNotice } from "../../apis/adminNotice/quries/useAdminNoticeApi";
import SvgIcLeftPage from "../../assets/svg/IcLeftPage";
import SvgIcRightPage from "../../assets/svg/IcRightPage";
import { usePatchMemberSlideCheck, usePatchOwnerSlideCheck } from "../../apis/adminNotice/quries/useAdminNoticeApi";
import { LoadingSpinner } from "../../components/LoadingSpinner";

function AdminNotice() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalType, setModalType] = useState<"add" | "remove" | null>(null);
  const [modalTarget, setModalTarget] = useState<"member" | "owner" | null>(null); // 추가
  const [modalNoticeId, setModalNoticeId] = useState<number | null>(null);
  const [searchKeyword, setSearchKeyword] = useState<string>("");
  const [debouncedSearchKeyword, setDebouncedSearchKeyword] = useState<string>("");
  const [searchParams, setSearchParams] = useSearchParams();
  const [scrollPosition, setScrollPosition] = useState(0);

  const navigate = useNavigate();

  const itemsPerPage = 10;
  const pagesPerGroup = 5;
  const currentPage = Number(searchParams.get("page")) || 1;

  const { data, isLoading, error, refetch } = useGetAdminNotice(
    debouncedSearchKeyword || null,
    currentPage - 1,
    itemsPerPage
  );

  const totalPages = data?.result?.totalElements
    ? Math.ceil(data.result.totalElements / itemsPerPage)
    : 0;
  const currentGroup = Math.ceil(currentPage / pagesPerGroup);
  const startPage = (currentGroup - 1) * pagesPerGroup + 1;
  const endPage = Math.min(startPage + pagesPerGroup - 1, totalPages);

  const { mutate: patchMemberSlideCheck } = usePatchMemberSlideCheck(refetch);
  const { mutate: patchOwnerSlideCheck } = usePatchOwnerSlideCheck(refetch);

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

  const handlePageChange = (page: number) => {
    setScrollPosition(window.scrollY);
    setSearchParams({ page: page.toString() });
  };

  useEffect(() => {
    window.scrollTo({ top: scrollPosition, behavior: "instant" });
  }, [data, scrollPosition]);

  useEffect(() => {
    if (error) {
      alert(error.response?.data?.message);
    }
  }, [error]);

  // 체크박스 클릭할 때
  const handleCheckboxChange = (id: number, isChecked: boolean, target: "member" | "owner") => {
    setModalNoticeId(id);
    setModalType(isChecked ? "remove" : "add");
    setModalTarget(target);
    setIsModalOpen(true);
  };

  // 모달에서 예/아니요 선택할 때
  const handleModalAction = async (confirm: boolean) => {
    if (confirm && modalNoticeId !== null && modalTarget !== null) {
      try {
        if (modalTarget === "member") {
          await patchMemberSlideCheck({
            noticeId: modalNoticeId,
            isMemberSlide: modalType === "add",
          });
        } else if (modalTarget === "owner") {
          await patchOwnerSlideCheck({
            noticeId: modalNoticeId,
            isOwnerSlide: modalType === "add",
          });
        }
        await refetch();
      } catch (error) {
        console.error("API 요청 중 오류 발생:", error);
      }
    }
    setIsModalOpen(false);
    setModalNoticeId(null);
    setModalType(null);
    setModalTarget(null);
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const day = date.getDate().toString().padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  if (isLoading) {
    return <LoadingSpinner />;
  }

  return (
    <div className="w-full pl-[7px]">
      <h1 className="adminTitle">공지사항</h1>
      <div className="pr-[7px] min-w-[920px]">
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

        {/* 테이블 */}
        <div className="mt-[26px] min-h-[550px] whitespace-nowrap">
          <table className="w-full table-fixed border border-gray-450">
            <thead className="bg-blue-100 border-b border-gray-450">
              <tr className="h-[50px] text-[13px] text-black-700">
                <th className="pr-4 pl-10 py-2 w-[60px] text-center">순번</th>
                <th className="px-4 py-2 w-[60px] text-center">이미지</th>
                <th className="px-4 py-2 w-[180px] text-left">제목</th>
                <th className="px-4 py-2 w-[70px] text-left">카테고리</th>
                <th className="px-4 py-2 w-[80px] text-left">게시일</th>
                <th className="px-4 py-2 w-[70px] text-left">상태</th>
                <th className="px-4 pr-10 py-2 w-[80px] text-center">회원 페이지<br />슬라이드 게시</th>
                <th className="px-4 pr-10 py-2 w-[80px] text-center">시설 페이지<br />슬라이드 게시</th>
              </tr>
            </thead>

            <tbody>
              {data?.result.content.map((notice: Notice) => (
                <tr key={notice.id} className="border-b border-gray-450 h-[50px] text-[12px]">
                  <td className="pr-4 pl-10 py-2 text-center">{notice.id}</td>
                  <td className="px-4 py-2">
                    <span className="flex justify-center items-center mx-auto">
                      {notice.imageUrl && notice.imageUrl !== "none" ? <IcImage width={19.5} /> : ""}
                    </span>
                  </td>
                  <td
                    className={`px-4 py-2 text-left min-w-[260px] overflow-hidden text-ellipsis whitespace-nowrap`}
                    onClick={() => {
                      if (notice.status !== "임시저장") {
                        navigate(`/admin/notice/edit/${notice.id}`);
                      } else {
                        alert("임시저장 상태의 글은 수정할 수 없습니다.");
                      }
                    }}
                  >
                    {notice.title}
                  </td>
                  <td className="px-4 py-2">{notice.category}</td>
                  <td className="px-4 py-2">{formatDate(notice.createdAt)}</td>
                  <td className="px-4 py-2">{notice.status}</td>

                  {/* member 체크박스 */}
                  <td className="px-4 pr-10 py-2 text-center">
                    <span className="flex justify-center items-center cursor-pointer">
                      {notice.isMemberHomeSlide ? (
                        <IcCheckFull width={24} onClick={() => handleCheckboxChange(notice.id, true, "member")} />
                      ) : (
                        <IcCheckEmpty width={24} onClick={() => handleCheckboxChange(notice.id, false, "member")} />
                      )}
                    </span>
                  </td>

                  {/* owner 체크박스 */}
                  <td className="px-4 pr-10 py-2 text-center">
                    <span className="flex justify-center items-center cursor-pointer">
                      {notice.isOwnerHomeSlide ? (
                        <IcCheckFull width={24} onClick={() => handleCheckboxChange(notice.id, true, "owner")} />
                      ) : (
                        <IcCheckEmpty width={24} onClick={() => handleCheckboxChange(notice.id, false, "owner")} />
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
          <button onClick={() => currentPage > 1 && handlePageChange(currentPage - 1)} disabled={currentPage === 1}>
            <SvgIcLeftPage width={5} />
          </button>

          {Array.from({ length: endPage - startPage + 1 }, (_, index) => (
            <button
              key={startPage + index}
              onClick={() => handlePageChange(startPage + index)}
              className={`text-sm ${currentPage === startPage + index ? "text-gray-600" : "text-gray-350"}`}
            >
              {startPage + index}
            </button>
          ))}

          <button
            onClick={() => currentPage < totalPages && handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
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
                ? "슬라이드에 게시하겠습니까?"
                : "슬라이드 게시를 취소하겠습니까?"}
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
