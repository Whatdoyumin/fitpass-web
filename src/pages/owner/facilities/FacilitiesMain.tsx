import { useNavigate } from "react-router-dom";
import { Ifacilities } from "../../../assets/svg";
import { OwnerFitnessCard } from "../../../components/ownerFitnessCard/OwnerFitnessCard";
import Facilities from "../../../mocks/Facilities.json";

function FacilitiesMain() {
  const navigate = useNavigate();
  const handleClickRegister = () => {
    navigate("/owner/register/step1");
  };

  return (
    <div className="bg-white-200 px-5 pt-6 w-full max-w-content min-h-full absolute">
      {/* 시설 목록 */}
      <div className="w-full flex flex-col gap-4">
        {/* 시설 카드 */}
        {Facilities &&
          Facilities.map((facility) => (
            <OwnerFitnessCard
              key={facility?.id}
              id={facility?.id}
              img={facility?.img}
              name={facility?.name}
              address={facility?.address}
            />
          ))}
        {Facilities.length === 0 && (
          <div className="w-full py-16 flex flex-col items-center justify-center gap-2">
            <Ifacilities width={"72px"} />
            <p className="text-14px text-gray-350">등록된 시설이 없습니다.</p>
          </div>
        )}
      </div>

      {/* 시설 등록 버튼 */}
      <button
        className="w-[340px] h-[51px] blueButton bottom-navbar fixed left-0 right-0 mx-auto"
        onClick={() => handleClickRegister()}
      >
        시설 등록
      </button>
    </div>
  );
}

export default FacilitiesMain;
