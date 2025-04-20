import InputField from "../../InputField";
import { IFacilitiesRegisterState } from "../../../types/ownerFacilities";
import ImageUploader from "../../common/ImageUploader";

const RegisterStep3 = ({ formState, setFormState }: IFacilitiesRegisterState) => {
  return (
    <div className="w-full flex flex-col justify-center items-center gap-6 px-2">
      {/* 시설 이용 방법 안내 */}
      <div className="w-full flex flex-col gap-[10px]">
        <label className="text-16px font-medium text-black-700">시설 이용 방법 안내</label>
        <InputField
          type="textarea"
          placeholder={`예) 시설 첫방문시 무인 입장 서비스에 등록 후 이용 가능합니다. 입장 후 필수로 등록이 필요하니 말씀해주세요.

운동복 대여 1,000원 라커룸 1달 10,000원입니다.
주차 불가능히며 근처 인근 주차장에 주차 하시길 바랍니다.`}
          value={formState.formData.howToUse}
          onChange={(e) =>
            setFormState((prev) => ({
              ...prev,
              formData: { ...prev.formData, howToUse: e.target.value },
            }))
          }
        />
      </div>

      {/* 대표 이미지 */}
      <div className="w-full flex flex-col gap-[6px]">
        <ImageUploader
          label="업체 대표 사진을 추가해주세요"
          subLabel="10MB 미만의 파일만 업로드 가능합니다. (PDF, JPEG, PNG)"
          images={formState.mainImage}
          setImages={(file) => setFormState((prev) => ({ ...prev, mainImage: file as File }))}
          multiple={false}
        />
      </div>

      {/* 추가 이미지 */}
      <ImageUploader
        label="대표 제외 업체 사진을 추가해주세요"
        subLabel="10MB 미만의 파일만 업로드 가능합니다. (PDF, JPEG, PNG)"
        images={formState.additionalImages}
        setImages={(files) =>
          setFormState((prev) => ({ ...prev, additionalImages: files as File[] }))
        }
        multiple={true}
      />
    </div>
  );
};

export { RegisterStep3 };
