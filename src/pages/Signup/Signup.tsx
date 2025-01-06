import React from "react";
import InputField from "./InputField";

function Signup() {
  return (
    <div className="w-full max-w-content flex flex-col items-center gap-[25px]">
      {/* 아이디 입력창 */}
      <div className="w-full flex flex-col gap-[10px]">
        <label htmlFor="username" className="text-[16px] font-medium text-black-700">
          아이디
        </label>
        <InputField
          type="text"
          placeholder="아이디를 입력해주세요"
        />
      </div>

      {/* 비밀번호 입력창 */}
      <div className="w-full flex flex-col gap-[10px]">
        <label htmlFor="password" className="text-[16px] font-medium text-black-700">
          비밀번호
        </label>
        <InputField
          type="password"
          placeholder="비밀번호를 입력해주세요"
          isPassword={true}
        />

      {/* 비밀번호 확인 입력창 */}
        <InputField
          type="password"
          placeholder="비밀번호를 재확인해주세요"
          isPassword={true}
        />
      </div>

      {/* 다음 단계 버튼 */}
      <div className="fixed bottom-0 left-0 w-full h-[86px] bg-gray-400 flex justify-center">
        <button
          className="
          text-[20px]
          font-medium
          text-white-100
          rounded-[5px]
          py-[17px]
          px-[39px]
          h-[50px]
          "
        >
          입력하기 (1/2)
        </button>
      </div>
    </div>
  );
}

export default Signup;
