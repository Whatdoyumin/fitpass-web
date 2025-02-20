import { useNavigate } from "react-router-dom";
import SvgLocation from "../../assets/svg/Location";
import { HomeCardData } from "../../types/HomeCardData";
import { handleSaveToLocalStorage } from "../../utils/storageUtils";
import { useState } from "react";

type CardColProps = {
  data: HomeCardData;
};

function CardCol({ data }: CardColProps) {
  const navigate = useNavigate();
  const fitnessImg = "https://cdn.pixabay.com/photo/2017/08/16/09/39/dumbbells-2646970_1280.jpg";

  const [imageSrc, setImageSrc] = useState(data.imageUrl || fitnessImg);

  const handleClickCard = () => {
    handleSaveToLocalStorage(data);
    navigate(`/fitness/${data.fitnessId}`);
  };

  return (
    <div className="w-[143px] h-[140px] flex flex-col mb-0.5">
      <img
        src={imageSrc}
        alt="썸네일"
        className="w-full h-[107px] object-cover rounded-t overflow-hidden"
        onClick={handleClickCard}
        onError={() => setImageSrc(fitnessImg)} // 이미지 로드 실패 시 대체 이미지로 변경
      />
      <div className="h-9 bg-white-100 rounded flex items-center justify-between gap-[10px] shadow-[0px_4px_20px_rgba(0,0,0,0.1)]">
        <span className="text-[11px] font-medium text-ellipsis overflow-hidden whitespace-nowrap flex-grow pl-[10px]">
          {data.fitnessName}
        </span>
        <div className="h-full flex items-center gap-1 content-center pr-[10px]">
          <SvgLocation className="w-[7px] h-[9px]" />
          <span className="text-[9px] text-gray-600">{Math.floor(data.distance)}km</span>
        </div>
      </div>
    </div>
  );
}

export default CardCol;
