
interface MyCoinProps {
  coinAmount: number;
}

const MyCoin = ({ coinAmount }: MyCoinProps) => {
  return (
    <div className="w-full bg-white-100 px-[5px] py-[26px] mt-2">
      <h2 className="text-18px font-bold mb-4">내 코인</h2>
      <div className="max-w-[340px] h-[70px] bg-[#3BA8FF] rounded-lg flex items-center px-4">
        <span className="text-white text-[15px] ml-auto">{coinAmount}만개</span>
      </div>
    </div>
  );
};

export default MyCoin;
