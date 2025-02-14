import { useState, useRef } from "react";
import {
  //User,
  UserFocus,
  Password,
  PasswordFocus,
  PasswordEye,
  PasswordEyeView,
  PasswordEyeFocus,
  PasswordEyeViewFocus,
} from "../../assets/svg";

import User from '../../../public/svg/User.svg';

interface InputFieldProps {
  type: "id" | "password"; // "id" 또는 "password"로만 타입 제한
  placeholder: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

function InputField({ type, placeholder, value, onChange }: InputFieldProps) {
  const [inputType, setInputType] = useState(type === "password" ? "password" : "text");
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const togglePasswordVisibility = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsPasswordVisible(!isPasswordVisible);
    setInputType(isPasswordVisible ? "password" : "text");
    inputRef.current?.focus();
  };

  return (
    <div
      className={`flex items-center w-[321px] h-[50px] py-[10px] px-[15px] border rounded-[5px] gap-[15px] 
      ${isFocused ? "border-gray-500" : "border-gray-400"}`}
    >
      {/* 왼쪽 아이콘 (type이 id이면 User, password이면 Password) */}
      <div className="w-[25px] h-[25px] flex justify-center items-center">
        {type === "id" ? (isFocused ? <UserFocus /> : <img src={User} />) : isFocused ? <PasswordFocus /> : <Password />}
      </div>

      {/* 입력 필드 */}
      <input
        ref={inputRef}
        value={value}
        onChange={onChange}
        type={inputType}
        placeholder={placeholder}
        autoComplete="off"
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        className="flex-grow outline-none text-[15px] font-medium leading-[30px] placeholder-gray-400 tracking-[-0.3px]"
      />

      {/* (비밀번호 표시/숨김 토글) */}
      {type === "password" && (
        <div className="w-[25px] h-[25px] flex justify-center items-center cursor-pointer" onMouseDown={togglePasswordVisibility}>
          {isPasswordVisible ? (isFocused ? <PasswordEyeViewFocus /> : <PasswordEyeView />) 
          : isFocused ? <PasswordEyeFocus /> : <PasswordEye />}
        </div>
      )}
    </div>
  );
}

export default InputField;
