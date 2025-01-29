import { useEffect, useState } from "react";

import Slider, { Settings } from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import { useQuery } from "@tanstack/react-query";

import CardCol from "./CardCol";
import RequireLogin from "../../components/RequireLogin";
// import { axiosInstance } from "../../apis/axios-instance";

import Ad1 from "../../assets/img/ad1.jpeg";
import Ad2 from "../../assets/img/ad2.jpg";
import Ad3 from "../../assets/img/ad3.jpg";
import axios from "axios";


export interface RecommendList {
  fitnessId: number;
  name: string;
  distance: number;
  imageUrl: string;
}

function Home() {

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
    const stored = JSON.parse(localStorage.getItem('watched') || '[]');
    setRecentWatched(stored);

    setFitSettings((prevSettings) => ({
      ...prevSettings,
      slidesToShow: Math.min(stored.length, 3),
    }))
  }, [])

  const fetchRecommend = async () => {
    // const response = await axiosInstance.get("/fitness/recommend");
    const response = await axios.get("http://15.165.128.52:8080/fitness/recommend");
    return response;
  }

  const { data, isPending, isError } = useQuery({
    queryKey: ['fitnessCenter'],
    queryFn: fetchRecommend,
  });

  if (isPending) {
    return <div>로딩중..</div>
  }

  if (isError) {
    return <div>에러</div>
  }

  const datas = data?.data.result;

  // 로그인 여부
  const accessToken = localStorage.getItem('accessToken');

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
  }

  return (
    <div className="flex flex-col">
      <div className="flex justify-center w-[390px] h-[250px] bg-black-700 relative ">
        <Slider {...adSettings} className="mb-sideGap w-[390px] h-[219px]">
          <div>
            <img src={Ad1} alt="광고 이미지1" className="w-[294px] h-[240px] mx-auto"/>
          </div>
          <div>
            <img src={Ad2} alt="광고 이미지2" className="w-[294px] h-[240px] mx-auto"/>
          </div>
          <div>
            <img src={Ad3} alt="광고 이미지3" className="w-[294px] h-[240px] mx-auto"/>
          </div>
        </Slider>
      </div>

      <div className="w-[390px] h-[500px] rounded-t-[15px] bg-white-200 absolute top-[370px] z-5 ">
        {/* 추천 운동시설 */}
        <div className="w-[390px] h-[177px] pl-4 overflow-hidden mt-6">
        {/* <div className="overflow-hidden pl-3 rounded-t-[15px] absolute"> */}
          <p className="h-[19px] mb-[15px] font-bold text-[16px]"><span className="text-blue-500">추천</span> 운동 시설</p>
          <Slider {...reSettings} className="h-[143px] mr-[-120px]" >
            {datas?.map((data: RecommendList, index: number) => (
              <CardCol key={index} data={data} />
            ))}
          </Slider>
        </div>
        {/* 구분선 */}
        <div className="border-b-4 border-gray-300 py-3 w-[390px]"></div>
        {/* 최근 본 운동 시설 */}
        <div className="w-[390px] h-[177px] pl-4 my-6 overflow-hidden">
          <p className="h-[19px] mb-[15px] font-bold text-[16px]"><span className="text-blue-500">최근 본</span> 운동 시설</p>
            {accessToken ? (
              (recentWatched.length > 0 ? (
                <Slider {...fitSettings} className="h-[143px] mr-[-120px]">
                {recentWatched?.map((data: RecommendList, index: number) => (
                    <CardCol key={index} data={data} />
                ))}
              </Slider>
              ) : (
                <></>
              ))
            ) : (<RequireLogin />)}
        </div>
      </div>
    </div>
  );
}

export default Home;
