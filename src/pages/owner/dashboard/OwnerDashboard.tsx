import { IcRightArrow } from "../../../assets/svg";

function OwnerDashboard() {
  return (
    <div className="w-full max-w-content flex flex-col items-center gap-[22px] relative px-5 pt-[29px] pb-[40px] bg-white-200 h-full">

    <div className="w-full flex flex-col relative gap-[15px] bg-white-100 rounded-[7px] pb-[20px]">
      <div className="w-full flex items-center justify-end gap-[14px] px-[20px] pt-[15px]">
        <p className="text-[16px] text-gray-400">공지사항</p>
        <IcRightArrow className="h-[13px]" />
      </div>

      <div className="w-full border-t border-gray-300" />

      <div className="flex flex-col gap-[15px] px-[20px]">
        <div className="flex text-[16px]">
          <p className="text-blue-500">[공지]&nbsp;</p>
          <p>패스 이용 방법 안내</p>
        </div>
        <div className="flex text-[16px]">
          <p className="text-blue-500">[공지]&nbsp;</p>
          <p>구독 방법 안내</p>
        </div>
        <div className="flex text-[16px]">
          <p className="text-red-500">[이벤트]&nbsp;</p>
          <p>1월 신년 이벤트</p>
        </div>
      </div>
    </div>

    <div className="w-full flex flex-col relative gap-[15px] bg-white-100 rounded-[7px] pb-[20px]">
      <div className="w-full flex items-center justify-end gap-[14px] px-[20px] pt-[15px]">
        <p className="text-[16px] text-gray-400">전체 정산 내역 보기</p>
        <IcRightArrow className="h-[13px]" />
      </div>

      <div className="w-full border-t border-gray-300" />

      <div className="flex flex-col gap-[15px] px-[20px] text-[20px] leading-[28px]">
        <p>
          3월 현재까지 정산 금액은<br />
          <span className="font-bold">1,000,000원</span>입니다
        </p>
      </div>
    </div>

    <div className="w-full flex flex-col relative gap-[15px] bg-white-100 rounded-[7px] pb-[20px]">
      <div className="w-full flex items-center justify-end gap-[14px] px-[20px] pt-[15px]">
        <p className="text-[16px] text-gray-400">전체 이용 내역 보기</p>
        <IcRightArrow className="h-[13px]" />
      </div>

      <div className="w-full border-t border-gray-300" />

      <div className="flex flex-col gap-[25px] px-[20px] text-[16px]">
        {[
          { id: "아이디", date: "2025.01.02 22:30", coin: "20코인" },
          { id: "아이디", date: "2025.01.02 22:30", coin: "20코인" },
          { id: "아이디", date: "2025.01.02 22:30", coin: "20코인" },
        ].map((item, idx) => (
          <div key={idx} className="flex justify-between items-center">
            <div className="flex flex-col">
              <p>{item.id}</p>
              <p className="text-[12px]">{item.date}</p>
            </div>
            <p>{item.coin}</p>
          </div>
        ))}
      </div>
    </div>

    <button className="mt-[14px] w-full h-[50px] bg-blue-500 rounded-5 text-[15px] text-white-100">
      시설 관리
    </button>
  </div>
  );
}

export default OwnerDashboard;
