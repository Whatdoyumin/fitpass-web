import { IcCoinWhite, IcEmptyDollar, IcEmptyDollarBlue, IcMycoinRectangle } from "../../assets/svg";

interface ICoinCardProps {
  isBgBlue: boolean;
  coinAmount: number;
  coinPrice: number;
  coinExp: number;
}

const CoinCard = ({ isBgBlue, coinAmount, coinPrice, coinExp }: ICoinCardProps) => {
  return (
    <div className="relative max-w-[21.25rem] w-[21.25rem] h-[4.375rem]">
      {isBgBlue ? (
        <IcMycoinRectangle className="absolute w-full h-full" />
      ) : (
        <IcCoinWhite className="absolute w-full h-full" />
      )}

      <div className="absolute inset-0 flex items-center justify-between z-10">
        <div className="w-20 flex justify-center items-center gap-2">
          {isBgBlue ? (
            <IcEmptyDollar className="w-[17px] h-[17px]" />
          ) : (
            <IcEmptyDollarBlue className="w-[17px] h-[17px]" />
          )}
          <p className={`text-16px ${isBgBlue ? " text-white-100" : " text-blue-500"}`}>
            {coinAmount}
          </p>
        </div>

        <div className="flex justify-end items-center pr-[1.4375rem]">
          <span
            className={`flex gap-1 text-15px ${isBgBlue ? " text-white-100" : " text-blue-500"}`}
          >
            <p>{coinPrice.toLocaleString()}원</p>
            <p>(유효기간 {coinExp}일)</p>
          </span>
        </div>
      </div>
    </div>
  );
};

export { CoinCard };
