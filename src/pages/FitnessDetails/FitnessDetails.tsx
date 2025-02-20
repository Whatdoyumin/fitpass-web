import Slider from "react-slick";
import type { Settings } from "react-slick";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import SvgLocation from "../../assets/svg/Location";
import { CoinRightRounded, Phonecall } from "../../assets/svg";
import Share from "./Share";
import ReviewList from "./ReviewList";
import MapContainer from "./MapContainer";

import { useNavigate, useParams } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import config from "../../apis/config";
import { LoadingSpinner } from "../../components/LoadingSpinner";
import { useAuth } from "../../context/AuthContext";

interface FetchResponse {
  fitnessId: number;
  fitnessName: string;
  address: string;
  phoneNumber: string;
  categoryName: string;
  notice: string;
  time: string;
  howToUse: string;
  etc: string;
  fee: number;
  distance: number;
  imageUrl: string;
  fitnessLatitude: number;
  fitnessLongitude: number;
  additionalImages?: string[];
}

function FitnessDetails() {
  const [currentIndex, setCurrentIndex] = useState(0); // 슬라이드 인덱스

  const { id } = useParams();
  const { isLogin } = useAuth();

  const navigate = useNavigate();

  const handleMoveToPurchasePass = () => {
    navigate(`/purchase-pass/${id}`);
  };

  const fetchDetail = async () => {
    const response = await axios.get(`${config.apiBaseUrl}/fitness/${id}`);
    return response.data.result;
  };

  const { data, isLoading, isError } = useQuery<FetchResponse>({
    queryKey: ["gym", id],
    queryFn: fetchDetail,
  });

  if (isLoading) {
    return <LoadingSpinner />;
  }

  if (isError) {
    return <div>Error</div>;
  }

  const getImageArray = (data: FetchResponse): string[] => {
    return [data.imageUrl, ...(data.additionalImages ?? [])];
  };

  const images = data ? getImageArray(data) : [];

  const settings: Settings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false, // 화살표 없애기,
    afterChange: (current: number) => {
      setCurrentIndex(current);
    },
  };

  return (
    <div className="bg-white-200 h-full overflow-x-hidden overflow-y-auto flex flex-col items-center py-5">
      <div className="relative w-[340px] h-[191px]">
        <Slider {...settings} className="w-[340px] h-[191px]">
          {images.map((img, index) => (
            <div key={index} className="relative w-[340px] h-[191px] ">
              <img
                src={img}
                alt={`fitness-${index}`}
                className="w-[340px] h-[191px] rounded-t-[7px]"
              />
              <span className="absolute bottom-2 right-4 w-9 h-[19px] px-[10px] py-[3px] bg-black-700/60 text-white-100 rounded-[15px] text-[11px] font-medium flex justify-center items-center">
                {currentIndex + 1}/{images.length}
              </span>
            </div>
          ))}
        </Slider>
        {/* 코인 정보 */}
        <div className="absolute top-0 right-[-1px] flex flex-col items-center justify-center">
          <CoinRightRounded className="w-[70px] h-[27.22px] relative" />
          <span className="text-white-100 absolute text-[10px] font-bold">{data?.fee}코인</span>
        </div>
      </div>

      {/* 상세 정보 섹션 */}
      <div className="bg-white-100 w-[340px]">
        <div className="p-4 flex flex-col gap-1">
          <div className="flex justify-between pr-2">
            <p className="text-[25px] font-extrabold">{data?.fitnessName}</p>
            <Share />
          </div>
          <span className="flex text-xs font-medium gap-2 items-center">
            <SvgLocation className="w-[9px] h-[14px]" />
            {data?.address}
          </span>
          <span className="flex text-xs font-medium gap-2 items-center">
            <Phonecall className="w-[10px] h-[10px]" />
            {data?.phoneNumber.replace(/(\d{3})(\d{4})(\d{4})/, "$1-$2-$3")}
          </span>
        </div>
        <div className="border-b-[6px]"></div>

        <div className="p-4 flex flex-col gap-1">
          <p className="text-base font-bold">이용 종목</p>
          <span className="text-[13px] font-medium text-gray-600">{data?.categoryName}</span>
        </div>
        <div className="border-b-2"></div>

        <div className="p-4 flex flex-col gap-1">
          <p className="text-base font-bold">시설 소개</p>
          <span className="text-[13px] font-medium text-gray-600">
            <p>
              {data?.notice
                .replace(/<div>/g, "\n") // <div>를 줄바꿈으로 변환
                .replace(/<\/?[^>]+>/g, "") // 나머지 HTML 태그 제거
                .split("\n") // 줄바꿈 기준으로 나누기
                .map((line, index) => (
                  <span key={index}>
                    {line}
                    <br />
                  </span>
                ))}
            </p>
          </span>
        </div>
        <div className="border-b-2"></div>

        <div className="p-4 flex flex-col gap-1">
          <p className="text-base font-bold">운영 시간</p>
          <div className="text-[13px] font-medium text-gray-600 mb-2">
            <p>
              {data?.time.split("\n").map((line, index) => (
                <span key={index}>
                  {line}
                  <br />
                </span>
              ))}
            </p>
          </div>
          <span className="text-[13px] font-medium text-gray-600">
            운영시간과 휴장일은 시설 자체 사정에 따라 변동이 될 수 있으니, 유의하여 시설 이용하시길
            바랍니다.
          </span>
        </div>
        <div className="border-b-2"></div>

        <div className="p-4 flex flex-col gap-1">
          <p className="text-base font-bold">이용 방법</p>
          <p className="text-[13px] font-medium text-gray-600">
            {data?.howToUse
              ?.split(/\. ?/) // `.` 다음에 공백이 있을 수도 있고 없을 수도 있음
              .filter((sentence) => sentence.trim() !== "") // 공백만 있는 항목 제거
              .map((sentence, index) => (
                <span key={index}>
                  {sentence.trim()}
                  <br />
                </span>
              ))}
          </p>
        </div>
        <div className="border-b-2 w-[340px]"></div>

        <div className="p-4 flex flex-col gap-1">
          <p className="text-base font-bold">기타 사항</p>
          <p className="text-[13px] font-medium text-gray-600">{data?.etc}</p>
        </div>
        <div className="border-b-2"></div>

        <div className="p-4 flex flex-col gap-1">
          <span className="text-base font-bold">위치 안내</span>
          {/* 위도 경도 기본값 20 설정 (서울시청) */}
          <MapContainer
            data={{
              fitnessLatitude: data?.fitnessLatitude || 20,
              fitnessLongitude: data?.fitnessLongitude || 20,
            }}
          />
        </div>
        <div className="border-b-[6px] w-[340px]"></div>
        <div className="p-4 flex flex-col gap-1">
          <ReviewList />
        </div>
        <div className="flex flex-col items-center">
          <button
            className={`w-[300px] h-[46px] rounded-[5px] text-white-100 text-[15px] font-bold my-5 ${
              isLogin ? "bg-blue-500 cursor-pointer" : "bg-gray-400 cursor-not-allowed"
            }`}
            onClick={isLogin ? handleMoveToPurchasePass : undefined}
            disabled={!isLogin}
          >
            패스 구매하기
          </button>
        </div>
        {/* div 반원 */}
        <div className="flex justify-between relative mt-2">
          <div className="w-[40px] h-[40px] rounded-full bg-white-200 absolute bottom-[-20px] left-[-20px]"></div>
          <div className="w-[40px] h-[40px] rounded-full bg-white-200 absolute bottom-[-20px] right-[-20px]"></div>
        </div>
      </div>
    </div>
  );
}

export default FitnessDetails;
