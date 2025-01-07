import Slider, { Settings } from "react-slick";
import { useState } from "react";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import CardCol from "./CardCol";
import SvgProfile from "../../assets/svg/Profile";
import { HomeCardData } from "../../type/HomeCardData";

function Home() {

  // 임시 데이터
  const imageUrl: string = 'https://s3-alpha-sig.figma.com/img/9719/d8cb/bc10a15dad190bd2a1dd27dd7953b152?Expires=1736726400&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=MY653IcGp2awCUTh8SHZIBzWhKJqNWjPix4eVbv72~EEh4dXbCSPzrVaimvaAgJBXXAmdl4Do3Sxy~9YZuW7ygWBsD~u0oVzf7LLUy6QxRO62nqxx4rPagHtDBQ5FZGNYSJ7-bz9BITBnG3pkeLB7q7yNNNPcrhxE64lC4bX47XCulGxoNTdW7ppThdanZe~mm3XsipMSaLxB73MZROpasGE8svpInRi0QmgtSb4ZOshQpy3986o255a8636oHj~KWbWPqhlFL~Cw88Whms4xO9CxiDXgf3bOIQVm0DlSilD1QIWtBbvZekyZveRvwGB1B-OVrgKopc4eAdMwgFT~A__';
  const imageUrl2: string = "https://s3-alpha-sig.figma.com/img/9771/3785/008387989af4aead9a0b02db565f1ca0?Expires=1736726400&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=keikTmna2x6G2RNM~AJfZPEQ8GLIRVkUj8uV39FdgmBSNhPtcCsbYmx4TUtHSc45mqkkUK9Kme6sCAsytIzjSXFm1yVf0Xdwn1z6MjcNpd6jUQ4zU3YJwiuU9lTQ~ka74kZiU5WHriQQATmPMe1Wl3yRmWXTWMHxM-He9TpQot-gIi944ECLqOM7p0D3mZQeg8-BSFFoiXybxXYMUCQSPcAhY587xbNAgHwXeZog23iWpVYN1PRIiGV3Ba4G1PcQTPB1SJVgL6fDyEEh31DiSvaR6TR4rZ9mZMD8~WKluhc2XekN2W1OzCT~An0H1d0HtInNcGaAV4PDeCi1-IOfLQ__";

  // 광고 슬라이드
  const adSettings: Settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,  // 화살표 없애기
    dotsClass: "test-css",
  };

  // 운동 시설 슬라이드
  const fitSettings: Settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    arrows: false,  // 화살표 없애기
  };

  // 임시 데이터
  const [datas, setDatas] = useState<HomeCardData[]>([
    {
      image: "https://s3-alpha-sig.figma.com/img/9771/3785/008387989af4aead9a0b02db565f1ca0?Expires=1736726400&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=keikTmna2x6G2RNM~AJfZPEQ8GLIRVkUj8uV39FdgmBSNhPtcCsbYmx4TUtHSc45mqkkUK9Kme6sCAsytIzjSXFm1yVf0Xdwn1z6MjcNpd6jUQ4zU3YJwiuU9lTQ~ka74kZiU5WHriQQATmPMe1Wl3yRmWXTWMHxM-He9TpQot-gIi944ECLqOM7p0D3mZQeg8-BSFFoiXybxXYMUCQSPcAhY587xbNAgHwXeZog23iWpVYN1PRIiGV3Ba4G1PcQTPB1SJVgL6fDyEEh31DiSvaR6TR4rZ9mZMD8~WKluhc2XekN2W1OzCT~An0H1d0HtInNcGaAV4PDeCi1-IOfLQ__",
      name: "동국대학교 헬스장",
      distance: 1.1,
    },
    {
      image: "https://s3-alpha-sig.figma.com/img/573b/4872/49fb817d148c6d22298c3122b125602c?Expires=1736726400&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=k~VDpZaXDKZ6iIwRxJbmojPyBvZMrIssEb7HZBN6iWnEegFXFQr7PZv-Fq9E89vKjlW7CIa3OKKoFLw19yBKT4-OmYguTWctde6g3x5l4I-8Ze7j3EOBG-eTp6ulP3fjczrn4j54YaruYeQD-KknPmLqEU~b9dIUzB9wwWNzRGrMZMgtWBZaFCd6TF7TTDPzFjneTk6JoyVDE6-f-N~FKSGZ-Qgd8jOGFGhac-VnJlXHXhUKJJTcjXPbFH622m35GbN2GtjKIGaqApg3KHFhDTuNE~Fz8-iKTskmN3u3XIJc7HKTtDceTw2Sd7POpGuPtguvwnjDy~p21wKHTRm59w__",
      name: "로아짐 수유역점",
      distance: 1.8,
    },
    {
      image: "https://s3-alpha-sig.figma.com/img/683c/5f20/786f787d06e3e536582501cd8da97945?Expires=1736726400&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=ls9VF6VXQIzGd03IjykTwMTG~oaEKl2mPRYpm~ifml1bM4W8eepKxEi2GfME7CZi9mmFasVxzbhUfhMF9ltRq-Fgvyh~FE6EbgXjA5bBEnMUUZ-pg9T5EycO30HlhNfFI3c6Ild-qYtey~owHcEYmhwDrUd~n-b7BWWoasileq9~AuXCLjxjKGI4-5yPyHALWzZA8i-sun8uI1aGjD6gVghezA6k2H7s2XMXu1m9gUfL-VEfXLCrbK5x-v0sPrqqD5HA15qTLobAM-KbHdkPcyUZvI55poW82AkWix0hJh2pol47rE1xPI~nXTuQJTO3R7MvW78UjIwN5O9pUOs-vg__",
      name: "On 필라테스 센터",
      distance: 2.1,
    },
    {
      image: "https://s3-alpha-sig.figma.com/img/e67e/309b/a3164eaf1b5d32dbe8d816230c9b3735?Expires=1736726400&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=eUr9tnlIckWXqhGyKmmbsF7Bg5NN-119ZXSdCZuyIMMJqogKvr7jBHBBssWoPxtfZYK439okHYzirTRQUosDnLYr~p~VjDWfH5w4BblA9iwdFO50FQirz-fkEZftMSzlJmIDnttZ7DAthlGgXMcQwKwV0F-3PbmJfCA9YXk8RgeSd9cW6lidynliAoufdRz2ZCecYNIFyLWiV~NPF5obowtWzmCj-wpjSKf4vjurCn5dHzAD~UHhA-g7uVx-0prbmip6Ui1tyVsDAlWCOfh8nY1099zn2WgDEz~QYV9MHp5mBAOJZ6wqHXdnvVhTtjB0IMsTTqfzfe-A4KzolI4k~g__",
      name: "진짜 요가 센터",
      distance: 2.6,
    }
  ]);

  return (
    <div className="flex flex-col bg-white-100">
      <div className="flex justify-center w-[390px]">
        <Slider {...adSettings} className="bg-black-700 mb-sideGap w-[390px] h-[219px]">
          <div>
            <img src={imageUrl} alt="광고 이미지1" className="w-[290px] h-[219px] mx-auto"/>
          </div>
          <div>
            <img src={imageUrl2} alt="광고 이미지2" className="w-[290px] h-[219px] mx-auto" />
          </div>
          <div className="text-white-100">광고 이미지3</div>
        </Slider>
      </div>
      {/* 추천 운동시설 */}
      <div className="w-[390px] h-[177px] overflow-hidden pl-3">
        <p className="h-[19px] mb-[15px] font-bold text-[16px]"><span className="text-blue-500">추천</span> 운동 시설</p>
        <Slider {...fitSettings} className="h-[143px] mb-1 mr-[-120px]" >
          {datas.map((data, index) => (
            <CardCol key={index} data={data} />
          ))}
        </Slider>
      </div>
      {/* 구분선 */}
      <div className="border-b-4 border-gray-300 py-3 w-[390px]"></div>
      {/* 최근 본 운동 시설 -> 로그인 여부 추가 예정 */}
      <div className="w-[390px] h-[177px] my-4 bg-white-100 overflow-hidden pl-3">
        <p className="h-[19px] mb-[15px] font-bold text-[16px]"><span className="text-blue-500">최근 본</span> 운동 시설</p>

        {/* 로그아웃 시 */}
        {/* <LoginHome /> */}

        {/* 로그인 시 */}
          <Slider {...fitSettings} className="h-[143px] mb-1 mr-[-120px]">
            {datas.map((data, index) => (
                <CardCol key={index} data={data} />
            ))}
          </Slider>
      </div>
    </div>
  );
}

export default Home;

const LoginHome = () => {
  return(
    <div className="flex flex-col items-center justify-center h-full gap-[22px]">
      <SvgProfile className="w-[72px] h-[72px]" />
      <p className="text-gray-350">로그인 후 이용 가능한 서비스입니다.</p>
    </div>
  );
}