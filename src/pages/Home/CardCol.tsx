import { useNavigate } from "react-router-dom";
import SvgLocation from "../../assets/svg/Location";
import { RecommendList } from "./Home";

type CardColProps = {
  data: RecommendList
} 

function CardCol({ data }: CardColProps) {
  
  const navigate = useNavigate();

  const handleClickCard = () => {

    const watched = JSON.parse(localStorage.getItem("watched") || "[]");

    const currentFacility = {
      fitnessId: data.fitnessId,
      name: data.name,
      distance: data.distance,
      imageUrl: data.imageUrl,
    };
    
    if (!watched.some((item: RecommendList) => item.fitnessId === data.fitnessId)) {
      watched.push(currentFacility);
    }

    if (watched.length > 8) {
      watched.shift();  // 배열의 앞에서 요소 제거
    }

    localStorage.setItem('watched', JSON.stringify(watched));

    navigate(`/fitness/${data.fitnessId}`);
  }

  return(
      <div className="w-[143px] h-[140px] flex flex-col mb-0.5">
        <img src={data.imageUrl} alt="썸네일" className="w-full h-[107px] object-cover rounded-t overflow-hidden"
          onClick={() => handleClickCard()} />
        <div className="h-9 bg-white-100 rounded flex items-center justify-evenly gap-[10px] shadow-md">
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
