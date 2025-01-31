const SkeletonPaymentCard = () => {
  return (
    <>
      {[...Array(6)].map((_, index) => (
        <div
          key={index}
          className="w-full h-[70px] rounded-[5px] relative shadow-sm bg-white-100 animate-pulse"
        >
          <div className="w-full h-full flex relative">
            <div className="relative w-[110px] h-full border-r-2 border-dotted flex justify-center items-center text-[16px] border-r-white-200">
              <div className="w-[67px] h-[18px] bg-white-200 rounded-full"></div>
              <div className="absolute -top-[4px] left-[101%] -translate-x-1/2 w-2 h-2 rounded-full bg-white-200"></div>
              <div className="absolute -bottom-[4px] left-[101%] -translate-x-1/2 w-2 h-2 rounded-full bg-white-200"></div>
            </div>

            <div className="w-full h-full flex justify-end items-center px-4 gap-2">
              <div className="w-[67px] h-[18px] bg-white-200 rounded-full" />
              <div className="w-[90px] h-[18px] bg-white-200 rounded-full" />
            </div>
          </div>
        </div>
      ))}
    </>
  );
};

export default SkeletonPaymentCard;
