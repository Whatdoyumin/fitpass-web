import { useState } from "react";
import InputField from "../Signup/InputField";
import PhoneVerification from "../../components/PhoneVerification";

interface FindPasswordFormProps {
  handleNextStep: (data: { id: string; name: string; phoneNumber: string }) => void;
}

const FindPasswordForm: React.FC<FindPasswordFormProps> = ({ handleNextStep }) => {
  const [id, setId] = useState("");
  const [name, setName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [isCodeConfirmed, setIsCodeConfirmed] = useState(false);
  const [idError, setIdError] = useState("");
  const [nameError, setNameError] = useState("");

  return (
    <div className="flex-grow w-full overflow-auto flex flex-col gap-[25px]">
      {/* 아이디 입력 */}
      <div className="w-full flex flex-col gap-[10px]">
        <label htmlFor="id" className="text-[16px] font-medium text-black-700">
          아이디
        </label>
        <InputField
          type="text"
          placeholder="아이디를 입력해주세요"
          value={id}
          onChange={(e) => setId(e.target.value)}
          hasError={!!idError}
        />
        {idError && <span className="text-red-500 text-[13px]">{idError}</span>}
      </div>

      {/* 이름 입력 */}
      <div className="w-full flex flex-col gap-[10px]">
        <label htmlFor="name" className="text-[16px] font-medium text-black-700">
          이름
        </label>
        <InputField
          type="text"
          placeholder="이름을 입력해주세요"
          value={name}
          onChange={(e) => setName(e.target.value)}
          hasError={!!nameError}
        />
        {nameError && <span className="text-red-500 text-[13px]">{nameError}</span>}
      </div>

      {/* 휴대폰 인증 */}
      <PhoneVerification phoneNumber={phoneNumber} setPhoneNumber={setPhoneNumber} onVerifySuccess={() => setIsCodeConfirmed(true)} />

      <button
        onClick={() => handleNextStep({ id, name, phoneNumber })}
        disabled={!isCodeConfirmed}
        className="blueButton w-[350px] fixed bottom-[115px] h-[51px]"
      >
        변경하기
      </button>
    </div>
  );
};

export default FindPasswordForm;
