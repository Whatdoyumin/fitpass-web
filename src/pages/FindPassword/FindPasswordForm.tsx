import type React from "react";
import InputField from "../Signup/InputField";
import PhoneVerification from "../../components/PhoneVerification";

interface FindPasswordFormProps {
  id: string;
  setId: (value: string) => void;
  name: string;
  setName: (value: string) => void;
  phoneNumber: string;
  setPhoneNumber: (value: string) => void;
  idError: string;
  nameError: string;
  isCodeConfirmed: boolean; 
  setIsCodeConfirmed: (value: boolean) => void; 
  handleNextStep: () => void;
}

const FindPasswordForm: React.FC<FindPasswordFormProps> = ({
  id,
  setId,
  name,
  setName,
  phoneNumber,
  setPhoneNumber,
  idError,
  nameError,
  isCodeConfirmed,
  setIsCodeConfirmed,
  handleNextStep,
}) => {
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

      <PhoneVerification
        phoneNumber={phoneNumber}
        setPhoneNumber={setPhoneNumber}
        onVerifySuccess={() => setIsCodeConfirmed(true)}
      />

      <button
        onClick={handleNextStep}
        disabled={!isCodeConfirmed}
        className={`blueButton w-[350px] fixed bottom-[115px] h-[51px]`}
      >
        변경하기
      </button>
    </div>
  );
};

export default FindPasswordForm;
