import SvgLocation from "../../assets/svg/Location";

type Fitness = {
  image: string;
  name: string;
  address: string;
  distance: string;
};

type FitnessCardProps = {
  fitness: Fitness[];
};

function CompletedItem({ fitness }: FitnessCardProps) {
  return (
    <div className="flex flex-col gap-[15px] w-[340px]">
      {fitness.map((item, index) => (
        <div className="flex rounded bg-white-100 relative h-[117px]" key={index}>
          <div
            className="w-[117px] rounded-l relative"
            style={{
              background: `url(${item.image})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
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
            }}
          />
          <div className="flex flex-col w-[190px] h-[84px]">
            <div className="p-4 rounded-r-[5px]">
              <div className="w-[177px] h-[58px] flex flex-col gap-[10px]">
                <p className="font-medium text-sm h-[14px]">{item.name}</p>
                <p className="text-[10px] text-gray-600 max-w-[207px] text-ellipsis overflow-hidden whitespace-nowrap">
                  {item.address}
                </p>
                <div className="flex h-[12px] gap-[5px] items-center">
                  <SvgLocation className="w-[8px] h-[10px]" />
                  <p className="text-[10px] text-gray-600">{item.distance}</p>
                </div>
              </div>
              <div className="absolute flex items-center bottom-4 right-4 text-blue-400 border border-blue-400 rounded-[15px] w-15 h-[22px] text-[10px] font-bold text-center py-[5px] px-[10px]">
                사용가능
              </div>
            </div>
            <div className="absolute top-2/4 right-[-8.5px] w-[17.05px] h-[17px] rounded-full bg-white-200 transform: -translate-y-1/2"></div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default CompletedItem;
