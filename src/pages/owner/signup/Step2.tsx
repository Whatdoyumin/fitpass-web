import { useState } from "react";
import InputField from "../../../components/InputField";
import { useLocation } from "react-router-dom";
import PhoneVerification from "../../../components/PhoneVerification";
import { useNavigate } from "react-router-dom";

function OwnerSignupStep2() {
  const navigate = useNavigate();
  const location = useLocation();
  const { id, password } = location.state || {};
  
  const [name, setName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [isCodeConfirmed, setIsCodeConfirmed] = useState(false);

  const isFormValid =
    name.trim() !== "" &&
    phoneNumber.trim() !== "" &&
    isCodeConfirmed;

  const handleNextStep = () => {
    if (!isFormValid) return;
    navigate("/owner/signup/step3", {
      state: { id, password, name, phoneNumber },
    });
  };

  return (
    <div className="w-full max-w-content flex flex-col items-center relative px-5 pt-[29px]">
      <div className="flex-grow w-full overflow-auto flex flex-col gap-[20px]">
        <div className="w-full flex flex-col gap-[10px]">
          <label htmlFor="name" className="text-[16px] font-medium text-black-700">
            이름
          </label>
          <InputField
            type="text"
            placeholder="이름을 입력해주세요"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>

        <PhoneVerification
          phoneNumber={phoneNumber}
          setPhoneNumber={setPhoneNumber}
          onVerifySuccess={() => setIsCodeConfirmed(true)}
        />
      </div>

      <button
        onClick={handleNextStep}
        disabled={!isFormValid}
        className={`z-50 fixed bottom-0 w-full max-w-content h-[86px] text-[20px] font-medium text-white-100 ${
          isFormValid ? "bg-blue-500 hover:bg-blue-400" : "bg-gray-400"
        }`}
        style={{
          paddingTop: "17px",
          paddingBottom: "39px",
        }}
      >
        입력하기 (2/3)
      </button>

    </div>
  );
}

export default OwnerSignupStep2;
