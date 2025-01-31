function SkeletonFitnessCard() {

  return(
    <div className="flex flex-col w-[340px] shadow-lg">
      <div className="flex rounded bg-white-100 relative h-[117px]">
        {/* 스켈레톤 이미지 */}
        <div className="w-[117px] rounded-l bg-white-200" 
          style={{
            clipPath: `polygon(
                0% 0%, 
                100% 0%, 
                100% 9.09%, 98% 9.09%, 98% 18.18%, 100% 18.18%, 
                100% 27.27%, 98% 27.27%, 98% 36.36%, 100% 36.36%, 
                100% 45.45%, 98% 45.45%, 98% 54.54%, 100% 54.54%, 
                100% 63.63%, 98% 63.63%, 98% 72.72%, 100% 72.72%, 
                100% 81.81%, 98% 81.81%, 98% 90.9%, 100% 90.9%, 
                100% 100%, 
                0% 100%
              )`,
            }}></div>
            {/* 정보 */}
            <div className="flex flex-col w-[190px] h-[84px]">
              <div className="p-4 rounded-r-[5px]">
                <div className="w-[122px] h-[57px] flex flex-col gap-[10px] ">
                  <div className="w-[76px] h-[17px] rounded-[10px] bg-white-200"></div>
                  <div className="w-[122px] h-[10px] rounded-[10px] bg-white-200"></div>
                  <div className="w-[37px] h-[10px] rounded-[10px] bg-white-200"></div>
                </div>
                {/* 버튼 */}
                <div className="w-[56px] h-[22px] rounded-[15px] bg-white-200 absolute flex bottom-4 right-4 py-[5px] px-[10px]"></div>
              </div>
              <div className="absolute top-2/4 right-[-8.5px] w-[17.05px] h-[17px] rounded-full bg-white-200 transform: -translate-y-1/2"></div>
            </div>
      </div>
    </div>
  );
}

export default SkeletonFitnessCard;