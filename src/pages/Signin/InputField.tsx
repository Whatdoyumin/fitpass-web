import React from "react";

interface InputFieldProps {
  type: string;
  placeholder: string;
  icon: React.ReactNode;
  trailingIcon?: React.ReactNode; // 오른쪽 아이콘(예: 눈 아이콘)
}

function InputField({ type, placeholder, icon, trailingIcon }: InputFieldProps) {
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
        type={type}
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

      {/* 오른쪽 아이콘 (옵션) */}
      {trailingIcon && (
        <div className="w-[19px] h-[14px] flex justify-center items-center">
          {trailingIcon}
        </div>
      )}
    </div>
  );
}

export default InputField;
