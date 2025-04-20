import { useState, useRef } from "react";
import {
  User,
  UserFocus,
  Password,
  PasswordFocus,
  PasswordEye,
  PasswordEyeView,
  PasswordEyeFocus,
  PasswordEyeViewFocus,
} from "../assets/svg";

type InputType = "id" | "password" | "etc" | "textarea" | "radio" | "number";

interface InputFieldProps {
  type: InputType;
  placeholder?: string;
  value?: string | string[] | number;
  onChange?: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  onEnter?: () => void;
  buttonText?: string;
  onButtonClick?: () => void;
  radioOptions?: { label: string; value: string }[];
  name?: string;
}

function InputField({
  type,
  placeholder,
  value,
  onChange,
  onEnter,
  buttonText,
  onButtonClick,
  radioOptions,
  name,
}: InputFieldProps) {
  const [inputType, setInputType] = useState(type === "password" ? "password" : "text");
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const inputRef = useRef<HTMLInputElement | null>(null);

  const togglePasswordVisibility = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsPasswordVisible(!isPasswordVisible);
    setInputType(isPasswordVisible ? "password" : "text");
    inputRef.current?.focus();
  };

  if (type === "radio" && radioOptions) {
    const selectedValues = (value || []) as string[];

    const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const selected = e.target.value;
      const isChecked = selectedValues.includes(selected);

      const fakeEvent = {
        target: {
          value: isChecked
            ? selectedValues.filter((val) => val !== selected)
            : [...selectedValues, selected],
        },
      } as unknown as React.ChangeEvent<HTMLInputElement>;

      onChange?.(fakeEvent);
    };

    return (
      <div className="w-full flex gap-2">
        {radioOptions.map((option) => {
          const isSelected = selectedValues.includes(option.value);
          return (
            <label
              key={option.value}
              htmlFor={`${name}-${option.value}`}
              className={`cursor-pointer px-4 py-2 rounded-md border text-sm min-w-[80px] text-center transition
              ${
                isSelected
                  ? "bg-blue-100 border-blue-400 text-blue-600"
                  : "border-gray-300 text-gray-500"
              }`}
            >
              <input
                id={`${name}-${option.value}`}
                type="checkbox"
                name={name}
                value={option.value}
                checked={isSelected}
                onChange={handleCheckboxChange}
                className="hidden"
              />
              {option.label}
            </label>
          );
        })}
      </div>
    );
  }

  return (
    <div
      className={`flex w-[321px] gap-2 ${
        type === "textarea" ? "flex-col items-start" : "items-center"
      }`}
    >
      {/* input 컨테이너 */}
      <div
        className={`w-full flex items-center h-[50px] flex-1 py-[10px] px-[15px] border rounded-[5px] gap-[15px] relative ${
          isFocused ? "border-gray-500" : "border-gray-400"
        }`}
      >
        {/* 왼쪽 아이콘 */}
        {type === "id" || type === "password" ? (
          <div className="w-[25px] h-[25px] flex justify-center items-center">
            {type === "id" ? (
              isFocused ? (
                <UserFocus />
              ) : (
                <User />
              )
            ) : isFocused ? (
              <PasswordFocus />
            ) : (
              <Password />
            )}
          </div>
        ) : null}

        {/* input 또는 textarea */}
        {type === "textarea" ? (
          <textarea
            value={value as string}
            onChange={onChange as React.ChangeEventHandler<HTMLTextAreaElement>}
            placeholder={placeholder}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            className="w-full min-h-52 text-14px font-medium  placeholder-gray-400"
          />
        ) : (
          <input
            ref={inputRef}
            type={type === "password" ? inputType : type === "number" ? "number" : "text"}
            value={type === "number" && (value === 0 || value === "0") ? "" : value}
            placeholder={placeholder}
            autoComplete="off"
            onChange={onChange as React.ChangeEventHandler<HTMLInputElement>}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && onEnter) onEnter();
            }}
            className="w-full outline-none text-15px font-medium leading-[30px] placeholder-gray-400 tracking-[-0.3px]"
          />
        )}

        {/* 비밀번호 보기 토글 */}
        {type === "password" && (
          <div
            className="w-[25px] h-[25px] flex justify-center items-center cursor-pointer absolute right-[15px]"
            onMouseDown={togglePasswordVisibility}
          >
            {isPasswordVisible ? (
              isFocused ? (
                <PasswordEyeViewFocus />
              ) : (
                <PasswordEyeView />
              )
            ) : isFocused ? (
              <PasswordEyeFocus />
            ) : (
              <PasswordEye />
            )}
          </div>
        )}
      </div>

      {/* 오른쪽 버튼 */}
      {buttonText && onButtonClick && (
        <button
          type="button"
          className="text-14px px-5 py-[10px] h-[50px] blueButton whitespace-nowrap"
          onClick={onButtonClick}
        >
          {buttonText}
        </button>
      )}
    </div>
  );
}

export default InputField;
