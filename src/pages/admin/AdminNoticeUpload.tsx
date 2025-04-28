import { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { IcCloseBtn, IcFontBold, IcFontUnderline, IcImage } from "../../assets/svg";
import {
  useGetAdminNotice,
  useGetNoticeDetail,
  usePostAdminDraftNotice,
  usePostAdminNotice,
  usePatchAdminNotice,
  DraftNotice,
  FullEditNoticeForm,
  FullNoticeForm,
} from "../../apis/adminNotice/quries/useAdminNoticeUploadApi";
import { LoadingSpinner } from "../../components/LoadingSpinner";

function AdminNoticeUpload() {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEditMode = !!id;

  const [title, setTitle] = useState("");
  const [image, setImage] = useState<File | string>("");
  const [selectedType, setSelectedType] = useState<"공지" | "이벤트">("공지");
  const [memberSlide, setMemberSlide] = useState(true);
  const [ownerSlide, setOwnerSlide] = useState(true);
  const [content, setContent] = useState<string>("");
  const [showModal, setShowModal] = useState(false);
  const [showSaveModal, setShowSaveModal] = useState(false);

  const [selectedNoticeId, setSelectedNoticeId] = useState<number | undefined>();

  const { mutate: postNotice } = usePostAdminNotice();
  const { mutate: editNotice } = usePatchAdminNotice();
  const { mutate: saveDraft } = usePostAdminDraftNotice();

  const { data: tempSavedNotices } = useGetAdminNotice();
  const { data: noticeDetail, isLoading, error } = useGetNoticeDetail(
    selectedNoticeId ?? (isEditMode ? Number(id) : undefined)
  );

  const contentRef = useRef<HTMLDivElement>(null);
  const tempNotices = tempSavedNotices?.notices || [];

  useEffect(() => {
    if (noticeDetail) {
      setTitle(noticeDetail.title);
      setContent(noticeDetail.content);
      setSelectedType(noticeDetail.category === "ANNOUNCEMENT" ? "공지" : "이벤트");
      setImage(noticeDetail.imageUrl || "");
    }
  }, [noticeDetail]);

  useEffect(() => {
    if (contentRef.current && content !== contentRef.current.innerHTML.trim()) {
      contentRef.current.innerHTML = content;
    }
  }, [content]);

  const toggleTextStyle = (style: string) => {
    document.execCommand(style, false);
    handleContentChange();
  };

  const handleContentChange = () => {
    if (contentRef.current) {
      setContent(contentRef.current.innerHTML);
    }
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImage(file);
    }
  };

  const handleSubmit = () => {
    if (!title || !content || !selectedType) {
      alert("모든 필드를 입력해주세요.");
      return;
    }
    setShowModal(true);
  };

  const handlePostNotice = () => {
    const payload = {
      id: isEditMode ? Number(id) : undefined,
      title,
      content,
      type: selectedType === "공지" ? "ANNOUNCEMENT" : "EVENT",
      image,
      memberSlide,
      ownerSlide,
    };

    const commonOptions = {
      onSuccess: () => {
        setShowModal(false);
        navigate("/admin/notice");
      },
    };

    if (isEditMode) {
      editNotice(payload as FullEditNoticeForm , commonOptions);
    } else {
      postNotice(payload as FullNoticeForm, commonOptions);
    }
  };

  const handleSaveDraft = () => {
    if (!title) {
      alert("제목을 입력해야 임시 저장할 수 있어요.");
      return;
    }

    if (image instanceof File || typeof image === "string") {
      saveDraft(
        {
          id: isEditMode ? Number(id) : undefined,
          title,
          content,
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

  const handleNoticeClick = (notice: DraftNotice) => {
    setShowSaveModal(false);
    setSelectedNoticeId(notice.id);
  };

  if (isLoading) return <LoadingSpinner />;

  return (
    <div className="w-full px-[7px]">
      <h1 className="adminTitle">공지사항 → {isEditMode ? "게시글 수정" : "게시글 작성"}</h1>

      <div className="min-w-[500px] px-[60px] pt-[45px] pb-[20px]">
        {/* 제목 + 카테고리 */}
        <div className="mb-[19px] flex items-center gap-[20px]">
          <div className="flex-grow flex items-center gap-[17px]">
            <label className="min-w-[46px] text-gray-700">제목</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="h-[40px] border border-gray-450 rounded-[3px] p-2 flex-grow focus:outline-none"
            />
          </div>
          <div className="flex gap-[6px]">
            <button
              onClick={() => setSelectedType("공지")}
              className={`w-[70px] h-[30px] border rounded-full ${selectedType === "공지" ? "bg-blue-100 border-blue-400" : "bg-white border-gray-300"}`}
            >
              공지
            </button>
            <button
              onClick={() => setSelectedType("이벤트")}
              className={`w-[70px] h-[30px] border rounded-full ${selectedType === "이벤트" ? "bg-blue-100 border-blue-400" : "bg-white border-gray-300"}`}
            >
              이벤트
            </button>
          </div>
        </div>

        {/* 이미지 + 슬라이드 선택 */}
        <div className="mb-[35px] flex items-center justify-between gap-[20px] text-14px">
          <div className="flex gap-[17px] flex-grow items-center">
            <label className="min-w-[46px] text-gray-700">이미지</label>
            <div className="relative w-full">
              <input
                type="text"
                value={typeof image === "string" ? image : image?.name || ""}
                readOnly
                className="w-full h-[40px] border border-gray-450 rounded-[3px] p-2 pr-[50px] overflow-hidden"
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
          <div className="flex gap-[6px]">
            <button
              onClick={() => setMemberSlide(!memberSlide)}
              className={`w-[70px] h-[30px] border rounded-full ${memberSlide ? "bg-blue-100 border-blue-400" : "bg-white border-gray-300"}`}
            >
              회원
            </button>
            <button
              onClick={() => setOwnerSlide(!ownerSlide)}
              className={`w-[70px] h-[30px] border rounded-full ${ownerSlide ? "bg-blue-100 border-blue-400" : "bg-white border-gray-300"}`}
            >
              시설
            </button>
          </div>
        </div>

        {/* 스타일 토글 */}
        <div className="flex h-[40px] gap-[51px] bg-blue-100 border-t border-x border-gray-450">
          <button onClick={() => toggleTextStyle("bold")} className="pl-[30px]">
            <IcFontBold width={28} />
          </button>
          <button onClick={() => toggleTextStyle("underline")}>
            <IcFontUnderline width={28} />
          </button>
        </div>

        {/* 내용 입력 */}
        <div className="mb-[35px]">
          <div
            ref={contentRef}
            contentEditable
            className="w-full h-[200px] border border-gray-450 px-[19px] py-[22px] focus:outline-none text-12px overflow-y-auto"
            onInput={handleContentChange}
          >
          </div>
        </div>

        {/* 버튼 */}
        <div className="flex justify-end gap-[20px]">
          {!isEditMode && (
            <>
              <button
                onClick={() => setShowSaveModal(true)}
                className="min-w-[150px] h-[51px] py-2 bg-white-100 text-blue-500 border border-blue-500 rounded-md"
              >
                저장 목록 ({tempNotices.length})
              </button>
              <button
                onClick={handleSaveDraft}
                className="min-w-[150px] h-[51px] py-2 bg-white-100 text-blue-500 border border-blue-500 rounded-md"
              >
                임시 저장
              </button>
            </>
          )}
          <button
            onClick={handleSubmit}
            className="min-w-[150px] h-[51px] py-2 bg-blue-500 text-white-100 border rounded-md"
          >
            {isEditMode ? "수정하기" : "게시하기"}
          </button>
        </div>
      </div>

      {/* 모달 */}
      {showModal && (
        <div className="fixed inset-0 bg-black-700 bg-opacity-50 flex justify-center items-center z-10">
          <div className="bg-white-100 p-[30px] pt-[40px] rounded-lg shadow-lg w-[480px]">
            <p className="text-center text-[25px] py-2 font-extrabold">
              {isEditMode ? "수정하시겠습니까?" : "게시하시겠습니까?"}
            </p>
            <div className="flex justify-around mt-[50px] gap-[20px] text-18px text-white-100">
              <button onClick={() => setShowModal(false)} className="w-[100%] py-4 bg-blue-250 rounded-md">
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
              <button onClick={() => setShowSaveModal(false)} className="text-[22px] text-gray-600">
                <IcCloseBtn width={14} />
              </button>
            </div>
            <div className="overflow-y-auto max-h-[300px] mt-[20px] px-[30px] border-t border-gray-300 pt-[5px]">
              <ul>
                {tempNotices.map((notice: DraftNotice) => (
                  <li
                    key={notice.id}
                    onClick={() => handleNoticeClick(notice)}
                    className="text-16px py-[20px] overflow-hidden whitespace-nowrap text-ellipsis border-b border-gray-300 cursor-pointer"
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
