import { useEffect, useState } from "react";

import Slider, { Settings } from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import { useQuery } from "@tanstack/react-query";

import CardCol from "./CardCol";
import RequireLogin from "../../components/RequireLogin";
import { HomeCardData } from "../../type/HomeCardData";

import Ad1 from "../../assets/img/ad1.jpeg";
import Ad2 from "../../assets/img/ad2.jpg";
import Ad3 from "../../assets/img/ad3.jpg";

import { useAuth } from "../../context/AuthContext";
import { LoadingSpinner } from "../../components/LoadingSpinner";
import NotFound from "../NotFound";
import { axiosInstance } from "../../apis/axios-instance";

function Home() {
  const {isLogin} = useAuth();

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

  const fetchRecommend = async () => {
    const response = await axiosInstance.get("/fitness/recommend");
    return response;
  };

  const { data, isPending, isError } = useQuery({
    queryKey: ["fitnessCenter"],
    queryFn: fetchRecommend,
  });

  if (isPending) {
    return <LoadingSpinner />;
  }

  if (isError) {
    return <NotFound />;
  }

  const datas = data?.data.result;


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
    <div className="w-full h-full overflow-y-auto flex flex-col">
      <div className="flex justify-center w-[390px] h-[280px] bg-black-700 relative ">
        <Slider {...adSettings} className="mb-sideGap w-[390px] h-[230px]">
          <div>
            <img src={Ad1} alt="광고 이미지1" className="w-[294px] h-[260px] mx-auto" />
          </div>
          <div>
            <img src={Ad2} alt="광고 이미지2" className="w-[294px] h-[260px] mx-auto" />
          </div>
          <div>
            <img src={Ad3} alt="광고 이미지3" className="w-[294px] h-[260px] mx-auto" />
          </div>
        </Slider>
      </div>

      <div className="w-[390px] h-[550px] rounded-t-[15px] bg-white-200 absolute top-[350px] z-5 ">
        {/* 추천 운동시설 */}
        <div className="w-[390px] h-[200px] pl-4 overflow-hidden mt-6">
          {/* <div className="overflow-hidden pl-3 rounded-t-[15px] absolute"> */}
          <p className="h-[19px] mt-[10px] mb-[15px] font-bold text-[16px]">
            <span className="text-blue-500">추천</span> 운동 시설
          </p>
          <Slider {...reSettings} className="h-[143px] mr-[-120px]">
            {datas?.map((data: HomeCardData, index: number) => (
              <CardCol key={index} data={data} />
            ))}
          </Slider>
        </div>
        {/* 구분선 */}
        <div className="border-b-4 border-gray-300 py-3 w-[390px]"></div>
        {/* 최근 본 운동 시설 */}
        <div className="w-[390px] h-[177px] pl-4 my-6 overflow-hidden">
          <p className="h-[19px] mb-[15px] font-bold text-[16px]"><span className="text-blue-500">최근 본</span> 운동 시설</p>
            {isLogin ?               
            (recentWatched.length > 0 ? (
                <Slider {...fitSettings} className="h-[143px] mr-[-120px]">
                {recentWatched?.map((data: HomeCardData, index: number) => (
                  <CardCol key={index} data={data} />
                ))}
              </Slider>
              ) : (
                <></>
              )) : (<RequireLogin />)}
        </div>
      </div>
    </div>
  );
}

export default Home;
