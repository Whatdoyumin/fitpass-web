import { useState, useEffect } from "react";
import InputField from "./InputField";
import { useLocation } from "react-router-dom";
import { MoreTerms } from "../../assets/svg";
import { useSignUpMutation } from "../../hooks/useSignup";
import PhoneVerification from "../../components/PhoneVerification";

interface Agreements {
  all: boolean;
  terms: boolean;
  location: boolean;
  thirdParty: boolean;
  marketing: boolean;
}

function SignupStep2() {
  const location = useLocation();
  const { id, password } = location.state || {};

  const [tokens, setTokens] = useState({
    accessToken: "",
    refreshToken: "",
    status: "",
  });

  useEffect(() => {
    const fetchTokens = async () => {
      try {
        const response = await fetch("http://localhost:5173/signup/step2", {
          method: "GET",
          credentials: "include", // ✅ 쿠키 사용 시 필요
        });

        const accessToken = response.headers.get("Authorization");
        const refreshToken = response.headers.get("X-Refresh-Token");
        const status = response.headers.get("X-Status");

        console.log("🔑 [소셜 로그인] 헤더 정보:", { accessToken, refreshToken, status })

        if (status === "register") {
          setTokens({
            accessToken: accessToken || "",
            refreshToken: refreshToken || "",
            status: "register",
          });
        }
      } catch (error) {
        console.error("헤더 데이터 가져오기 실패:", error);
      }
    };

        fetchTokens();
      }, []);
    

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

  /** 전체 동의 핸들러 */
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

  /** 개별 약관 핸들러 */
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

  const handleNextStep = () => {
    if (isFormValid) {
      signUpMutation.mutate({name, id, password, phoneNumber}, {
        onError: (error: unknown) => {
          alert(error instanceof Error ? error.message : "회원가입에 실패했습니다.");
        }
      });
      }
    }

  return (
      <div className="w-full max-w-content flex flex-col items-center h-screen relative px-5 pt-[29px]">
      {/* 스크롤 가능 영역 */}
      <div className="flex-grow w-full overflow-auto flex flex-col gap-[20px]">
        {/* 이름 입력창 */}
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

        <PhoneVerification phoneNumber={phoneNumber} setPhoneNumber={setPhoneNumber} onVerifySuccess={() => setIsCodeConfirmed(true)} />
      </div>

        {/* 약관 동의 섹션 */}
        <div className="w-full mb-[27px]">
          {/* 전체 약관 동의 */}
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

          {/* 개별 약관 섹션 */}
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
                    onChange={() => handleAgreementChange(item.key as keyof typeof agreements)}
                    className="w-[15px] h-[15px]"
                  />
                  {item.label}
                </div>
                <MoreTerms className="h-[9px] ml-[10px]" />
              </label>
            ))}
          </div>
        </div>

      {/* 하단 버튼 */}
      <button
        onClick={handleNextStep}
        disabled={!isFormValid}
        className={`fixed bottom-0 left-0 w-screen h-[86px] text-[20px] font-medium text-white-100 ${
          isFormValid ? "bg-blue-500 hover:bg-blue-400" : "bg-gray-400"
        }`}
        style={{
          paddingTop: "17px",
          paddingBottom: "39px",
        }}
      >
        동의하고 가입하기
      </button>
    </div>
  );
}

export default SignupStep2;
