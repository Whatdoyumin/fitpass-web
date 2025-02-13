import { useRef } from "react";
import FileUpload from "../../../assets/img/adminImgFile.png"

interface MainImgUploadProps {
  mainImg: string;
  setMainImg: React.Dispatch<React.SetStateAction<string>>;
}

function MainImgUpload({mainImg, setMainImg }: MainImgUploadProps) {
  // const [mainImg, setMainImg] = useState<string>("");

  const mainInputRef = useRef<HTMLInputElement>(null);

  const handleMainFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      setMainImg(event.target.files[0].name);
    }
  }

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
        className="w-full h-[30px] border border-gray-450 rounded-[3px] text-ellipsis overflow-hidden whitespace-nowrap pr-[40px] pl-2 text-[12px] focus:outline-none"
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