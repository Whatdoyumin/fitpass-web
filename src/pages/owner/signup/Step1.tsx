import { useState } from "react";
import InputField from "../../Signup/InputField";
import { useNavigate } from "react-router-dom";
import { useCheckIDMutation } from "../../../hooks/useSignup";

function OwnerSignupStep1() {
  const [id, setId] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [idError, setIdError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [confirmPasswordError, setConfirmPasswordError] = useState("");

  const navigate = useNavigate();

  const validateId = (value: string) => {
    const regex = /^[a-zA-Z0-9]{4,12}$/;
    if (!regex.test(value)) {
      setIdError("영어와 숫자를 사용하여 4-12자의 아이디를 입력해주세요.");
    } else {
      setIdError("");
    }
    setId(value);
  };

  const validatePassword = (value: string) => {
    const regex = /^[a-zA-Z0-9]{8,20}$/;
    if (!regex.test(value)) {
      setPasswordError("영어와 숫자를 사용하여 8-20자로 입력해주세요.");
    } else {
      setPasswordError("");
    }
    setPassword(value);
  };

  const validateConfirmPassword = (value: string) => {
    if (value !== password) {
      setConfirmPasswordError("비밀번호가 일치하지 않습니다.");
    } else {
      setConfirmPasswordError("");
    }
    setConfirmPassword(value);
  };

  const isFormValid =
    idError === "" &&
    passwordError === "" &&
    confirmPasswordError === "" &&
    id.trim() !== "" &&
    password.trim() !== "" &&
    confirmPassword.trim() !== "";

  const checkIDMutation = useCheckIDMutation();

  const handleNextStep = () => {
    if (isFormValid) {
      checkIDMutation.mutate(
        { id },
        {
          onSuccess: () => {
            navigate("/owner/signup/step2", { state: { id, password } });
          },
          onError: (error: unknown) => {
            setIdError(error instanceof Error ? error.message : "알 수 없는 오류가 발생했습니다.");
          },
        }
      );
    }
  };

  return (
    <div className="w-full max-w-content flex flex-col items-center gap-[25px] relative px-5 pt-[29px]">

      <div className="w-full flex flex-col gap-[10px]">
        <label htmlFor="id" className="text-[16px] font-medium text-black-700">
          아이디
        </label>
        <InputField
          type="text"
          placeholder="아이디를 입력해주세요"
          value={id}
          onChange={(e) => validateId(e.target.value)}
          hasError={!!idError}
          onEnter={handleNextStep}
        />
        {idError && <span className="text-red-500 text-[13px]">{idError}</span>}
      </div>

      <div className="w-full flex flex-col gap-[10px]">
        <label htmlFor="password" className="text-[16px] font-medium text-black-700">
          비밀번호
        </label>
        <InputField
          type="password"
          placeholder="비밀번호를 입력해주세요"
          isPassword={true}
          value={password}
          onChange={(e) => validatePassword(e.target.value)}
          hasError={!!passwordError}
          onEnter={handleNextStep}
        />
        {passwordError && <span className="text-red-500 text-[13px]">{passwordError}</span>}

        <InputField
          type="password"
          placeholder="비밀번호를 재확인해주세요"
          isPassword={true}
          value={confirmPassword}
          onChange={(e) => validateConfirmPassword(e.target.value)}
          hasError={!!confirmPasswordError}
          onEnter={handleNextStep}
        />
        {confirmPasswordError && (
          <span className="text-red-500 text-[13px]">{confirmPasswordError}</span>
        )}
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
          height: "86px",
        }}
      >
        입력하기 (1/3)
      </button>
    </div>
  );
}

export default OwnerSignupStep1;
