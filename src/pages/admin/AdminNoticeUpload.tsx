import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  IcFontBold,
  IcFontItalic,
  IcFontStrikethrough,
  IcFontUnderline,
  IcImage,
} from "../../assets/svg";

function AdminNoticeUpload() {
  const [title, setTitle] = useState("");
  const [image, setImage] = useState("");
  const [content, setContent] = useState("");
  const [isBold, setIsBold] = useState(false);
  const [isItalic, setIsItalic] = useState(false);
  const [isUnderlined, setIsUnderlined] = useState(false);
  const [isStrikethrough, setIsStrikethrough] = useState(false);
  const [selectedType, setSelectedType] = useState<"공지" | "이벤트">("공지");
  const [showModal, setShowModal] = useState(false);

  const navigate = useNavigate();

  const toggleTextStyle = (style: string) => {
    switch (style) {
      case "bold":
        setIsBold(!isBold);
        break;
      case "italic":
        setIsItalic(!isItalic);
        break;
      case "underline":
        setIsUnderlined(!isUnderlined);
        if (isStrikethrough) {
          setIsStrikethrough(false);
        }
        break;
      case "strikethrough":
        setIsStrikethrough(!isStrikethrough);
        if (isUnderlined) {
          setIsUnderlined(false);
        }
        break;
      default:
        break;
    }
  };

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

  return (
    <div className="w-full px-[7px]">
      <h1 className="adminTitle">공지사항 게시글 작성</h1>
      <div className="px-[60px] pt-[45px] pb-[20px]">
        
        {/* 제목 입력 */}
        <div className="mb-[19px] flex items-center gap-[17px] text-14px">
          <label className="min-w-[46px] text-gray-700">제목</label>
          <input
            type="text"
            value={title}
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
              value={image}
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
        <div className="flex h-[40px] gap-[51px] bg-blue-100 border-t border-x border-gray-450 ">
          <button onClick={() => toggleTextStyle("bold")} className="pl-[18px]">
            <IcFontBold width={28} />
          </button>
          <button onClick={() => toggleTextStyle("italic")}>
            <IcFontItalic width={28} />
          </button>
          <button onClick={() => toggleTextStyle("underline")}>
            <IcFontUnderline width={28} />
          </button>
          <button onClick={() => toggleTextStyle("strikethrough")}>
            <IcFontStrikethrough width={28} />
          </button>
        </div>

        {/* 내용 입력 */}
        <div className="mb-[35px]">
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="w-full min-h-[460px] border border-gray-450 p-4 focus:outline-none text-12px text-black-700 placeholder-black-700"
            placeholder="내용을 입력해주세요"
            style={{
              fontWeight: isBold ? "bold" : "normal",
              fontStyle: isItalic ? "italic" : "normal",
              textDecoration: isUnderlined
                ? "underline"
                : isStrikethrough
                ? "line-through"
                : "none",
              resize: "none",
            }}
          />
        </div>

        <div className="flex justify-end gap-[23px]">
          <button
            onClick={() => {}}
            className="w-[150px] h-[51px] px-6 py-2 bg-white-100 text-blue-500 border border-blue-500 rounded-md"
          >
            임시 저장
          </button>
          <button
            onClick={() => setShowModal(true)}
            className="w-[150px] h-[51px] px-6 py-2 bg-blue-500 text-white-100 border rounded-md"
          >
            게시하기
          </button>
        </div>
      </div>

      {/* 모달 */}
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
    </div>
  );
}

export default AdminNoticeUpload;
