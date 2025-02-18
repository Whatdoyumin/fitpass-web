import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { IcCloseBtn, IcFontBold, IcFontUnderline, IcImage } from "../../assets/svg";
import { mockDraftNotices, DraftNotice } from "../../mocks/mockNotices";

function AdminNoticeUpload() {
  const [title, setTitle] = useState("");
  const [image, setImage] = useState("");
  const [selectedType, setSelectedType] = useState<"공지" | "이벤트">("공지");
  const [showModal, setShowModal] = useState(false);
  const [showSaveModal, setShowSaveModal] = useState(false); // 새로운 상태 추가
  const [selectedNotice, setSelectedNotice] = useState<DraftNotice | null>(null);

  const navigate = useNavigate();

  // 이미지 추가 함수
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImage(file.name);
    }
  };

  const closeModal = () => {
    setShowModal(false);
  };

  const handleConfirm = () => {
    navigate("/admin/notice");
  };

  const toggleSaveModal = () => {
    setShowSaveModal(!showSaveModal); // 저장 목록 모달 토글
  };

  // 볼드, 언더라인
  const toggleTextStyle = (style: string) => {
    document.execCommand(style, false);
  };

  // 게시하기 버튼 활성화 조건
  const isSubmitDisabled = !title;

  // '임시저장' 상태인 항목만 필터링, 순서를 거꾸로
  const tempSavedNotices = mockDraftNotices.filter((item) => item.status === "임시저장").reverse();

  // 저장 목록 항목 클릭 시 해당 공지사항 정보 로드
  const handleNoticeClick = (notice: DraftNotice) => {
    setSelectedNotice(notice);
    setTitle(notice.title);
    setImage(notice.image);
    setSelectedType(notice.category === "공지사항" ? "공지" : "이벤트"); // category에 맞게

    // 내용도 가져오기
    const contentElement = document.querySelector("[contenteditable]");
    if (contentElement) {
      contentElement.innerHTML = notice.content; // 저장된 내용 입력
    }

    // 모달 닫기
    setShowSaveModal(false);
  };

  return (
    <div className="w-full px-[7px]">
      <h1 className="adminTitle">공지사항 → 게시글 작성</h1>
      <div className="px-[60px] pt-[45px] pb-[20px]">
        {/* 제목 입력 */}
        <div className="mb-[19px] flex items-center gap-[17px] text-14px">
          <label className="min-w-[46px] text-gray-700">제목</label>
          <input
            type="text"
            value={title || selectedNotice?.title || ""}
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
              value={image || selectedNotice?.image || ""}
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
            contentEditable
            className="w-full min-h-[460px] border border-gray-450 p-4 focus:outline-none text-12px text-black-700 placeholder-black-700"
            style={{
              resize: "none",
            }}
            dangerouslySetInnerHTML={{ __html: selectedNotice?.content || "" }}
          />
        </div>
        
        {/* 버튼 */}
        <div className="flex justify-end gap-[23px]">
          <button
            onClick={toggleSaveModal} // 저장 목록 모달 열기
            className="w-[150px] h-[51px] py-2 bg-white-100 text-blue-500 border border-blue-500 rounded-md"
          >
            저장 목록 ({tempSavedNotices.length})
          </button>
          <button
            onClick={() => {}}
            className="w-[150px] h-[51px] py-2 bg-white-100 text-blue-500 border border-blue-500 rounded-md"
            disabled={isSubmitDisabled} // 제목 없으면 비활성화
          >
            임시 저장
          </button>
          <button
            onClick={() => setShowModal(true)}
            className={`w-[150px] h-[51px] py-2 bg-blue-500 text-white-100 border rounded-md`}
            disabled={isSubmitDisabled} // 제목 없으면 비활성화
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
              <button onClick={handleConfirm} className="w-[100%] py-4 bg-blue-500 rounded-md">
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
                    className={`text-16px py-[20px] ${
                      index < tempSavedNotices.length - 1 ? "border-b border-gray-300" : ""
                    }`}
                    onClick={() => handleNoticeClick(notice)} // 항목 클릭 시 데이터 설정
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
