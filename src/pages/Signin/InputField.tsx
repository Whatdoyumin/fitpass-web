import React, { useState } from "react";
import { PasswordEye, PasswordEyeView } from "../../assets/svg";

interface InputFieldProps {
  type: string;
  placeholder: string;
  icon: React.ReactNode;
  isPassword?: boolean; // 비밀번호 입력창 여부
  trailingIcon?: React.ReactNode;
}

function InputField({ type, placeholder, icon, isPassword = false, trailingIcon }: InputFieldProps) {
  const [inputType, setInputType] = useState(type); // 입력 타입 상태 관리
  const [isPasswordVisible, setIsPasswordVisible] = useState(false); // 비밀번호 표시 여부

  const togglePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible);
    setInputType(isPasswordVisible ? "password" : "text"); // 타입 변경
  };

  return (
    <div
      className="
        flex
        items-center
        w-[321px]
        h-[50px]
        py-[10px]
        px-[15px]
        border
        border-gray-400
        rounded-[5px]
        gap-[15px]
      "
    >
      {/* 왼쪽 아이콘 */}
      <div className="w-[25px] h-[25px] flex justify-center items-center">
        {icon}
      </div>

      {/* 입력 필드 */}
      <input
        type={inputType}
        placeholder={placeholder}
        className="
          flex-grow
          outline-none
          text-[15px]
          font-medium
          text-gray-400
          leading-[30px]
          placeholder-gray-400
          tracking-[-0.3px]
        "
      />

      {/* 오른쪽 아이콘 (비밀번호 표시/숨김 토글) */}
      {isPassword ? (
        <div
          className="w-[25px] h-[25px] flex justify-center items-center cursor-pointer"
          onClick={togglePasswordVisibility}
        >
          {isPasswordVisible ? (
            <PasswordEyeView className="w-[19px] h-[20px]" />
          ) : (
            <PasswordEye className="w-[19px] h-[20px]" />
          )}
        </div>
      ) : (
        trailingIcon && (
          <div className="w-[25px] h-[25px] flex justify-center items-center">
            {trailingIcon}
          </div>
        )
      )}
    </div>
  );
}

export default InputField;
