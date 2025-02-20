import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { IcCloseBtn, IcFontBold, IcFontUnderline, IcImage } from "../../assets/svg";
import {
  DraftNotice,
  useGetAdminNotice,
  useGetNoticeDetail,
  usePostAdminDraftNotice,
  usePostAdminNotice,
} from "../../apis/adminNotice/quries/useAdminNoticeUploadApi";
import { LoadingSpinner } from "../../components/LoadingSpinner";

function AdminNoticeUpload() {
  const [title, setTitle] = useState("");
  const [image, setImage] = useState<File | string>("");
  const [selectedType, setSelectedType] = useState<"공지" | "이벤트">("공지");
  const [showModal, setShowModal] = useState(false);
  const [showSaveModal, setShowSaveModal] = useState(false);
  const [content, setContent] = useState<string>("");

  const navigate = useNavigate();

  const { mutate: postNotice } = usePostAdminNotice();
  const { mutate: saveDraft } = usePostAdminDraftNotice();
  const { data } = useGetAdminNotice();

  // 이미지 추가 함수
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImage(file);
    }
  };

  const closeModal = () => {
    setShowModal(false);
  };

  const toggleSaveModal = () => {
    setShowSaveModal(!showSaveModal);
  };

  // 게시하기 버튼 활성화 조건
  const isSubmitDisabled = !(title && selectedType);

  const handleSubmit = () => {
    if (!(title && image && selectedType && content)) {
      alert("모든 필드를 입력해주세요.");
      return;
    }
    setShowModal(true);
  };

  // 제목 있어야 임시저장
  const isDraftSubmitDisabled = !title;

  // 임시저장 목록
  const tempSavedNotices = data?.notices ? [...data.notices] : [];
  const [selectedNoticeId, setSelectedNoticeId] = useState<number | undefined>();

  const {
    data: noticeDetail,
    isLoading,
    error,
  } = useGetNoticeDetail(selectedNoticeId ?? undefined);

  const handleNoticeClick = (notice: DraftNotice) => {
    setShowSaveModal(false);
    setSelectedNoticeId(notice.id);
  };

  // string 이미지를 파일명처럼
  function getFileNameFromPresignedUrl(url: string | File | undefined): string | undefined {
    if (url instanceof File) {
      return url.name;
    } else if (url === undefined) {
      return undefined;
    }

    try {
      const decodedUrl = decodeURIComponent(url); // URL 인코딩된 경우 대비
      const urlWithoutParams = decodedUrl.split("?")[0]; // 쿼리 스트링 제거
      const pathSegments = urlWithoutParams.split("/"); // '/' 기준으로 나누기
      return pathSegments.pop() || "none"; // 마지막 요소 반환
    } catch (error) {
      console.error("파일명 추출 실패:", error);
      return "none";
    }
  }

  useEffect(() => {
    if (selectedNoticeId !== undefined && selectedNoticeId !== null) {
      if (noticeDetail) {
        setTitle(noticeDetail.title);

        const contentElement = document.querySelector("[contenteditable]");
        if (contentElement) {
          contentElement.innerHTML = noticeDetail.content;
          setContent(noticeDetail.content);
        }

        setSelectedType(noticeDetail.category === "ANNOUNCEMENT" ? "공지" : "이벤트");

        const fileName = getFileNameFromPresignedUrl(noticeDetail.imageUrl);
        setImage(fileName || "");
      }
    }
  }, [selectedNoticeId, noticeDetail]);

  // 게시하기 버튼 클릭 시 API 호출
  const handlePostNotice = () => {
    if (image instanceof File || typeof image === "string") {
      postNotice(
        {
          id: selectedNoticeId,
          title,
          content,
          type: selectedType === "공지" ? "ANNOUNCEMENT" : "EVENT",
          image,
        },
        {
          onSuccess: () => {
            setShowModal(false);
            navigate("/admin/notice");
          },
          onError: (error) => {
            console.error("게시 실패:", error);
          },
        }
      );
    }
  };

  const contentRef = useRef<HTMLDivElement>(null);

  const handleContentChange = () => {
    if (contentRef.current) {
      const currentContent = contentRef.current.innerHTML;
      setContent(currentContent);
    }
  };

  useEffect(() => {
    if (contentRef.current && content !== contentRef.current.innerHTML.trim()) {
      contentRef.current.innerHTML = content || "";
    }
  }, [content]);

  const toggleTextStyle = (style: string) => {
    document.execCommand(style, false);
    handleContentChange();
  };

  const handleSaveDraft = () => {
    if (!title) return;

    if (image instanceof File || typeof image === "string") {
      saveDraft(
        {
          id: selectedNoticeId,
          title,
          content: content ? content : "",
          type: selectedType === "공지" ? "ANNOUNCEMENT" : "EVENT",
          image,
        },
        {
          onSuccess: () => {
            navigate("/admin/notice");
          },
        }
      );
    }
  };

  useEffect(() => {
    if (error) {
      alert(error.response?.data);
    }
  }, [error]);

  if (isLoading) {
    return <LoadingSpinner />;
  }

  const handlePaste = (e: React.ClipboardEvent<HTMLDivElement>) => {
    e.preventDefault(); // 기본 붙여넣기 동작을 방지
    const text = e.clipboardData.getData("text/plain"); // 순수 텍스트만 가져오기
    document.execCommand("insertText", false, text); // 텍스트만 삽입
  };

  return (
    <div className="w-full px-[7px]">
      <h1 className="adminTitle">공지사항 → 게시글 작성</h1>
      <div className="min-w-[500px] px-[60px] pt-[45px] pb-[20px]">
        {/* 제목 입력 */}
        <div className="mb-[19px] flex items-center gap-[17px] text-14px">
          <label className="min-w-[46px] text-gray-700">제목</label>
          <input
            type="text"
            value={title || ""}
            onChange={(e) => setTitle(e.target.value)}
            className="h-[40px] border border-gray-450 rounded-[3px] p-2 flex-grow focus:outline-none"
          />
          <div className="flex gap-[6px] text-13px">
            <button
              onClick={() => setSelectedType("공지")}
              className={`w-[70px] h-[30px] border rounded-full ${
                selectedType === "공지" ? "bg-blue-100 border-blue-400" : "bg-white border-gray-300"
              }`}
            >
              공지
            </button>
            <button
              onClick={() => setSelectedType("이벤트")}
              className={`w-[70px] h-[30px] border rounded-full ${
                selectedType === "이벤트"
                  ? "bg-blue-100 border-blue-400"
                  : "bg-white border-gray-300"
              }`}
            >
              이벤트
            </button>
          </div>
        </div>

        {/* 이미지 추가 */}
        <div className="mb-[35px] flex items-center gap-[17px] text-14px">
          <label className="min-w-[46px] text-gray-700">이미지</label>
          <div className="relative w-full">
            <input
              type="text"
              value={image === "none" ? "" : typeof image === "string" ? image : image?.name || ""}
              readOnly
              className="w-full h-[40px] border border-gray-450 rounded-[3px] p-2 pr-[50px] focus:outline-none overflow-hidden text-ellipsis whitespace-nowrap"
            />
            <div
              className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer"
              onClick={() => document.getElementById("imageInput")?.click()}
            >
              <IcImage width={24} />
            </div>
            <input
              type="file"
              id="imageInput"
              className="hidden"
              accept="image/*"
              onChange={handleImageChange}
            />
          </div>
        </div>

        {/* 스타일 토글 버튼 */}
        <div className="flex h-[40px] gap-[51px] bg-blue-100 border-t border-x border-gray-450">
          <button onClick={() => toggleTextStyle("bold")} className="pl-[30px] focus:outline-none">
            <IcFontBold width={28} />
          </button>
          <button onClick={() => toggleTextStyle("underline")} className="focus:outline-none">
            <IcFontUnderline width={28} />
          </button>
        </div>

        {/* 내용 입력 */}
        <div className="mb-[35px]">
          <div
            ref={contentRef}
            contentEditable
            className={`w-full h-[200px] resize-none border border-gray-450 px-[19px] py-[22px]
      focus:outline-none text-12px overflow-y-auto ${content ? content : ""}`}
            onInput={handleContentChange} // 내용 입력 시 상태 업데이트
            onPaste={handlePaste} 
          />
        </div>

        {/* 버튼 */}
        <div className="flex justify-end gap-[23px]">
          <button
            onClick={toggleSaveModal} // 저장 목록 모달 열기
            className="min-w-[150px] h-[51px] py-2 bg-white-100 text-blue-500 border border-blue-500 rounded-md"
          >
            저장 목록 ({tempSavedNotices.length})
          </button>
          <button
            onClick={handleSaveDraft} // 임시저장 함수 호출
            className="min-w-[150px] h-[51px] py-2 bg-white-100 text-blue-500 border border-blue-500 rounded-md"
            disabled={isDraftSubmitDisabled} // 제목 없으면 비활성화
          >
            임시 저장
          </button>
          <button
            onClick={handleSubmit}
            className={`min-w-[150px] h-[51px] py-2 bg-blue-500 text-white-100 border rounded-md`}
            disabled={isSubmitDisabled}
          >
            게시하기
          </button>
        </div>
      </div>

      {/* 게시하기 모달 */}
      {showModal && (
        <div className="fixed inset-0 bg-black-700 bg-opacity-50 flex justify-center items-center z-10">
          <div className="bg-white-100 p-[30px] pt-[40px] rounded-lg shadow-lg w-[480px]">
            <p className="text-center text-[25px] py-2 font-extrabold">게시하시겠습니까?</p>
            <div className="flex justify-around mt-[50px] text-18px text-white-100 gap-[20px]">
              <button onClick={closeModal} className="w-[100%] py-4 bg-blue-250 rounded-md">
                아니요
              </button>
              <button onClick={handlePostNotice} className="w-[100%] py-4 bg-blue-500 rounded-md">
                예
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 저장 목록 모달 */}
      {showSaveModal && (
        <div className="fixed inset-0 flex justify-center items-center z-10">
          <div className="bg-white-100 pt-[22px] pb-[8px] w-[430px] h-[440px] rounded-lg border border-black-700">
            <div className="flex justify-between px-[30px] items-center">
              <p className="text-center text-[22px] py-2 text-gray-600 font-extrabold">저장 목록</p>
              <button onClick={toggleSaveModal} className="text-[22px] text-gray-600">
                <IcCloseBtn width={14} />
              </button>
            </div>
            <div className="overflow-y-auto max-h-[300px] mt-[20px] px-[30px] border-t border-gray-300 pt-[5px]">
              <ul>
                {tempSavedNotices.map((notice, index) => (
                  <li
                    key={notice.id}
                    className={`text-16px py-[20px] overflow-hidden whitespace-nowrap text-ellipsis ${
                      index < tempSavedNotices.length - 1 ? "border-b border-gray-300" : ""
                    }`}
                    onClick={() => handleNoticeClick(notice)}
                  >
                    {notice.title}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default AdminNoticeUpload;
