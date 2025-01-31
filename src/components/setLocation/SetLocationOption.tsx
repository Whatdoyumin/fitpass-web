import { useNavigate } from "react-router-dom";

interface SetLocationOptionProps {
  setMode: React.Dispatch<React.SetStateAction<"default" | "my-location" | "search">>;
}

const SetLocationOption = ({ setMode }: SetLocationOptionProps) => {
  const navigate = useNavigate();

  return (
    <div className="w-full h-full bg-gray-300 absolute left-0 top-0 z-20">
      <div className="w-full h-[352px] bg-white-100 rounded-tl-15 rounded-tr-15 pb-navbar bottom-0 absolute">
        <div className="w-full h-full px-6 pt-14 pb-10 flex flex-col gap-6">
          <p className="text-black-700 font-medium text-18px">원하는 지역을 선택해보세요.</p>
          <div className="w-full flex flex-col gap-4">
            <button
              className="w-full blueButton px-[124px] py-3.5"
              onClick={() => setMode("my-location")}
            >
              내 위치
            </button>
            <button
              className="w-full blueButton px-[124px] py-3.5"
              onClick={() => navigate("/search-location")}
            >
              지역 선택
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export { SetLocationOption };
