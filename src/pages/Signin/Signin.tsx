import { 
  FitpassLogo, 
  Password, 
  User, 
  PasswordFocus, 
  UserFocus, 
} from "../../assets/svg";
import InputField from "./InputField";
import { useNavigate } from "react-router-dom";
import { signIn } from "../../apis/signin/signin";
import { useState } from "react";
import KakaoLoginButton from "../../components/socialLogin/KakaoLoginButton";
import GoogleLoginButton from "../../components/socialLogin/GoogleLoginButton";
import NaverLoginButton from "../../components/socialLogin/NaverLoginButton";

function Signin() {
  const navigate = useNavigate();
  const [id, setId] = useState("");
  const [password, setPassword] = useState("");
  const [signinError, setSigninError] = useState("");

  /** 회원가입 페이지로 이동 */
  const handleSignupRedirect = () => {
    navigate("/signup");
  };

  const handleFindId = () => {
    navigate("/find-id");
  }

  const handleFindPassword = () => {
    navigate("/find-password");
  }

  const handleSignin = async () => {
    if (!id || !password) {
      setSigninError("아이디와 비밀번호를 입력해주세요.");
      return;
    }
    
    try {
      await signIn({id, password});
      navigate("/");
    } catch (error) {
      setSigninError(error.message);
    }
  };

  return (
    <div className="w-full max-w-content flex flex-col items-center">
      <FitpassLogo className="w-[176px] h-[48px] mb-[40px]" />

      <div className="flex flex-col gap-[19px] mb-[17px]">
        {/* 아이디 입력창 */}
        <InputField
          type="text"
          placeholder="아이디 입력"
          value={id}
          onChange={(e) => setId(e.target.value)}
          icon={<User />}
          iconFocus={<UserFocus />}
        />

        {/* 비밀번호 입력창 */}
        <InputField
          type="password"
          placeholder="비밀번호 입력"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          icon={<Password />}
          iconFocus={<PasswordFocus />}
          isPassword={true}
        />
      </div>

      {signinError ? (
        <span className="text-red-500 text-[13px] mb-[18px] w-[321px]">{signinError}</span>
      ): (
        <span className="h-[37.5px]"></span>
      )}

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
        onClick={handleSignin}
      >
        로그인
      </button>

      <div className="flex justify-between w-[321px] text-[12px] text-gray-450 mt-[20.5px]">
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
        <button
        onClick={handleFindId}
        className="hover:underline focus:outline-none text-blue-500"
      >
        아이디 찾기
      </button>
      <span>|</span>
      <button
        onClick={handleFindPassword}
        className="hover:underline focus:outline-none text-blue-500"
      >
        비밀번호 찾기
      </button>
        </div>
      </div>

      {/* 소셜 로그인 */}
      <div className="flex gap-[35px] mt-[45.5px]">
        <KakaoLoginButton />
        <NaverLoginButton />
        <GoogleLoginButton />
      </div>

      <button
        onClick={handleSignupRedirect}
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
      </button>
    </div>
  );
}

export default Signin;
