import React, { useState, useRef } from "react";
import {
  PasswordEye,
  PasswordEyeView,
  PasswordEyeFocus,
  PasswordEyeViewFocus,
} from "../../assets/svg";

interface InputFieldProps {
  type: string;
  placeholder: string;
  isPassword?: boolean; // 비밀번호 입력창 여부
}

function InputField({ type, placeholder, isPassword = false }: InputFieldProps) {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false); // 비밀번호 표시 여부
  const [isFocused, setIsFocused] = useState(false); // Focus 상태
  const inputRef = useRef<HTMLInputElement>(null); // input 참조

  const togglePasswordVisibility = (e: React.MouseEvent) => {
    e.preventDefault(); // focus 해제 방지
    setIsPasswordVisible(!isPasswordVisible);

    // input에 focus 유지
    inputRef.current?.focus();
  };

  return (
    <div
      className={`
        flex
        items-center
        h-[50px]
        px-[20px]
        py-[13px]
        gap-[25px]
        border
        border-gray-400
        rounded-[5px]
        bg-white
        ${isFocused ? "border-gray-500" : "border-gray-400"}
      `}
    >
      {/* 입력 필드 */}
      <input
        ref={inputRef}
        type={isPasswordVisible ? "text" : type}
        placeholder={placeholder}
        autoComplete="off"
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        className={`
          flex-grow
          outline-none
          text-[14px]
          font-medium
          leading-[30px]
          placeholder-gray-400
          tracking-[-0.3px]
          ${isFocused ? "text-gray-500" : "text-gray-400"}
        `}
        style={{
          WebkitTextSecurity: isPassword && !isPasswordVisible ? "disc" : "none", // 비밀번호 감추기
        }}
      />

      {/* 오른쪽 아이콘 (비밀번호 표시/숨김 토글) */}
      {isPassword && (
        <div
          className="w-[25px] h-[25px] flex justify-center items-center cursor-pointer"
          onMouseDown={togglePasswordVisibility} // focus 해제 방지
        >
          {isPasswordVisible ? (
            isFocused ? (
              <PasswordEyeViewFocus className="w-[19px] h-[20px]" />
            ) : (
              <PasswordEyeView className="w-[19px] h-[20px]" />
            )
          ) : isFocused ? (
            <PasswordEyeFocus className="w-[19px] h-[20px]" />
          ) : (
            <PasswordEye className="w-[19px] h-[20px]" />
          )}
        </div>
      )}
    </div>
  );
}

export default InputField;
