import { ChangeEvent } from "react";
import IcOpenEye from "../../../assets/svg/IcOpenEye";
import IcCloseEye from "../../../assets/svg/IcCloseEye";

interface InputFieldProps {
  type: string;
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  placeholder: string;
  isValid: boolean;
  errorMessage?: string;
  toggleVisibility?: () => void;
  isVisible?: boolean;
}

const InputField = ({
  type,
  value,
  onChange,
  placeholder,
  isValid,
  errorMessage,
  toggleVisibility,
  isVisible,
}: InputFieldProps) => (
  <div className="relative flex flex-col pt-[10px]">
    <input
      type={isVisible ? "text" : type}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      className={`w-full h-[50px] p-3 border ${
        isValid
          ? "border-gray-300 focus:outline-none focus:ring-1 focus:ring-black-700"
          : "border-red-500 focus:outline-none focus:ring-1 focus:ring-red-500"
      } rounded-md text-[14px]`}
      autoComplete="off"
    />
    {toggleVisibility && (
      <button
        type="button"
        onClick={toggleVisibility}
        className="absolute right-3 flex items-center justify-center h-[50px] p-[8px]"
      >
        {isVisible ? (
          <IcOpenEye width={19} height={14} />
        ) : (
          <IcCloseEye width={19} height={14} />
        )}
      </button>
    )}
    {errorMessage && (
      <p className="text-red-500 text-[13px] mt-[9px]">{errorMessage}</p>
    )}
  </div>
);

export default InputField;
