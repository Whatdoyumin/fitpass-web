import { FitpassLogo, Password, User, PasswordFocus, UserFocus, PlatformGoogle,PlatformKaKao,PlatformNaver } from "../../assets/svg";
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
          icon={<User />}
          iconFocus={<UserFocus />}
        />

        {/* 비밀번호 입력창 */}
        <InputField
          type="password"
          placeholder="비밀번호 입력"
          icon={<Password />}
          iconFocus={<PasswordFocus />}
          isPassword={true}
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

      <div className="flex justify-between w-[321px] text-12px text-gray-450 mt-[30px]">
        {/* 자동 로그인 */}
        <div className="inline-flex items-center gap-[12px]">
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
      <div className="flex gap-[35px] mt-[45.5px]">
        <PlatformKaKao className="w-[60px] h-[60px]" />
        <PlatformNaver className="w-[60px] h-[60px]" />
        <PlatformGoogle className="w-[60px] h-[60px]" />
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
          mt-[29px]
        "
      >
        계정이 없으신가요? 간편 가입하기
      </a>
    </div>
  );
}

export default Signin;
