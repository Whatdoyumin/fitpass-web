import { useState } from "react";
import InputField from "./InputField";
import { useNavigate } from "react-router-dom";
import { checkID } from "../../apis/signup/signup";

function Signup() {
  const [id, setId] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [idError, setIdError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [confirmPasswordError, setConfirmPasswordError] = useState("");

  const navigate = useNavigate();

  // 유효성 검사 함수
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

  /** 다음 단계 이동 함수 */
  const handleNextStep = async () => {
    if (isFormValid) {
      try {
        await checkID({id});
        navigate("/signup/step2", { state: { id, password } });
      } catch (error) {
        setIdError(error.message);
      }
    }
  };

  return (
    <div className="w-full max-w-content flex flex-col items-center gap-[25px] relative px-5 pt-[29px]">
      {/* 아이디 입력창 */}
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
        />
        {idError && <span className="text-red-500 text-[13px]">{idError}</span>}
      </div>

        {/* 비밀번호 입력창 */}
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
          />
          {passwordError && <span className="text-red-500 text-[13px]">{passwordError}</span>}

          {/* 비밀번호 확인 입력창 */}
          <InputField
            type="password"
            placeholder="비밀번호를 재확인해주세요"
            isPassword={true}
            value={confirmPassword}
            onChange={(e) => validateConfirmPassword(e.target.value)}
            hasError={!!confirmPasswordError}
          />
          {confirmPasswordError && (
            <span className="text-red-500 text-[13px]">{confirmPasswordError}</span>
          )}
        </div>

      {/* 다음 단계 버튼 */}
      <button
        onClick={handleNextStep}
        disabled={!isFormValid}
        className={`fixed bottom-0 left-0 w-screen h-[86px] text-[20px] font-medium text-white-100 ${
          isFormValid ? "bg-blue-500 hover:bg-blue-400" : "bg-gray-400"
        }`}
        style={{
          paddingTop: "17px",
          paddingBottom: "39px",
          height: "86px",
        }}
      >
        입력하기 (1/2)
      </button>
    </div>
  );
}

export default Signup;
