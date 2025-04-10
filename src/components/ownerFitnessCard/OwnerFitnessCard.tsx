import { useNavigate } from "react-router-dom";
import { TFacilities } from "../../types/ownerFacilities";

const OwnerFitnessCard = ({ id, img, name, address }: TFacilities) => {
  const navigate = useNavigate();

  const handleClick = (id: number) => {
    navigate(`/owner/facilities/${id}`);
  };

  return (
    <div className="w-full h-[165px] bg-white-100 shadow-md rounded-7 flex flex-col justify-between p-4">
      <div className="w-full flex items-center gap-4">
        <img src={img} alt="" className="w-20 h-20 rounded-7 object-cover" />
        <div className="flex flex-col gap-2">
          <p className="text-16px font-bold">{name}</p>
          <p className="text-12px text-gray-400">{address}</p>
        </div>
      </div>
      <button
        className="w-full p-2 border border-gray-300 rounded-7"
        onClick={() => handleClick(id)}
      >
        <p className="text-black-600 text-16px">관리</p>
      </button>
    </div>
  );
};

export { OwnerFitnessCard };
