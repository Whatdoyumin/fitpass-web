import { useNavigate } from "react-router-dom";
import SvgLocation from "../../assets/svg/Location";
import { RecommendList } from "./Home";

type CardColProps = {
  data: RecommendList
} 

function CardCol({ data }: CardColProps) {

  console.log(data);

  const navigate = useNavigate();

  const handleClickCard = () => {
    navigate(`/fitness/${data.fitnessId}`);
  }

  return(
      <div className="w-[143px] h-[140px] flex flex-col mb-0.5"
        onClick={() => handleClickCard()}>
        {/* 이미지 추후 백엔드에서 제공 예정 */}
        <img src={data.image} alt="썸네일" className="w-full h-[107px] object-cover rounded-t overflow-hidden" />
        <div className="h-9 bg-white-100 rounded flex items-center justify-center gap-[10px] shadow-md">
          <span className="text-[11px] font-medium text-ellipsis overflow-hidden whitespace-nowrap">{data.name}</span>
          <div className="h-full flex items-center gap-1 content-center">
            <SvgLocation className="w-[7px] h-[9px]" />
            <span className="text-[9px] text-gray-600">{Math.floor(data.distance)}km</span>
          </div>
        </div>
      </div>
  );
}

export default CardCol;