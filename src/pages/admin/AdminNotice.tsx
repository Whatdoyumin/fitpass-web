import { useState } from "react";
import { IcCheckEmpty, IcCheckFull, IcImage, IcSearch } from "../../assets/svg";
import { useNavigate } from "react-router-dom";

interface Notice {
  id: number;
  title: string;
  image: boolean;
  category: string;
  publishDate: string;
  status: string;
  isHomeSlide: boolean;
}

function AdminNotice() {
  const itemsPerPage = 10;

  const handleCheckboxChange = (id: number) => {
    setCheckedNotices((prevCheckedNotices) => {
      if (prevCheckedNotices.includes(id)) {
        return prevCheckedNotices.filter((noticeId) => noticeId !== id);
      } else if (prevCheckedNotices.length < 3) {
        return [...prevCheckedNotices, id];
      } else {
        console.log("홈 슬라이드 게시 항목은 최대 3개까지 선택 가능합니다.");
        return prevCheckedNotices;
      }
    });
  };

  const mockNotices: Notice[] = [
    {
      id: 1,
      title: "공지사항 제목 1",
      image: true,
      category: "공지",
      publishDate: "2024-01-05",
      status: "게시중",
      isHomeSlide: false,
    },
    {
      id: 2,
      title: "공지사항 제목 2",
      image: false,
      category: "이벤트",
      publishDate: "2024-01-06",
      status: "게시중",
      isHomeSlide: false,
    },
    {
      id: 3,
      title: "공지사항 제목 3",
      image: true,
      category: "이벤트",
      publishDate: "2024-01-07",
      status: "임시저장",
      isHomeSlide: false,
    },
    {
      id: 4,
      title: "공지사항 제목 4번입니다요~",
      image: true,
      category: "공지",
      publishDate: "2024-01-07",
      status: "게시중",
      isHomeSlide: true,
    },
    {
      id: 5,
      title: "공지사항 제목 5",
      image: true,
      category: "공지",
      publishDate: "2024-01-05",
      status: "게시중",
      isHomeSlide: false,
    },
    {
      id: 6,
      title: "공지사항 제목 6",
      image: false,
      category: "이벤트",
      publishDate: "2024-01-06",
      status: "게시중",
      isHomeSlide: false,
    },
    {
      id: 7,
      title: "공지사항 제목 7",
      image: true,
      category: "공지",
      publishDate: "2024-01-07",
      status: "게시중",
      isHomeSlide: false,
    },
    {
      id: 8,
      title: "공지사항 제목 8",
      image: true,
      category: "공지",
      publishDate: "2024-01-05",
      status: "게시중",
      isHomeSlide: false,
    },
    {
      id: 9,
      title: "공지사항 제목 9",
      image: false,
      category: "이벤트",
      publishDate: "2024-01-06",
      status: "게시중",
      isHomeSlide: false,
    },
    {
      id: 10,
      title: "공지사항 제목 10",
      image: true,
      category: "이벤트",
      publishDate: "2024-01-07",
      status: "임시저장",
      isHomeSlide: false,
    },
    {
      id: 11,
      title: "공지사항 제목 11",
      image: false,
      category: "공지",
      publishDate: "2024-01-05",
      status: "게시중",
      isHomeSlide: true,
    },
    {
      id: 12,
      title: "공지사항 제목 12",
      image: true,
      category: "이벤트",
      publishDate: "2024-01-06",
      status: "게시중",
      isHomeSlide: false,
    },
    {
      id: 13,
      title: "공지사항 제목 13",
      image: true,
      category: "이벤트",
      publishDate: "2024-02-06",
      status: "게시중",
      isHomeSlide: true,
    },
    {
      id: 14,
      title: "공지사항 제목 14",
      image: true,
      category: "공지사항",
      publishDate: "2024-02-09",
      status: "게시중",
      isHomeSlide: true,
    },
  ];

  const pageNumbers = [];
  const totalPages = Math.ceil(mockNotices.length / itemsPerPage);

  for (let i = 1; i <= totalPages; i++) {
    pageNumbers.push(i);
  }

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };
  const [checkedNotices, setCheckedNotices] = useState<number[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentNotices = mockNotices.reverse().slice(indexOfFirstItem, indexOfLastItem);
  const navigate = useNavigate();

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
                <td className="px-4 py-2 text-center min-w-[80px]">{notice.id}</td>
                <td className="px-4 py-2">
                  <span className="flex justify-center min-w-[80px] items-center">
                    {notice.image ? <IcImage width={19.5} /> : ""}
                  </span>
                </td>
                <td className="px-4 py-2 text-left min-w-[260px] overflow-hidden text-ellipsis whitespace-nowrap">
                  {notice.title}
                </td>
                <td className="px-4 py-2 min-w-[110px]">{notice.category}</td>
                <td className="px-4 py-2 min-w-[110px]">{notice.publishDate}</td>
                <td className="px-4 py-2 min-w-[110px]">{notice.status}</td>
                <td className="px-4 py-2 min-w-[180px] text-center border-b border-gray-450">
                  <input
                    type="checkbox"
                    checked={checkedNotices.includes(notice.id)}
                    onChange={() => handleCheckboxChange(notice.id)}
                    className="hidden"
                  />
                  <span className="flex justify-center items-center">
                    {checkedNotices.includes(notice.id) ? (
                      <IcCheckFull width={24} />
                    ) : (
                      <IcCheckEmpty width={24} />
                    )}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* 작성하기 버튼 */}
      <div className="flex pt-[50px] justify-end pr-[12px]">
        <button
          className="bg-blue-500 text-white-100 w-[150px] h-[51px] py-[14px] rounded-5 text-[15px]"
          onClick={() => navigate("/admin/notice/upload")}
        >
          작성하기
        </button>
      </div>

      {/* 페이지네이션 */}
      <div className="flex justify-center item-center pt-[20px]">
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="px-4 py-2 text-gray-350"
        >
          &lt;
        </button>
        {pageNumbers.slice(0, 5).map((pageNumber) => (
          <button
            key={pageNumber}
            onClick={() => handlePageChange(pageNumber)}
            className={`px-4 py-2 text-sm ${
              currentPage === pageNumber ? "text-gray-600" : "text-gray-350"
            }`}
          >
            {pageNumber}
          </button>
        ))}
        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="px-4 py-2 text-gray-350"
        >
          &gt;
        </button>
      </div>
    </div>
  );
}

export default AdminNotice;
