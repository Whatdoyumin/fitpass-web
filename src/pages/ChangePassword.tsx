import { useState } from "react";
import { useNavigate } from "react-router-dom"; 
import IcCloseEye from "../assets/svg/IcCloseEye"; 
import IcOpenEye from "../assets/svg/IcOpenEye";

interface ChangePasswordProps {
  currentPassword: string;
  newPassword: string;
  confirmNewPassword: string;
}

function ChangePassword({
  currentPassword,
  newPassword,
  confirmNewPassword
}: ChangePasswordProps) {

  const navigate = useNavigate(); 

  const [isNewPasswordVisible, setIsNewPasswordVisible] = useState(false);
  const [isConfirmPasswordVisible, setIsConfirmPasswordVisible] = useState(false);

  const toggleNewPasswordVisibility = () =>
    setIsNewPasswordVisible((prev) => !prev);

  const toggleConfirmPasswordVisibility = () =>
    setIsConfirmPasswordVisible((prev) => !prev);

    const handleNavigate = () => {
      navigate("/my");
    };

  return (
    <div className="bg-white-100 px-[20px] py-[29px]">
      <div className="mb-[25px]">
        <label className="text-gray-800 text-[16px] font-medium">기존 비밀번호</label>
        <input
          type="password"
          value={currentPassword}
          placeholder="비밀번호를 입력해주세요"
          className="w-full p-3 border border-gray-300 rounded-md mt-[10px] text-[14px]"
        />
      </div>

      <div className="mb-[227px]">
        <label className="text-gray-800 text-[16px] font-medium">새로운 비밀번호</label>
        <div className="relative mt-[10px]">
          <input
            type={isNewPasswordVisible ? "text" : "password"}
            value={newPassword}
            placeholder="새로운 비밀번호를 입력해주세요"
            className="w-full p-3 border border-gray-300 rounded-md text-[14px]"
          />
          <button
            type="button"
            onClick={toggleNewPasswordVisibility}
            className="absolute right-3 top-[50%] transform -translate-y-1/2"
          >
            {isNewPasswordVisible ? (
              <IcOpenEye width={19} height={14} />
            ) : (
              <IcCloseEye width={19} height={14} />
            )}
          </button>
        </div>

        <div className="relative mt-[10px]">
          <input
            type={isConfirmPasswordVisible ? "text" : "password"}
            value={confirmNewPassword}
            placeholder="새로운 비밀번호를 재확인해주세요"
            className="w-full p-3 border border-gray-300 rounded-md text-[14px]"
          />
          <button
            type="button"
            onClick={toggleConfirmPasswordVisibility}
            className="absolute right-3 top-[50%] transform -translate-y-1/2"
          >
            {isConfirmPasswordVisible ? (
              <IcOpenEye width={19} height={14} />
            ) : (
              <IcCloseEye width={19} height={14} />
            )}
          </button>
        </div>
      </div>

      <button 
        onClick={handleNavigate}
        className="w-full max-w-[350px] h-[51px] bg-blue-500 text-white-100 rounded-lg text-[15px] font-bold">
        변경하기
      </button>
    </div>
  );
}

export default ChangePassword;
