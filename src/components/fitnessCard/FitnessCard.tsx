import { useNavigate } from "react-router-dom";
import SvgLocation from "../../assets/svg/Location";
import { TFitness } from "../../type/fitnessCard";

import Done from "../../assets/img/use_done.png";
import { handleSaveToLocalStorage } from "../../utils/storageUtils";

type FitnessCardProps = {
  fitness: TFitness[];
  limitTime?: number;
};

const FitnessCard = ({ fitness, limitTime }: FitnessCardProps) => {
  const navigate = useNavigate();

  // 날짜 포맷: YYYY.MM.DD
  const myDate = (activeTime: string): string => {
    const date = new Date(activeTime);
    return `${date.getFullYear()}.${String(date.getMonth() + 1).padStart(2, "0")}.${String(
      date.getDate()
    ).padStart(2, "0")}`;
  };
  const formatTime = (limitTime: number) => {
    const minutes = Math.floor(limitTime / 60);
    const seconds = limitTime % 60;
    return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
  };
  return (
    <div className="flex flex-col gap-[15px] w-[340px]">
      {fitness.map((item, index) => {
        let statusText = "사용 가능";
        let statusStyle = "";
        let bgStyle = "bg-white-100";
        let circleBg = "bg-white-200";

        // 상태별 처리
        if (item.fee !== undefined) {
          statusText = `${item.fee}코인`;
          statusStyle = "border border-blue-400";
        } else if (item.status) {
          switch (item.status) {
            case "NONE":
              statusText = "사용 가능";
              statusStyle = "w-16 border-2 border-blue-400";
              break;
            case "PROGRESS":
              statusText = "사용 중";
              statusStyle = "w-14 border-2 border-blue-400";
              break;
            case "DONE":
              statusText = "리뷰 남기기";
              statusStyle =
                "w-[70px] h-[26px] border bg-blue-500 text-white-100 border-blue-500 rounded-[5px]";
              bgStyle = "bg-gray-200";
              circleBg = "bg-gray-300";
              break;
            default:
              statusText = "사용 가능";
              break;
          }
        }

        const formattedDate =
          item.status === "DONE" && item.activeTime ? myDate(item.activeTime) : "";

        return (
          <div
            className={`flex rounded relative h-[117px] ${bgStyle}`}
            key={index}
            onClick={() => {
              if (item.fee !== undefined) {
                handleSaveToLocalStorage({
                  fitnessId: item.fitnessId ?? 0,
                  name: item.fitnessName,
                  distance: item.distance,
                  imageUrl: item.imageUrl ?? "",
                });
                navigate(`/fitness/${item.fitnessId}`);
              }
            }}
          >
            {statusText === "리뷰 남기기" ? (
              <div
                className="w-[117px] rounded-l relative"
                style={{
                  background: `linear-gradient(0deg, rgba(0, 0, 0, 0.20) 0%, rgba(0, 0, 0, 0.20) 100%), url(${item.imageUrl})`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                  clipPath: `polygon(0% 0%, 100% 0%, 100% 9.09%, 98% 9.09%, 98% 18.18%, 100% 18.18%, 100% 27.27%, 98% 27.27%, 98% 36.36%, 100% 36.36%, 100% 45.45%, 98% 45.45%, 98% 54.54%, 100% 54.54%, 100% 63.63%, 98% 63.63%, 98% 72.72%, 100% 72.72%, 100% 81.81%, 98% 81.81%, 98% 90.9%, 100% 90.9%, 100% 100%, 0% 100%)`,
                }}
              />
            ) : (
              <img
                className="w-[117px] rounded-l"
                src={item.imageUrl}
                alt="이미지"
                style={{
                  clipPath: `polygon(0% 0%, 100% 0%, 100% 9.09%, 98% 9.09%, 98% 18.18%, 100% 18.18%, 100% 27.27%, 98% 27.27%, 98% 36.36%, 100% 36.36%, 100% 45.45%, 98% 45.45%, 98% 54.54%, 100% 54.54%, 100% 63.63%, 98% 63.63%, 98% 72.72%, 100% 72.72%, 100% 81.81%, 98% 81.81%, 98% 90.9%, 100% 90.9%, 100% 100%, 0% 100%)`,
                }}
              />
            )}

            {statusText === "리뷰 남기기" && (
              <img src={Done} alt="사용 완료" className="absolute bottom-[5px] left-[50px] z-10" />
            )}

            <div className="flex flex-col w-[190px] h-[84px]">
              <div className="p-4 rounded-r-[5px]">
                <div className="w-[177px] flex flex-col gap-[10px]">
                  <div className="flex justify-between">
                    <p className="font-medium text-sm h-[14px]">{item.fitnessName}</p>
                    {statusText === "리뷰 남기기" && formattedDate && (
                      <p className="text-[10px] text-gray-600">{formattedDate}</p>
                    )}
                  </div>
                  <p className="text-[10px] text-gray-600 max-w-[207px] text-ellipsis overflow-hidden whitespace-nowrap">
                    {item.fitnessAddress}
                  </p>
                  <div className="flex h-[12px] gap-[5px] items-center">
                    <SvgLocation className="w-[8px] h-[10px]" />
                    <p className="text-[10px] text-gray-600 ">{item.distance}km</p>
                  </div>
                </div>

                <div className="absolute bottom-4 right-4 flex items-center gap-[12px]">
                  {statusText === "사용 중" && limitTime !== undefined && (
                    <span className="text-blue-500 text-[10px] font-bold">
                      {formatTime(limitTime)}
                    </span>
                  )}
                  <div
                    className={`flex justify-center items-center w-15 text-blue-400 rounded-[15px] h-[22px] text-[10px] font-bold text-center py-[5px] px-[10px] ${statusStyle}`}
                    onClick={() => {
                      if (statusText === "리뷰 남기기") {
                        navigate(`/upload-review/${item.id}`);
                      }
                    }}
                  >
                    {statusText}
                  </div>
                </div>
              </div>
              <div
                className={`absolute top-2/4 right-[-8.5px] w-[17.05px] h-[17px] rounded-full transform: -translate-y-1/2 ${circleBg}`}
              ></div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default FitnessCard;
