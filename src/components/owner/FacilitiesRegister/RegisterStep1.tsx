import InputField from "../../InputField";
import { IFacilitiesRegisterState } from "../../../types/ownerFacilities";

function RegisterStep1({ formState, setFormState }: IFacilitiesRegisterState) {
  const selectedCategory = formState.formData.categoryList?.[0] || "";

  return (
    <div className="w-full flex flex-col justify-center items-center gap-4 px-2">
      {/* 업체명 */}
      <div className="w-full flex flex-col gap-[10px]">
        <label className="text-16px font-medium text-black-700">업체명</label>
        <InputField
          type="etc"
          placeholder="업체명을 입력해주세요"
          value={formState.formData.fitnessName}
          onChange={(e) =>
            setFormState((prev) => ({
              ...prev,
              formData: { ...prev.formData, fitnessName: e.target.value },
            }))
          }
          onEnter={() => {}}
        />
      </div>

      {/* 주소 */}
      <div className="w-full flex flex-col gap-[10px]">
        <label className="text-16px font-medium text-black-700">주소</label>
        <InputField
          type="etc"
          placeholder="주소를 입력해주세요"
          value={formState.formData.address}
          onChange={(e) =>
            setFormState((prev) => ({
              ...prev,
              formData: { ...prev.formData, address: e.target.value },
            }))
          }
          onEnter={() => {}}
          buttonText="검색"
          onButtonClick={() => {}}
        />
      </div>

      {/* 상세 주소 */}
      <div className="w-full flex flex-col gap-[10px]">
        <label className="text-16px font-medium text-black-700">상세 주소</label>
        <InputField
          type="etc"
          placeholder="상세 주소를 입력해주세요"
          value={formState.formData.detailAddress}
          onChange={(e) =>
            setFormState((prev) => ({
              ...prev,
              formData: { ...prev.formData, detailAddress: e.target.value },
            }))
          }
          onEnter={() => {}}
        />
      </div>

      {/* 시설 전화번호 */}
      <div className="w-full flex flex-col gap-[10px]">
        <label className="text-16px font-medium text-black-700">시설 전화번호</label>
        <InputField
          type="etc"
          placeholder="시설 전화번호를 입력해주세요"
          value={formState.formData.phoneNumber}
          onChange={(e) =>
            setFormState((prev) => ({
              ...prev,
              formData: { ...prev.formData, phoneNumber: e.target.value },
            }))
          }
          onEnter={() => {}}
        />
      </div>

      {/* 운동 카테고리 */}
      <div className="w-full flex flex-col gap-[10px]">
        <label className="text-16px font-medium text-black-700">운동 카테고리를 선택해주세요</label>
        <InputField
          type="radio"
          value={selectedCategory}
          onChange={(e) =>
            setFormState((prev) => ({
              ...prev,
              formData: { ...prev.formData, categoryList: [e.target.value] },
            }))
          }
          radioOptions={[
            { label: "헬스", value: "health" },
            { label: "필라테스", value: "fila" },
            { label: "요가", value: "yoga" },
            { label: "기타", value: "etc" },
          ]}
          name="fitness-category"
        />
      </div>

      {/* 가격 */}
      <div className="w-full flex flex-col gap-[10px]">
        <label className="text-16px font-medium text-black-700">가격을 입력해주세요</label>
        <InputField
          type="number"
          placeholder="시설 일일권 가격을 적어주세요"
          value={formState.formData.fee.toString()}
          onChange={(e) =>
            setFormState((prev) => ({
              ...prev,
              formData: { ...prev.formData, fee: Number(e.target.value) || 0 },
            }))
          }
          onEnter={() => {}}
        />
      </div>

      {/* 판매 코인 */}
      <div className="w-full flex flex-col gap-[10px]">
        <label className="text-16px font-medium text-black-700">판매 코인을 입력해주세요</label>
        <InputField
          type="number"
          placeholder="1코인당 1,000원의 가치를 가지고 있습니다."
          value={formState.formData.totalFee.toString()}
          onChange={(e) =>
            setFormState((prev) => ({
              ...prev,
              formData: { ...prev.formData, totalFee: Number(e.target.value) || 0 },
            }))
          }
          onEnter={() => {}}
        />
      </div>
    </div>
  );
}

export default RegisterStep1;
