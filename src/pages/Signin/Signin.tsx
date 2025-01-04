import { FitpassLogo, Password, User, PasswordEye } from "../../assets/svg";
import InputField from "./InputField";

function Signin() {
  return (
    <div className="w-full max-w-content flex flex-col items-center px-sideGap">
      {/* 제목 */}
      <FitpassLogo className="w-[176px] h-[48px] mb-[40px]" />

      {/* 입력 필드 */}
      <div className="flex flex-col gap-[19px] mb-[40px]">
        {/* 아이디 입력창 */}
        <InputField
          type="text"
          placeholder="아이디 입력"
          icon={<User className="w-[25px] h-[25px] text-gray-400" />}
        />

        {/* 비밀번호 입력창 */}
        <InputField
          type="password"
          placeholder="비밀번호 입력"
          icon={<Password className="w-[19px] h-[20px] text-gray-400" />}
          trailingIcon={<PasswordEye className="w-[19px] h-[14px] text-gray-400 cursor-pointer" />}
        />
      </div>

      {/* 로그인 버튼 */}
      <button
        className="
          w-[321px]
          h-[51px]
          py-[17px]
          px-[15px]
          bg-blue-500
          text-white-100
          text-[16px]
          font-medium
          leading-none
          rounded-[5px]
          hover:bg-blue-400
        "
      >
        로그인
      </button>

      {/* 옵션 & 링크 */}
      <div className="flex justify-between w-[321px] text-12px text-gray-450 mt-[30px]">
        {/* 자동 로그인 */}
        <div className="inline-flex items-center gap-[12px]">
          {/* 체크박스 */}
          <input
            type="checkbox"
            className="
              w-[12px]
              h-[12px]
              rounded-[3px]
              border
              border-gray-500
              appearance-none
              checked:bg-blue-500
              checked:border-blue-500
            "
          />
          {/* 텍스트 */}
          <span className="text-gray-500 text-[12px] leading-none">
            자동 로그인
          </span>
        </div>
        <div className="flex gap-[13px] text-blue-500">
          <a href="#" className="hover:underline">
            아이디 찾기
          </a>
          <span>|</span>
          <a href="#" className="hover:underline">
            비밀번호 찾기
          </a>
        </div>
      </div>

      {/* 소셜 로그인 */}
      <div className="flex gap-4 mt-4">
        <button className="w-12 h-12 rounded-full bg-yellow-400">K</button>
        <button className="w-12 h-12 rounded-full bg-green-500">N</button>
        <button className="w-12 h-12 rounded-full bg-blue-500">G</button>
      </div>

      {/* 회원가입 */}
      <a
        href="#"
        className="
          flex
          justify-center
          items-center
          gap-[10px]
          w-[321px]
          py-[12px]
          px-[51px]
          text-blue-500
          text-[14px]
          font-medium
          leading-[19px]
          tracking-[-0.28px]
          border
          border-blue-500
          rounded-[5px]
          hover:bg-blue-100
          mt-4
        "
      >
        계정이 없으신가요? 간편 가입하기
      </a>
    </div>
  );
}

export default Signin;
