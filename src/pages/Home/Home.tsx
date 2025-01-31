import { useEffect, useState } from "react";
import { useAuth } from "../../context/AuthContext"; // ✅ AuthProvider에서 isLogin 가져오기
import Slider, { Settings } from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import CardCol from "./CardCol";
import RequireLogin from "../../components/RequireLogin";
import axios from "axios";

import Ad1 from "../../assets/img/ad1.jpeg";
import Ad2 from "../../assets/img/ad2.jpg";
import Ad3 from "../../assets/img/ad3.jpg";

export interface RecommendList {
  fitnessId: number;
  name: string;
  distance: number;
  imageUrl: string;
}

function Home() {
  const { isLogin } = useAuth(); // ✅ 로그인 상태 가져오기
  console.log(isLogin);
  const [recentWatched, setRecentWatched] = useState<RecommendList[]>([]);
  const [fitSettings, setFitSettings] = useState({
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    arrows: false,
  });

  // 최근 본 운동시설 가져오기
  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("watched") || "[]");
    setRecentWatched(stored);

    setFitSettings((prevSettings) => ({
      ...prevSettings,
      slidesToShow: Math.min(stored.length, 3),
    }));
  }, []);

  return (
    <div className="flex flex-col">
      <div className="w-[390px] h-[500px] rounded-t-[15px] bg-white-200 absolute top-[370px] z-5">
        {/* 구분선 */}
        <div className="border-b-4 border-gray-300 py-3 w-[390px]"></div>

        {/* 최근 본 운동 시설 */}
        <div className="w-[390px] h-[177px] pl-4 my-6 overflow-hidden">
          <p className="h-[19px] mb-[15px] font-bold text-[16px]">
            <span className="text-blue-500">최근 본</span> 운동 시설
          </p>

          {isLogin ? (
            <p>✅ 로그인 상태입니다.</p>
          ) : (
            <RequireLogin />
          )}
        </div>
      </div>
    </div>
  );
}

export default Home;
