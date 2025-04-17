import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import RegisterStep1 from "../../../components/owner/FacilitiesRegister/RegisterStep1";
import { RegisterStep2 } from "../../../components/owner/FacilitiesRegister/RegisterStep2";
import { RegisterStep3 } from "../../../components/owner/FacilitiesRegister/RegisterStep3";
import { TFacilitiesRegisterForm } from "../../../types/ownerFacilities";

function FacilitiesRegister() {
  const navigate = useNavigate();
  const location = useLocation();

  const stepFromPath = Number(location.pathname.split("step")[1]) || 1;
  const [step, setStep] = useState(stepFromPath);

  const [formState, setFormState] = useState<TFacilitiesRegisterForm>({
    formData: {
      totalFee: 0,
      detailAddress: "",
      fee: 0,
      latitude: 0,
      longitude: 0,
      fitnessName: "",
      isPurchasable: true,
      address: "",
      phoneNumber: "",
      notice: "",
      howToUse: "",
      categoryList: [],
      purchasable: true,
      time: {},
    },
    mainImage: null,
    additionalImages: [],
  });

  useEffect(() => {
    setStep(stepFromPath);
  }, [stepFromPath]);

  const handleNext = () => {
    if (step < 3) {
      navigate(`/owner/register/step${step + 1}`);
    } else {
      handleSubmit();
    }
  };

  const handleSubmit = () => {
    console.log("최종 제출:", formState);
    alert("시설 등록 완료!");
  };

  return (
    <>
      <div className="py-6 pb-[90px] absolute">
        {step === 1 && <RegisterStep1 formState={formState} setFormState={setFormState} />}
        {step === 2 && <RegisterStep2 formState={formState} setFormState={setFormState} />}
        {step === 3 && <RegisterStep3 formState={formState} setFormState={setFormState} />}
      </div>

      <button
        onClick={handleNext}
        className="w-full max-w-content h-navbar py-6 bottom-0 fixed text-white-100 bg-blue-500 flex justify-center items-center text-[20px] z-20"
      >
        {step < 3 ? `등록하기 (${step}/3)` : "등록하기"}
      </button>
    </>
  );
}

export default FacilitiesRegister;
