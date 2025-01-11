import { useState } from "react";
import { useNavigate } from "react-router-dom";
import InputField from "../ChangePhone/common/InputField";
import Button from "../ChangePhone/common/Button";

interface ChangePasswordProps {
  currentPassword: string;
  newPassword: string;
  confirmNewPassword: string;
}

function ChangePassword({ currentPassword, newPassword, confirmNewPassword }: ChangePasswordProps) {
  const navigate = useNavigate();

  const [newPasswordState, setNewPasswordState] = useState(newPassword);
  const [isNewPasswordVisible, setIsNewPasswordVisible] = useState(false);
  const [isConfirmPasswordVisible, setIsConfirmPasswordVisible] = useState(false);

  const [passwordError, setPasswordError] = useState("");
  const [confirmPasswordError, setConfirmPasswordError] = useState("");
  const [currentPasswordError, setCurrentPasswordError] = useState("");
  const [isCurrentPasswordValid, setIsCurrentPasswordValid] = useState(true);

  const [isPasswordValid, setIsPasswordValid] = useState(true);
  const [isConfirmPasswordValid, setIsConfirmPasswordValid] = useState(true);

  const toggleNewPasswordVisibility = () => setIsNewPasswordVisible((prev) => !prev);

  const toggleConfirmPasswordVisibility = () => setIsConfirmPasswordVisible((prev) => !prev);

  const handleNavigate = () => {
    navigate("/my");
  };

  const validateCurrentPassword = (value: string) => {
    const validPassword = "currentpassword123";
    setCurrentPasswordError("");

    if (value === "") {
      setIsCurrentPasswordValid(true);
      setCurrentPasswordError("");
    } else if (value === validPassword) {
      setIsCurrentPasswordValid(true);
      setCurrentPasswordError("");
    } else {
      setIsCurrentPasswordValid(false);
      setCurrentPasswordError("올바르지 않은 정보입니다");
    }
  };

  const handleNewPasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setPasswordError("");
    setNewPasswordState(value);

    if (value === "") {
      setIsPasswordValid(true);
      setPasswordError("");
    } else {
      const passwordRegex = /^(?=.*[a-zA-Z])(?=.*\d)[A-Za-z\d]{8,20}$/;
      if (!passwordRegex.test(value)) {
        setPasswordError("영어와 숫자를 사용하여 8-20자로 입력해주세요.");
        setIsPasswordValid(false);
      } else {
        setIsPasswordValid(true);
      }
    }
  };

  const handleConfirmPasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setConfirmPasswordError("");

    if (value === newPasswordState && value !== "") {
      setIsConfirmPasswordValid(true);
      setConfirmPasswordError("");
    } else {
      setIsConfirmPasswordValid(false);
      if (value === "") {
        setIsConfirmPasswordValid(true);
        setConfirmPasswordError("");
      } else {
        setConfirmPasswordError("비밀번호가 일치하지 않습니다.");
      }
    }
  };

  return (
    <form
      className="h-full bg-white-100 px-[20px] py-[29px] text-gray-400 overflow-y-auto"
      onSubmit={handleNavigate}
    >
      <div className="mb-[25px]">
        <label className="text-gray-800 text-[16px] font-medium">기존 비밀번호</label>
        <InputField
          type="password"
          value={currentPassword}
          onChange={(e) => validateCurrentPassword(e.target.value)}
          placeholder="비밀번호를 입력해주세요"
          isValid={isCurrentPasswordValid}
          errorMessage={currentPasswordError}
        />
      </div>

      <div className="">
        <label className="text-gray-800 text-[16px] font-medium">새로운 비밀번호</label>
        <InputField
          type="password"
          value={newPassword}
          onChange={handleNewPasswordChange}
          placeholder="새로운 비밀번호를 입력해주세요"
          isValid={isPasswordValid}
          errorMessage={passwordError}
          toggleVisibility={toggleNewPasswordVisibility}
          isVisible={isNewPasswordVisible}
        />
      </div>

      <div className="mb-[266px]">
        <InputField
          type="password"
          value={confirmNewPassword}
          onChange={handleConfirmPasswordChange}
          placeholder="새로운 비밀번호를 재확인해주세요"
          isValid={isConfirmPasswordValid}
          errorMessage={confirmPasswordError}
          toggleVisibility={toggleConfirmPasswordVisibility}
          isVisible={isConfirmPasswordVisible}
        />
      </div>

      <div className="button-container w-full flex justify-center">
        <Button
          onClick={handleNavigate}
          type="button"
          text="변경하기"
        />
      </div>
    </form>
  );
}

export default ChangePassword;
