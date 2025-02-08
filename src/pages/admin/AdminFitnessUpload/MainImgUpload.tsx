import { useState, useRef } from "react";
import FileUpload from "../../../assets/img/adminImgFile.png"

function MainImgUpload() {
  const [mainImg, setMainImg] = useState<string>("");

  const handleMainFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      setMainImg(event.target.files[0].name);
    }
  }

  const mainInputRef = useRef<HTMLInputElement>(null);

  const handleClickFileUpload = () => {
    mainInputRef.current?.click();
  }

  return(            
  <div className="flex flex-col">
    <label htmlFor="mainImg"></label>
      대표 이미지
    <div className="relative">
      <input
        type="text"
        value={mainImg}
        className="w-[300px] h-[30px] border border-gray-450 rounded-[3px] "
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
        id="mainImg"
        accept = "image/*"
        ref={mainInputRef}
        hidden
        onChange={handleMainFileChange}
      />
    </div>
  </div>
  );
}

export default MainImgUpload;