import InputField from "../../InputField";
import { IFacilitiesRegisterState } from "../../../types/ownerFacilities";
import TimeInput from "../../common/TimeInput";

const RegisterStep2 = ({ formState, setFormState }: IFacilitiesRegisterState) => {
  const handleSetTime = (updatedTime: React.SetStateAction<{ [key: string]: string }>) => {
    setFormState((prev) => {
      const nextTime =
        typeof updatedTime === "function" ? updatedTime(prev.formData.time) : updatedTime;

      return {
        ...prev,
        formData: {
          ...prev.formData,
          time: nextTime,
        },
      };
    });
  };

  return (
    <div className="w-full flex flex-col justify-center items-center gap-4 px-2">
      {/* 시설 소개 */}
      <div className="w-full flex flex-col gap-[10px]">
        <label className="text-16px font-medium text-black-700">시설 소개</label>
        <InputField
          type="textarea"
          placeholder="예) 24시 운영 헬스장입니다. 200명이 이용 가능한 공간과 편의 시설이 준비되어 있습니다. 언제든지 편하게 방문하세요."
          value={formState.formData.notice}
          onChange={(e) =>
            setFormState((prev) => ({
              ...prev,
              formData: {
                ...prev.formData,
                notice: e.target.value,
              },
            }))
          }
        />
      </div>

      {/* 영업 시간 */}
      <div className="w-full flex flex-col gap-[10px]">
        <label className="text-16px font-medium text-black-700">영업 시간</label>
        <TimeInput initialTime={formState.formData.time} setTime={handleSetTime} />
      </div>
    </div>
  );
};

export { RegisterStep2 };
