// 1. 이미지 배열
// 2. slider로 불러오기
// 3. 각각 usestate로 순서 받아오기

// import Slider from "react-slick";
// import type { Settings } from "react-slick";

// import "slick-carousel/slick/slick.css";
// import "slick-carousel/slick/slick-theme.css";
import SvgLocation from "../../assets/svg/Location";
import { CoinRightRounded, Phonecall } from "../../assets/svg";
import Share from "./Share";
import ReviewList from "./ReviewList";

import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import MapContainer from "./MapContainer";

interface FetchResponse {
  fitnessId: number
  fitnessName: string,
  address: string,
  phoneNumber: string,
  categoryName: string,
  notice: string,
  time: string,
  howToUse: string,
  etc: string,
  fee: number,
  distance: number,
  imageUrl: string,
  fitnessLatitude: number,
  fitnessLongitude: number,
}

function FitnessDetails() {

  // const [currentIndex, setCurrentIndex] = useState(0); // 슬라이드 인덱스

  const { id } = useParams();
  // console.log(id);

  const navigate = useNavigate();

  const handleMoveToPurchasePass = () => {
    navigate(`/purchase-pass/${id}`)
  }

  const fetchDetail = async () => {
    const response = await axios.get(`http://15.165.128.52:8080/fitness/${id}`);
    return response.data.result;
  }

  const { data, isLoading, isError } = useQuery<FetchResponse>({
    queryKey: ['gym', id],
    queryFn: fetchDetail,
  });

  // console.log(data);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error</div>;
  }

  // 테스트 이미지
  // const imgurl: string =
  //   "https://s3-alpha-sig.figma.com/img/9771/3785/008387989af4aead9a0b02db565f1ca0?Expires=1736726400&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=keikTmna2x6G2RNM~AJfZPEQ8GLIRVkUj8uV39FdgmBSNhPtcCsbYmx4TUtHSc45mqkkUK9Kme6sCAsytIzjSXFm1yVf0Xdwn1z6MjcNpd6jUQ4zU3YJwiuU9lTQ~ka74kZiU5WHriQQATmPMe1Wl3yRmWXTWMHxM-He9TpQot-gIi944ECLqOM7p0D3mZQeg8-BSFFoiXybxXYMUCQSPcAhY587xbNAgHwXeZog23iWpVYN1PRIiGV3Ba4G1PcQTPB1SJVgL6fDyEEh31DiSvaR6TR4rZ9mZMD8~WKluhc2XekN2W1OzCT~An0H1d0HtInNcGaAV4PDeCi1-IOfLQ__";

  // const settings: Settings = {
  //   dots: false,
  //   infinite: true,
  //   speed: 500,
  //   slidesToShow: 1,
  //   slidesToScroll: 1,
  //   arrows: false, // 화살표 없애기,
  //   beforeChange: (next: number) => {
  //     if (typeof next === "number") setCurrentIndex(next);
  //   },
  // };

  // interface GymImg {
  //   id: number;
  //   url: string;
  //   alt: string;
  // }

  // const images: GymImg[] = [
  //   {
  //     id: 1,
  //     url: imgurl,
  //     alt: "이미지1",
  //   },
  //   {
  //     id: 2,
  //     url: imgurl,
  //     alt: "이미지2",
  //   },
  //   {
  //     id: 3,
  //     url: imgurl,
  //     alt: "이미지3",
  //   },
  // ];

  // interface FacilityInfo {
  //   info: string; // 시설 소개글
  //   benefits: string[]; // 이용 혜택
  // }

  // interface GymInfo {
  //   id: number;
  //   name: string;
  //   address: string;
  //   phone: string;
  //   facilities: string; // 이용 종목
  //   info: FacilityInfo[]; // 시설 소개
  //   operatingHours: string; // 요일별 운영시간
  //   usageMethod: string[]; // 이용 방법
  //   additionalInfo: string[]; // 기타 사항
  //   coin: number; // 코인
  // }

  // const gyms: GymInfo[] = [
  //   {
  //     id: 1,
  //     name: "동국대 헬스장",
  //     address: "서울특별시 중구 필동로 1길 30",
  //     phone: "00 - 1234 - 1234",
  //     facilities: "헬스",
  //     info: [
  //       {
  //         info: "시설 소개글~",
  //         benefits: ["수건 1장 제공", "개인 락커 1개월 10,000원"],
  //       },
  //     ],
  //     operatingHours: "00:00 ~ 24:00",
  //     usageMethod: ["예약 전 전화 필수", "웹 페이지 내 결제 후 결제 내역 보여주기"],
  //     additionalInfo: ["주차 불가능", "명절 당일 휴무"],
  //     coin: 100,
  //   },
  // ];

  // // 스크롤
  // const [scroll, setScroll] = useState(false);

  // const handleScroll = () => {
  //   if(window.scrollY)
  // }
  // useEffect(() => {
  //   window.addEventListener('scroll', )
  // })

  return (
    <div className="bg-white-200 h-full overflow-x-hidden overflow-y-auto flex flex-col items-center py-5">
      <div className="relative w-[340px] h-[191px]">
        {/* <Slider {...settings} className="w-[340px] h-[191px]"> */}
          {/* {images.map((img) => ( */}
            <div className="relative w-[340px] h-[191px] ">
              <img src={data?.imageUrl} alt={data?.fitnessName} className="w-[340px] h-[191px] rounded-t-[7px]" />
              {/* <span className="absolute bottom-2 right-4 w-9 h-[19px] px-[10px] py-[3px] bg-black-700/60 text-white-100 rounded-[15px] text-[11px] font-medium flex justify-center items-center">
                {currentIndex + 1}/{images.length}
              </span> */}
            </div>
          {/* ))} */}
        {/* </Slider> */}
        {/* 코인 정보 */}
        <div className="absolute top-0 right-0 flex flex-col items-center justify-center">
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
            {data?.phoneNumber}
          </span>
        </div>
        <div className="border-b-[6px]"></div>

        <div className="p-4 flex flex-col gap-1">
          <p className="text-base font-bold">이용 종목</p>
          <span className="text-[13px] font-medium text-gray-600">{data?.categoryName}</span>
        </div>
        <div className="border-b-2"></div>

        <div className="p-4 flex flex-col gap-1">
          <p className="text-base font-bold">운영 시간</p>
          <ul className="text-[13px] font-medium text-gray-600 mb-2">
            <li>월 {data?.time}</li>
            <li>화 {data?.time}</li>
            <li>수 {data?.time}</li>
            <li>목 {data?.time}</li>
            <li>금 {data?.time}</li>
            <li>토 {data?.time}</li>
            <li>일 {data?.time}</li>
          </ul>
          <span className="text-[13px] font-medium text-gray-600">
            운영시간과 휴장일은 시설 자체 사정에 따라 변동이 될 수 있으니, 유의하여 시설
            이용하시길 바랍니다.
          </span>
        </div>
        <div className="border-b-2"></div>

        <div className="p-4 flex flex-col gap-1">
          <p className="text-base font-bold">이용 방법</p>
          <p className="text-[13px] font-medium text-gray-600">{data?.howToUse}</p>
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
          <MapContainer data={{ fitnessLatitude: data?.fitnessLatitude || 20, fitnessLongitude: data?.fitnessLongitude || 20 }} />
        </div>
        <div className="border-b-[6px] w-[340px]"></div>
        <div className="p-4 flex flex-col gap-1">
          <ReviewList />
        </div>
        <div className="flex flex-col items-center">
          <button className="w-[300px] h-[46px] rounded-[5px] bg-blue-500 text-white-100 text-[15px] font-bold my-5"
            onClick={() => handleMoveToPurchasePass()}>
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
