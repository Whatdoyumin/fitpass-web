import IcMycoinRectangle from "../../assets/svg/IcMycoinRectangle";
import IcEmptyDollar from "../../assets/svg/IcEmptyDollar";

interface MyCoinProps {
  coinAmount: number;
}

const MyCoin = ({ coinAmount }: MyCoinProps) => {
  return (
    <div className="w-full bg-white-100 px-[25px] py-[26px] mt-2 relative">
      <h2 className="text-18px font-bold mb-[15px]" style={{ lineHeight: '21px' }}>내 코인</h2>

      {/* IcMycoinRectangle 배경 */}
      <div className="relative max-w-[21.25rem] h-[4.375rem]">
        <IcMycoinRectangle className="absolute w-full h-full" />

        {/* 텍스트와 아이콘을 나누는 div */}
        <div className="absolute inset-0 flex items-center justify-between z-10">
          {/* 왼쪽 영역 - 아이콘 중앙 정렬 */}
          <div className="flex justify-center items-center w-[86.47px]">
            <IcEmptyDollar className="w-[1.875rem] h-[1.875rem] sm:w-[2.125rem] sm:h-[2.125rem] lg:w-[2.5rem] lg:h-[2.5rem]" />
          </div>

          {/* 오른쪽 영역 - 텍스트 오른쪽에 padding 23px 추가 */}
          <div className="flex justify-end items-center w-[252.24px] pr-[1.4375rem]">
            <span className="text-white-100 text-15px sm:text-base lg:text-lg" style={{ lineHeight: '30px' }}>
              {coinAmount}만개
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyCoin;
