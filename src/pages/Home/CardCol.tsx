import SvgLocation from "../../assets/svg/Location";
import { HomeCardData } from "../../type/HomeCardData";

type CardColProps = {
  data: HomeCardData;
} 

function CardCol({ data }: CardColProps) {

  return(
      <div className="w-[143px] h-[140px] flex flex-col mb-0.5">
        <img src={data.image} alt="썸네일" className="w-full h-[107px] object-cover rounded-t overflow-hidden" />
        <div className="h-9 bg-white rounded flex items-center justify-center gap-[10px] shadow-md">
          <span className="text-[11px] font-semibold text-ellipsis overflow-hidden whitespace-nowrap">{data.name}</span>
          <div className="h-full flex items-center gap-1 content-center">
            <SvgLocation className="w-[7px] h-[9px]" />
            <span className="text-[9px] text-gray-600">{data.distance}km</span>
          </div>
        </div>
      </div>
  );
}

export default CardCol;