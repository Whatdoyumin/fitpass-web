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
  icon: React.ReactNode;
  iconFocus?: React.ReactNode; // Focus 상태 아이콘
  isPassword?: boolean; // 비밀번호 입력창 여부
  trailingIcon?: React.ReactNode;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

function InputField({
  type,
  placeholder,
  icon,
  iconFocus,
  isPassword = false,
  trailingIcon,
  value,
  onChange,
}: InputFieldProps) {
  const [inputType, setInputType] = useState(type); // 입력 타입 상태 관리
  const [isPasswordVisible, setIsPasswordVisible] = useState(false); // 비밀번호 표시 여부
  const [isFocused, setIsFocused] = useState(false); // Focus 상태
  const inputRef = useRef<HTMLInputElement>(null); // input 참조

  const togglePasswordVisibility = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsPasswordVisible(!isPasswordVisible);
    setInputType(isPasswordVisible ? "password" : "text"); // 타입 변경

    inputRef.current?.focus();
  };

  return (
    <div
      className={`
        flex
        items-center
        w-[321px]
        h-[50px]
        py-[10px]
        px-[15px]
        border
        rounded-[5px]
        gap-[15px]
        ${isFocused ? "border-gray-500" : "border-gray-400"}
      `}
    >
      {/* 왼쪽 아이콘 */}
      <div className="w-[25px] h-[25px] flex justify-center items-center">
        {isFocused && iconFocus ? iconFocus : icon}
      </div>

      {/* 입력 필드 */}
      <input
        ref={inputRef}
        value={value}
        onChange={onChange}
        type={inputType}
        placeholder={placeholder}
        inputMode="text"
        autoComplete="off"
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        className={`
          flex-grow
          outline-none
          text-[15px]
          font-medium
          leading-[30px]
          placeholder-gray-400
          tracking-[-0.3px]
          ${isFocused ? "text-gray-500" : "text-gray-400"}
        `}
      />

      {/* 오른쪽 아이콘 (비밀번호 표시/숨김 토글) */}
      {isPassword ? (
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
