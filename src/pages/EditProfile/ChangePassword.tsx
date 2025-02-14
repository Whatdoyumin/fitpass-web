import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useChangePassword } from "../../apis/mypage/quries/useAuthChangeApi";
import InputField from "./common/InputField";
import Button from "./common/Button";

function ChangePassword() {
  const navigate = useNavigate();
  const { mutate: changePassword, isSuccess } = useChangePassword();

  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");

  const [passwordError, setPasswordError] = useState("");
  const [confirmPasswordError, setConfirmPasswordError] = useState("");

  const [isPasswordValid, setIsPasswordValid] = useState(true);
  const [isConfirmPasswordValid, setIsConfirmPasswordValid] = useState(true);

  const handleNewPasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setNewPassword(value);

    const passwordRegex = /^(?=.*[a-zA-Z])(?=.*\d)[A-Za-z\d]{8,20}$/;
    if (value === "") {
      setIsPasswordValid(true);
      setPasswordError("");
      return;
    }

    if (!passwordRegex.test(value)) {
      setPasswordError("영어와 숫자를 사용하여 8-20자로 입력해주세요.");
      setIsPasswordValid(false);
    } else {
      setIsPasswordValid(true);
      setPasswordError("");
    }
  };

  const handleConfirmPasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setConfirmNewPassword(value);

    if (value === newPassword && value !== "") {
      setIsConfirmPasswordValid(true);
      setConfirmPasswordError("");
    } else {
      setIsConfirmPasswordValid(false);
      setConfirmPasswordError("비밀번호가 일치하지 않습니다.");
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (isPasswordValid && isConfirmPasswordValid) {
      changePassword({
        password: currentPassword,
        newPassword: newPassword,
      });
    } else {
      alert("입력한 정보를 확인해주세요.");
    }
  };

  useEffect(() => {
    if (isSuccess) {
      sessionStorage.removeItem("accessToken");
      sessionStorage.removeItem("refreshToken");
    
      sessionStorage.clear();
      navigate("/signin");
    }
  }, [isSuccess, navigate]);

  return (
    <form
      className="w-full h-full bg-white-100 px-[20px] py-[29px] flex flex-col text-gray-400"
      onSubmit={handleSubmit}
    >
      <div className="min-h-[400px]">
      {/* 기존 비밀번호 입력 */}
      <div className="mb-[25px]">
        <label className="text-gray-800 text-[16px] font-medium">기존 비밀번호</label>
        <InputField
          type="password"
          value={currentPassword}
          isValid={true}
          onChange={(e) => setCurrentPassword(e.target.value)}
          placeholder="비밀번호를 입력해주세요"
        />
      </div>

      {/* 새로운 비밀번호 입력 */}
      <div className="mb-[25px]">
        <label className="text-gray-800 text-[16px] font-medium">새로운 비밀번호</label>
        <InputField
          type="password"
          value={newPassword}
          onChange={handleNewPasswordChange}
          placeholder="새로운 비밀번호를 입력해주세요"
          isValid={isPasswordValid}
          errorMessage={passwordError}
        />
        <InputField
          type="password"
          value={confirmNewPassword}
          onChange={handleConfirmPasswordChange}
          placeholder="새로운 비밀번호를 재확인해주세요"
          isValid={isConfirmPasswordValid}
          errorMessage={confirmPasswordError}
        />
      </div>
      </div>
      {/* 제출 버튼 */}
      <div className="button-container w-full flex justify-center mt-auto">
        <Button type="submit" text="변경하기" />
      </div>
    </form>
  );
}

export default ChangePassword;
