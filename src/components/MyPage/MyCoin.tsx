import IcMycoinRectangle from "../../assets/svg/IcMycoinRectangle";
import IcEmptyDollar from "../../assets/svg/IcEmptyDollar";

interface MyCoinProps {
  coinAmount: number;
}

const MyCoin = ({ coinAmount }: MyCoinProps) => {
  return (
    <div className="w-full bg-white-100 px-[5px] py-[26px] mt-2 relative">
      <h2 className="text-18px font-bold mb-4">내 코인</h2>
      
      {/* IcMycoinRectangle 배경 이미지 */}
      <IcMycoinRectangle className="w-full h-[70px] flex items-center" />

      {/* 텍스트와 아이콘 배치 */}
      <div className="absolute top-[69px] left-[4px] right-0 bottom-0 p-[19px_23px_21px_28px] flex justify-between items-center w-[340px] h-[70px]">
        <IcEmptyDollar className="w-[30px] h-[30px]" />
        <span className="text-white-100 text-[15px]">{coinAmount}만개</span>
      </div>
    </div>
  );
};

export default MyCoin;
