import { useNavigate } from "react-router-dom";
import SvgLocation from "../../assets/svg/Location";
import { HomeCardData } from "../../types/HomeCardData";
import { handleSaveToLocalStorage } from "../../utils/storageUtils";

type CardColProps = {
  data: HomeCardData;
};

function CardCol({ data }: CardColProps) {
  const navigate = useNavigate();

  // 로컬 스토리지 저장 및 상세 페이지로 이동
  const handleClickCard = () => {
    handleSaveToLocalStorage(data);
    navigate(`/fitness/${data.fitnessId}`);
  };

  return (
    <div className="w-[143px] h-[140px] flex flex-col mb-0.5">
      <img
        src={data.imageUrl}
        alt="썸네일"
        className="w-full h-[107px] object-cover rounded-t overflow-hidden"
        onClick={() => handleClickCard()}
      />
      <div className="h-9 bg-white-100 rounded flex items-center justify-between gap-[10px] shadow-md">
        <span className="text-[11px] font-medium text-ellipsis overflow-hidden whitespace-nowrap flex-grow pl-[10px] ">
          {data.name}
        </span>
        <div className="h-full flex items-center gap-1 content-center pr-[10px] ">
          <SvgLocation className="w-[7px] h-[9px]" />
          <span className="text-[9px] text-gray-600">{Math.floor(data.distance)}km</span>
        </div>
      </div>
    </div>
  );
}

export default CardCol;
