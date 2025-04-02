import React, { useState, useRef } from "react";
import {
  PasswordEye,
  PasswordEyeView,
  PasswordEyeFocus,
  PasswordEyeViewFocus,
} from "../assets/svg";

interface InputFieldProps {
  type: string;
  placeholder: string;
  isPassword?: boolean; // 비밀번호 입력창 여부
  value?: string; // 입력값
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void; // 입력값 변경 핸들러
  hasError?: boolean; // 에러 여부
  onEnter?: () => void;
}

function InputField({
  type,
  placeholder,
  isPassword = false,
  value,
  onChange,
  hasError = false,
  onEnter
}: InputFieldProps) {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false); // 비밀번호 표시 여부
  const [isFocused, setIsFocused] = useState(false); // Focus 상태
  const inputRef = useRef<HTMLInputElement>(null); // input 참조

  /** 비밀번호 토글 함수 */
  const togglePasswordVisibility = (e: React.MouseEvent) => {
    e.preventDefault(); // focus 해제 방지
    setIsPasswordVisible(!isPasswordVisible);
    inputRef.current?.focus();
  };

  return (
    <div
      className={`flex items-center h-[50px] px-[20px] py-[13px] gap-[25px] border rounded-[5px] bg-white
        ${hasError ? "border-red-500" : isFocused ? "border-gray-500" : "border-gray-400"}
      `}
    >
      {/* 입력 필드 */}
      <input
        ref={inputRef}
        type={isPasswordVisible ? "text" : type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        autoComplete="off"
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        onKeyDown={(e) => {
          if (e.key === "Enter" && onEnter) {
            onEnter();
          }
        }}
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
        style={
          isPassword && !isPasswordVisible
            ? ({ WebkitTextSecurity: "disc" } as React.CSSProperties)
            : ({ WebkitTextSecurity: "none" } as React.CSSProperties)
        }
      />

      {/* 오른쪽 아이콘 (비밀번호 표시/숨김 토글) */}
      {isPassword && (
        <div
          className="w-[25px] h-[25px] flex justify-center items-center cursor-pointer"
          onMouseDown={togglePasswordVisibility}
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
