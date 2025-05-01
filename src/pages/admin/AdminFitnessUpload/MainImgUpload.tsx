import { useRef } from "react";
import FileUpload from "../../../assets/img/adminImgFile.png";

interface MainImgUploadProps {
  mainImg: File | null;
  setMainImg: React.Dispatch<React.SetStateAction<File | null>>;
  disabled?: boolean;
}

function MainImgUpload({ mainImg, setMainImg, disabled = false }: MainImgUploadProps) {
  const mainInputRef = useRef<HTMLInputElement>(null);

  const handleMainFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (disabled) return;
    if (event.target.files && event.target.files.length > 0) {
      setMainImg(event.target.files[0]);
    }
  };

  const handleClickFileUpload = () => {
    if (disabled) return;
    mainInputRef.current?.click();
  };

  return (
    <div className="flex flex-col gap-4">
      <label htmlFor="mainImg">대표 이미지</label>
      <div className="relative">
        <input
          type="text"
          value={mainImg ? mainImg.name : ""}
          className="w-full h-[30px] border border-gray-450 rounded-[3px] text-ellipsis overflow-hidden whitespace-nowrap pr-[40px] pl-2 text-[12px] focus:outline-none"
          readOnly
        />
        <img
          src={FileUpload}
          alt="파일 업로드"
          onClick={handleClickFileUpload}
          className={`absolute right-2 top-1/2 transform -translate-y-1/2 cursor-pointer ${
            disabled ? "opacity-50 pointer-events-none" : ""
          }`}
        />
        <input
          type="file"
          id="mainImg"
          accept="image/*"
          ref={mainInputRef}
          hidden
          onChange={handleMainFileChange}
        />
      </div>
    </div>
  );
}

export default MainImgUpload;
