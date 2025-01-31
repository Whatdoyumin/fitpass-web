// 데이터 -> 이미지, 이름, 주소, 거리

import { useNavigate } from "react-router-dom";
import SvgLocation from "../../assets/svg/Location";
import { TFitness } from "../../type/fitnessCard";

import Done from "../../assets/img/use_done.png"
import { handleSaveToLocalStorage } from "../../utils/storageUtils";

type FitnessCardProps = {
  fitness: TFitness[];
}

function FitnessCard({ fitness }: FitnessCardProps) {
  const navigate = useNavigate();

  // YYYY.MM.DD 형태
  const myDate = (activeTime: string): string => {
    const date = new Date(activeTime);
    return `${date.getFullYear()}.${String(date.getMonth() + 1).padStart(2, '0')}.${String(date.getDate()).padStart(2, '0')}`;
  };
  
  return (
    <div className="flex flex-col gap-[15px] w-[340px]">
      {fitness.map((item, index) => {
        // 기본 텍스트 및 스타일 (기본 상태를 "사용 가능"으로 설정)
        let statusText = "사용 가능"; // 기본 상태를 "사용 가능"으로 설정
        let statusStyle = ""; // 기본 스타일
        let bgStyle = "bg-white-100" // 기본 배경색
        let circleBg = "bg-white-200"  // 반원

        // fee가 있을 경우
        if (item.fee !== undefined) {
          statusText = `${item.fee}코인`; 
          statusStyle = "border border-blue-400" // fee가 있을 경우 코인 텍스트
        } else if (item.status) {
          // status가 있을 경우 -> 패스 사용하기 페이지
          switch (item.status) {
            case "NONE":
              statusText = "사용 가능";
              statusStyle = "w-16 border-2 border-blue-400"
              break;
            case "PROGRESS":
              statusText = "사용 중";
              statusStyle = "w-14 border-2 border-blue-400";
              break;
            case "DONE":
              statusText = "리뷰 남기기";
              statusStyle = "w-[70px] h-[26px] border bg-blue-500 text-white-100 border-blue-500 rounded-[5px] ";
              bgStyle = "bg-gray-200"
              circleBg = "bg-gray-300"
              break;
            default:
              statusText = "사용 가능"; // 사실 없는 경우..
              break;
          }
        }

        const formattedDate = item.status === "DONE" && item.activeTime ? myDate(item.activeTime) : "";

        return (
          <div className={`flex rounded relative h-[117px] ${bgStyle}`} key={index}
            onClick={() => {
              if (item.fee !== undefined) {
                handleSaveToLocalStorage({
                  fitnessId: item.fitnessId ?? 0,
                  name: item.fitnessName,
                  distance: item.distance,
                  imageUrl: item.imageUrl ?? ""
                });
                navigate(`/fitness/${item.fitnessId}`)
              }
            }}>
            <img className="w-[117px] rounded-l"
              src={item.imageUrl}
              alt="이미지" style={{
                clipPath: `polygon(
                  0% 0%, 
                  100% 0%, 
                  100% 9.09%, 98% 9.09%, 98% 18.18%, 100% 18.18%, 
                  100% 27.27%, 98% 27.27%, 98% 36.36%, 100% 36.36%, 
                  100% 45.45%, 98% 45.45%, 98% 54.54%, 100% 54.54%, 
                  100% 63.63%, 98% 63.63%, 98% 72.72%, 100% 72.72%, 
                  100% 81.81%, 98% 81.81%, 98% 90.9%, 100% 90.9%, 
                  100% 100%, 
                  0% 100%
                )`,
              }} />
              { statusText === "리뷰 남기기" && (
                <img
                  src={Done}
                  alt="사용 완료"
                  className="absolute bottom-[5px] left-[50px] z-10"/>
              )}
            <div className="flex flex-col w-[190px] h-[84px]">
              <div className="p-4 rounded-r-[5px]">
                <div className="w-[177px] h-[58px] flex flex-col gap-[10px]">
                  {/* <p className="font-medium text-sm h-[14px]" >{item.fitnessName}</p> */}
                  <div className="flex justify-between">
                    <p className="font-medium text-sm h-[14px]" >{item.fitnessName}</p>
                    {statusText === "리뷰 남기기" && formattedDate && (
                      <p className="text-[10px] text-gray-600">{formattedDate}</p>
                    )}
                </div>
                  <p className="text-[10px] text-gray-600 max-w-[207px] text-ellipsis overflow-hidden whitespace-nowrap">{item.address}</p>
                  <div className="flex h-[12px] gap-[5px] items-center">
                    <SvgLocation className="w-[8px] h-[10px]" />
                    <p className="text-[10px] text-gray-600 ">{item.distance}km</p>
                  </div>
                </div>
                {/* 버튼 */}
                <div className="absolute bottom-4 right-4 flex items-center gap-[12px] ">
                  { statusText === "사용 중" && (
                    <span className="text-blue-500 text-[10px] font-bold">20:10</span>
                  ) }
                  <div className={`flex justify-center items-center w-15 text-blue-400 rounded-[15px] h-[22px] text-[10px] font-bold text-center py-[5px] px-[10px] ${statusStyle} `}
                    onClick={() => {
                      if (statusText === "리뷰 남기기") {
                        navigate("/upload-review")
                      }
                    }}>
                    {statusText}
                  </div>
                </div>
                {/* <div className={`absolute flex items-center bottom-4 right-4 ${statusStyle} border rounded-[15px] w-15 h-[22px] text-[10px] font-bold text-center py-[5px] px-[10px]`}> */}

              </div>
              <div className={`absolute top-2/4 right-[-8.5px] w-[17.05px] h-[17px] rounded-full transform: -translate-y-1/2 ${circleBg}`}></div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default FitnessCard;