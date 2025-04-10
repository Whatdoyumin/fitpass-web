import { useEffect, useState } from "react";

import Slider, { Settings } from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import CardCol from "./CardCol";
import RequireLogin from "../../components/RequireLogin";
import { HomeCardData } from "../../types/HomeCardData";

import { useAuth } from "../../context/AuthContext";
import { LoadingSpinner } from "../../components/LoadingSpinner";
import NotFound from "../NotFound";
import { useFetchHomeSlide, useFetchRecommendFitness } from "../../hooks/useGetRecommend";
import Modal from "../../components/Modal";

type HomeSlide = {
  id: number;
  imageUrl: string;
};

function Home() {
  const { isLogin, locationAgreed } = useAuth();

  const [isLocationModalOpen, setIsLocationModalOpen] = useState(false);
  const [hasShownModal, setHasShownModal] = useState(() => {
    return sessionStorage.getItem("hasShownLocationModal") === "true";
  });

  useEffect(() => {
    if (isLogin && locationAgreed === false && !hasShownModal) {
      setIsLocationModalOpen(true);
      setHasShownModal(true);
      sessionStorage.setItem("hasShownLocationModal", "true");
    }
  }, [isLogin, locationAgreed, hasShownModal]);

  const [recentWatched, setRecentWatched] = useState([]);
  const [fitSettings, setFitSettings] = useState({
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 3, // 기본값 설정
    slidesToScroll: 1,
    arrows: false,
  });

  // 최근 본 운동시설 슬라이드
  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("watched") || "[]");
    setRecentWatched(stored);

    setFitSettings((prevSettings) => ({
      ...prevSettings,
      slidesToShow: Math.min(stored.length, 3),
    }));
  }, []);

  const { data: slideImg } = useFetchHomeSlide();

  const { data: datas, isPending, isError } = useFetchRecommendFitness();

  if (isPending) {
    return <LoadingSpinner />;
  }

  if (isError) {
    return <NotFound />;
  }

  // 광고 슬라이드
  const adSettings: Settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false, // 화살표 없애기
    dotsClass: "test-css",
  };

  // 추천 운동 시설
  const reSettings: Settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    arrows: false, // 화살표 없애기
  };

  return (
    <div className="bg-white-200 w-full h-[calc(100vh-165px)] overflow-y-auto flex flex-col">
      <div className="flex justify-center w-[390px] h-[280px] bg-black-700 relative ">
        <Slider {...adSettings} className="mb-sideGap w-[390px] h-[230px]">
          {slideImg.map((img: HomeSlide) => (
            <img
              key={img.id}
              src={img.imageUrl}
              alt={`${img.id}`}
              className="w-[294px] h-[260px] mx-auto object-cover bg-no-repeat"
            />
          ))}
        </Slider>
      </div>

      <div className="flex flex-col w-[390px] rounded-t-[15px] bg-white-200 absolute top-[340px] z-5">
        {/* 추천 운동시설 */}
        {/* <div className="flex-1 w-[390px] pl-4 my-3 overflow-hidden mt-6"> */}
        <div className="w-[390px] pl-4 my-3 overflow-hidden mt-6">
          <p className="h-[19px] mt-[10px] mb-[20px] font-bold text-[16px]">
            <span className="text-blue-500">추천</span> 운동 시설
          </p>
          <Slider {...reSettings} className="h-[143px] mr-[-120px]">
            {datas?.map((data: HomeCardData) => (
              <CardCol key={data.fitnessId} data={data} />
            ))}
          </Slider>
        </div>
        {/* 구분선 */}
        <div className="border-b-4 border-gray-300 py-3 w-[390px]"></div>
        {/* 최근 본 운동 시설 */}
        {/* <div className="flex-1 w-[390px] pl-4 my-7 overflow-hidden"> */}
        <div className="w-[390px] pl-4 my-7 overflow-hidden pb-navbar">
          <p className="h-[19px] mb-[20px] font-bold text-[16px]">
            <span className="text-blue-500">최근 본</span> 운동 시설
          </p>
          {isLogin ? (
            recentWatched.length > 0 ? (
              recentWatched.length === 1 ? (
                <CardCol key={recentWatched[0]} data={recentWatched[0]} />
              ) : recentWatched.length === 2 ? (
                <div className="flex gap-4">
                  {recentWatched.map((data, index) => (
                    <CardCol key={index} data={data} />
                  ))}
                </div>
              ) : (
                <Slider {...fitSettings} className="h-[143px] mb-sideGap mr-[-120px] mb-[85px]">
                  {recentWatched.map((data, index) => (
                    <CardCol key={index} data={data} />
                  ))}
                </Slider>
              )
            ) : (
              <></>
            )
          ) : (
            <RequireLogin />
          )}
        </div>
      </div>

      {/* 위치 정보 이용 동의 모달 */}
      <Modal
        isOpen={isLocationModalOpen}
        onClose={() => {}}
        onSuccess={() => {
          setIsLocationModalOpen(false);
        }}
        title="위치 정보 이용 동의"
        subTitle="위치 정보 이용 동의를 하지 않을 경우 서비스 기능
일부분이 작동하지 않아 이용에 불편이 생길 수 있습니다."
        btn1Text="동의하지 않습니다"
        btn2Text="동의합니다"
      />
    </div>
  );
}

export default Home;
