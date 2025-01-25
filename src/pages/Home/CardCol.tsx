import { useNavigate } from "react-router-dom";
import SvgLocation from "../../assets/svg/Location";
import { RecommendList } from "./Home";

type CardColProps = {
  data: RecommendList
} 

function CardCol({ data }: CardColProps) {
  
  const navigate = useNavigate();

  // 로컬 스토리지 저장 및 상세 페이지로 이동
  const handleClickCard = () => {

    const watched = JSON.parse(localStorage.getItem("watched") || "[]");

    const currentFacility = {
      fitnessId: data.fitnessId,
      name: data.name,
      distance: data.distance,
      imageUrl: data.imageUrl,
    };
    
    if (!watched.some((item: RecommendList) => item.fitnessId === data.fitnessId)) {
      watched.unshift(currentFacility);  // 가장 앞쪽에 요소 추가
    }

    // 최근 본 운동 시설은 최대 7개까지
    if (watched.length > 7) {
      watched.pop();  // 마지막 요소 제거
    }

    localStorage.setItem('watched', JSON.stringify(watched));

    navigate(`/fitness/${data.fitnessId}`);
  }

  return(
      <div className="w-[143px] h-[140px] flex flex-col mb-0.5">
        <img src={data.imageUrl} alt="썸네일" className="w-full h-[107px] object-cover rounded-t overflow-hidden"
          onClick={() => handleClickCard()} />
        <div className="h-9 bg-white-100 rounded flex items-center justify-between gap-[10px] shadow-md">
          <span className="text-[11px] font-medium text-ellipsis overflow-hidden whitespace-nowrap flex-grow pl-[10px] ">{data.name}</span>
          <div className="h-full flex items-center gap-1 content-center pr-[10px] ">
            <SvgLocation className="w-[7px] h-[9px]" />
            <span className="text-[9px] text-gray-600">{Math.floor(data.distance)}km</span>
          </div>
        </div>
      </div>
  );
}

export default CardCol;
