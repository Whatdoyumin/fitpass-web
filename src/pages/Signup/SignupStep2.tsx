import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import InputField from "./InputField";
import PhoneVerification from "../../components/PhoneVerification";
import { useSignUpMutation } from "../../hooks/useSignup";
import { useSocialSignup } from "../../hooks/useSocialSignup";

interface Agreements {
  all: boolean;
  terms: boolean;
  location: boolean;
  thirdParty: boolean;
  marketing: boolean;
}

function SignupStep2() {
  const navigate = useNavigate();
  const location = useLocation();
  const { id, password } = location.state || {}; 

  const [tokens, setTokens] = useState({
    accessToken: "",
    refreshToken: "",
    status: "",
  });

  // ✅ 쿠키에서 값 가져오기 함수
  const getCookie = (name: string) => {
    const match = document.cookie.match(new RegExp("(^| )" + name + "=([^;]+)"));
    return match ? match[2] : "";
  };

  useEffect(() => {
    // ✅ 쿠키에서 `accessToken`, `refreshToken`, `status` 가져오기
    const accessToken = getCookie("accessToken");
    const refreshToken = getCookie("refreshToken");
    const status = getCookie("status");

    console.log("🍪 [소셜 로그인] 쿠키 데이터:", { accessToken, refreshToken, status });

    if (accessToken && refreshToken && status) {
      setTokens({ accessToken, refreshToken, status });
    }
  }, [navigate]);

  const [name, setName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [isCodeConfirmed, setIsCodeConfirmed] = useState(false);

  const [agreements, setAgreements] = useState<Agreements>({
    all: false,
    terms: false,
    location: false,
    thirdParty: false,
    marketing: false,
  });

  /** ✅ 전체 동의 */
  const handleAllAgreement = () => {
    const newState = !agreements.all;
    setAgreements({
      all: newState,
      terms: newState,
      location: newState,
      thirdParty: newState,
      marketing: newState,
    });
  };

  /** ✅ 개별 약관 동의 */
  const handleAgreementChange = (key: keyof Agreements) => {
    setAgreements((prev) => {
      const updated = { ...prev, [key]: !prev[key] };
      updated.all = Object.values(updated).every(Boolean);
      return updated;
    });
  };

  const isFormValid =
    name.trim() !== "" &&
    phoneNumber.trim() !== "" &&
    isCodeConfirmed &&
    agreements.terms &&
    agreements.location &&
    agreements.thirdParty;

  const signUpMutation = useSignUpMutation();
  const socialSignUp = useSocialSignup();

  /** ✅ 회원가입 요청 (소셜 로그인 / 일반 회원가입 구분) */
  const handleNextStep = async () => {
    if (isFormValid) {
      if (tokens.accessToken) {
        socialSignUp.mutate({name, phoneNumber},
          {
            onError: (error: unknown) => {
              alert(error instanceof Error ? error.message : "소셜 로그인에 실패했습니다.");
            },
          }
        )
      } else {
        // ✅ 일반 회원가입 요청
        signUpMutation.mutate(
          { name, id, password, phoneNumber },
          {
            onError: (error: unknown) => {
              alert(error instanceof Error ? error.message : "회원가입에 실패했습니다.");
            },
          }
        );
      }
    }
  };

  return (
    <div className="w-full max-w-content flex flex-col items-center h-screen relative px-5 pt-[29px]">
      {/* ✅ 입력 폼 */}
      <div className="flex-grow w-full overflow-auto flex flex-col gap-[20px]">
        <div className="w-full flex flex-col gap-[10px]">
          <label htmlFor="name" className="text-[16px] font-medium text-black-700">
            이름
          </label>
          <InputField
            type="text"
            placeholder="이름을 입력해주세요"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>

        <PhoneVerification
          phoneNumber={phoneNumber}
          setPhoneNumber={setPhoneNumber}
          onVerifySuccess={() => setIsCodeConfirmed(true)}
        />
      </div>

      {/* ✅ 약관 동의 */}
      <div className="w-full mb-[27px]">
        <div className="w-full flex items-center gap-[17px] px-[26px] py-[10px]">
          <input
            type="checkbox"
            checked={agreements.all}
            onChange={handleAllAgreement}
            className="w-[15px] h-[15px]"
          />
          <span className="text-[14px] text-gray-500 font-normal leading-[19px] tracking-[-0.28px]">
            전체 약관에 동의합니다
          </span>
        </div>

        <div
            className="
            flex
            flex-col
            items-start
            w-[350px]
            px-[25px]
            py-[10px]
            gap-[14px]
            border
            border-gray-400
            rounded-[5px]
            font-normal
            text-[14px]
            text-gray-500
            leading-[19px]
            tracking-[-0.28px]
            font-['Inter']
          "
          >
          {[
            { key: "terms", label: "[필수] 이용 약관 동의" },
            { key: "location", label: "[필수] 위치 정보 서비스 이용약관 동의" },
            { key: "thirdParty", label: "[필수] 제3자 정보 제공 동의" },
            { key: "marketing", label: "[선택] 마케팅 정보 제공 동의" },
          ].map((item) => (
            <label key={item.key} className="flex items-center">
              <div className="flex items-center gap-[17px]">
                <input
                  type="checkbox"
                  checked={agreements[item.key as keyof Agreements]}
                  onChange={() => handleAgreementChange(item.key as keyof Agreements)}
                  className="w-[15px] h-[15px]"
                />
                {item.label}
              </div>
            </label>
          ))}
        </div>
      </div>

      {/* ✅ 회원가입 버튼 */}
      <button
        onClick={handleNextStep}
        disabled={!isFormValid}
        className={`fixed bottom-0 left-0 w-screen h-[86px] text-[20px] font-medium text-white-100 ${
          isFormValid ? "bg-blue-500 hover:bg-blue-400" : "bg-gray-400"
        }`}
        style={{ paddingTop: "17px", paddingBottom: "39px" }}
      >
        동의하고 가입하기
      </button>
    </div>
  );
}

export default SignupStep2;
