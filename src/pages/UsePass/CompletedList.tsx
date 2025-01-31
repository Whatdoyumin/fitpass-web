import { useState, useEffect } from "react";
import CompletedItem from "./CompletedItem";

function CompletedList() {
  // CompletedPass의 타입을 명시하여 오류를 해결
  const [completedPasses, setCompletedPasses] = useState<
    { image: string; name: string; address: string; distance: string; date: string }[]
  >([]);

  useEffect(() => {
    // 예시 데이터 (나중에 API를 호출하여 데이터를 가져올 수 있음)
    const fetchCompletedPasses = () => {
      const fitnessData = [
        {
          name: "건국대 센터 A",
          address: "서울특별시 강남구 테헤란로 123",
          distance: "2km",
          image:
            "https://image.ytn.co.kr/general/jpg/2023/0731/202307311330019611_h.jpg",
          date: "2024.12.01",
        },
        {
          name: "상명대 센터 B",
          address: "서울특별시 서초구 서초대로 456서울특별시 서초구 서초대로 456",
          distance: "3.5km",
          image: "https://blog.kakaocdn.net/dn/BwiKj/btrvJT4XtsX/fNcBY2m3cIUxzXkEDuXqfk/img.jpg",
          date: "2025.01.15",
        },
        {
          name: "동국대 헬스장",
          address: "서울특별시 중구 올림픽로 789",
          distance: "5km",
          image: "https://img.freepik.com/free-photo/gym-with-indoor-cycling-equipment_23-2149270210.jpg",
          date: "2025.01.01",
        },
      ];

      setCompletedPasses(fitnessData); // 타입이 맞으므로 오류 없이 상태 업데이트 가능
    };

    fetchCompletedPasses();
  }, []);

  return (
    <div className="bg-gray-300 px-[25px] pt-[23px] pb-[117px] z-10">
      <h1 className="text-[18px] font-bold pb-[11px]">이용 완료 패스</h1>
      <div className="flex flex-col items-center">
        <CompletedItem fitness={completedPasses} />
      </div>
    </div>
  );
}

export default CompletedList;
