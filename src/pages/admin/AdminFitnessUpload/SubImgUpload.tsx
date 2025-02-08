import { useRef, useState } from "react";
import FileUpload from "../../../assets/img/adminImgFile.png"

function SubImgUpload() {

  const [subImg, setSubImg] = useState<string[]>([]);

  const handleSubImgChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      setSubImg(Array.from(event.target.files).map((file) => file.name));
    }
  }

  const subInputRef = useRef<HTMLInputElement>(null);

  const handleClickFileUpload = () => {
    subInputRef.current?.click();
  }

  return(
    <div className="flex flex-col">
    <label htmlFor="subImg"></label>
      추가 이미지
    <div className="relative">
      <input
        type="text"
        value={subImg.join(", ")}
        className="w-[300px] h-[30px] border border-gray-450 rounded-[3px] text-ellipsis overflow-hidden whitespace-nowrap pr-[40px]"
        readOnly
      />
      <img
        src={FileUpload}
        alt="파일 업로드" 
        onClick={handleClickFileUpload}
        className="absolute right-2 top-1/2 transform -translate-y-1/2"
      />
      <input 
        type="file" 
        id="subImg"
        accept = "image/*"
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