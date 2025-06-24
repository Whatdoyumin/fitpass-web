import IcPassTicket from "../../assets/svg/IcPassTicket";

interface MyProfileProps {
  profile: {
    id: number;
    pictureUrl: string;
    name: string;
    coinQuantity: number;
  };
}

const MyCoin = ({ profile }: MyProfileProps) => {
  return (
    <div className="w-full bg-white-100 px-[25px] py-[26px] mt-2 relative z-[0]">
      <h2 className="text-18px font-bold mb-[15px]" style={{ lineHeight: "21px" }}>
        내 코인
      </h2>

      <div className="relative max-w-[21.25rem] h-[4.375rem]">
        <IcPassTicket className="absolute w-full h-full" />

        <div className="absolute top-1/2 right-0 text-white-100 text-15px sm:text-base lg:text-lg transform -translate-y-1/2 pr-[23px]">
          {profile.coinQuantity}개
        </div>
      </div>
    </div>
  );
};

export default MyCoin;
