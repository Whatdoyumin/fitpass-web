import { useRef } from "react";
import FileUpload from "../../../assets/img/adminImgFile.png";

interface SubImgUploadProps {
  subImg: File[];
  setSubImg: React.Dispatch<React.SetStateAction<File[]>>;
  disabled?: boolean;
}

function SubImgUpload({ subImg, setSubImg, disabled = false }: SubImgUploadProps) {
  const subInputRef = useRef<HTMLInputElement>(null);

  const handleSubImgChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (disabled) return;
    if (event.target.files) {
      const filesArray = Array.from(event.target.files);
      setSubImg(filesArray);
    }
  };

  const handleClickFileUpload = () => {
    if (disabled) return;
    subInputRef.current?.click();
  };

  return (
    <div className="flex flex-col gap-4">
      <label htmlFor="subImg">추가 이미지</label>
      <div className="relative">
        <input
          type="text"
          value={subImg.map((file) => file.name).join(", ")}
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
          id="subImg"
          accept="image/*"
          ref={subInputRef}
          multiple
          hidden
          onChange={handleSubImgChange}
        />
      </div>
    </div>
  );
}

export default SubImgUpload;
