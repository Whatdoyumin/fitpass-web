import CompletedItem from "./AvailableItem";

function CompletedList() {

  const fitnessData = [
    {
      name: "건국대 센터 A",
      address: "서울특별시 강남구 테헤란로 123",
      distance: "2km",
    },
    {
      name: "상명대 센터 B",
      address: "서울특별시 서초구 서초대로 456",
      distance: "3.5km",
    },
    {
      name: "동국대 헬스장",
      address: "서울특별시 중구 올림픽로 789",
      distance: "5km",
    },

  ];

  return (
    <div className="bg-gray-300 px-[25px] pt-[23px] pb-[117px] z-10">
      <h1 className="text-[18px] font-bold pb-[11px]">이용 완료 패스</h1>
      <div className="">
        <CompletedItem fitness={fitnessData} />
      </div>
    </div>
  );
}

export default CompletedList;
