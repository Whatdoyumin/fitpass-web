import { useState, useEffect } from "react";
import InputField from "../../components/InputField";
import { useLocation } from "react-router-dom";
import { MoreTerms } from "../../assets/svg";
import { useSignUpMutation } from "../../hooks/useSignup";
import { useSocialSignup } from "../../hooks/useSocialSignup";
import PhoneVerification from "../../components/PhoneVerification";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Modal from "../../components/Modal";
import Toggle from "../../components/Toggle";

interface Agreements {
  all: boolean;
  terms: boolean;
  privacy: boolean;
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

  useEffect(() => {
    const getTokens = async () => {
      try {
        await axios.get(`${import.meta.env.VITE_BASE_URL}/signup/step2`, {
          withCredentials: true, // ✅ 쿠키 유지
        });
  
        const getCookie = (name: string) => {
          const match = document.cookie.match(new RegExp("(^| )" + name + "=([^;]+)"));
          return match ? match[2] : "";
        };
  
        const accessToken = getCookie("accessToken");
        const refreshToken = getCookie("refreshToken");
        const status = getCookie("status");
  
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
  
    getTokens();
  }, []);
  

  const [name, setName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [isCodeConfirmed, setIsCodeConfirmed] = useState(false);
  const [isLocationModalOpen, setIsLocationModalOpen] = useState(false);
  const [locationDeclinedOnce, setLocationDeclinedOnce] = useState(false);

  const [hasJob, setHasJob] = useState(false);
  const [companyName, setCompanyName] = useState("");

  const [agreements, setAgreements] = useState<Agreements>({
    all: false,
    terms: false,
    privacy: false,
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
      privacy: newState,
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
    agreements.privacy &&
    agreements.thirdParty;

  const signUpMutation = useSignUpMutation();
  const socialLoginMutation = useSocialSignup();

  const handleNextStep = () => {
    if (!isFormValid) return;

    // 위치 정보 동의 모달 
  if (!agreements.location && !locationDeclinedOnce) {
    setIsLocationModalOpen(true);
    return;
  }

    if (tokens.status === "register") {
      // ✅ 소셜 로그인 회원가입
      socialLoginMutation.mutate(
        { 
          name, 
          phoneNumber, 
          agreements, 
          agree: agreements.all, 
          isWork: hasJob, 
          company_name: companyName,
          accessToken: tokens.accessToken,
        },
        {
          onError: (error: unknown) => {
            console.error("🚨 소셜 회원가입 오류:", error);
            alert(error instanceof Error ? error.message : "소셜 로그인 회원가입 실패");
          },
        }
      );
    } else {
      signUpMutation.mutate(
        { name, id, password, phoneNumber, agreements, agree: agreements.all, isWork: hasJob, company_name: companyName },
        {
          onError: (error: unknown) => {
            alert(error instanceof Error ? error.message : "회원가입에 실패했습니다.");
          },
        }
      );
    }
  };

  return (
    <div className="w-full max-w-content flex flex-col items-center relative px-5 pt-[29px] text-[16px]">
      <div className="flex-grow w-full overflow-auto flex flex-col gap-[20px]">
        <div className="w-full flex flex-col gap-[10px]">
          <label htmlFor="name">
            이름
          </label>
          <InputField
            type="etc"
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

      {/* 직장 여부 토글 */}
      <div className="flex w-full items-center justify-between mt-[32px]">
        <p>
          현재 직장에 다니고 계신가요?
        </p>
        <Toggle
         isOn={hasJob} onToggle={() => setHasJob(!hasJob)} />
      </div>

      {/* 직장명 입력 */}
      {hasJob && (
        <div className="w-full flex flex-col mt-[10px]">
          <InputField
            type="etc"
            placeholder="직장명을 입력해주세요"
            value={companyName}
            onChange={(e) => setCompanyName(e.target.value)}
          />
        </div>
      )}

      {/* 약관 동의 섹션 */}
      <div className="w-full max-w-content flex flex-col items-center justify-center mx-auto fixed bottom-[100px] mb-[27px]">
        {/* 전체 약관 동의 */}
        <div className="w-full flex items-center gap-[17px] px-[45px] py-[10px]">
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
          { agreementKey: "terms", pathKey: "terms", label: "[필수] 이용 약관 동의" },
          { agreementKey: "privacy", pathKey: "privacy", label: "[필수] 개인정보 수집 및 이용 동의" },
          { agreementKey: "thirdParty", pathKey: "third-party", label: "[필수] 제3자 정보 제공 동의" },
          { agreementKey: "location", pathKey: "location-policy", label: "[선택] 위치 정보 서비스 이용약관 동의" },
          { agreementKey: "marketing", pathKey: "marketing-policy", label: "[선택] 마케팅 정보 제공 동의" },
        ].map((item) => (
          <label key={item.pathKey} className="flex items-center">
            <div className="flex items-center gap-[17px]">
              <input
                type="checkbox"
                checked={agreements[item.agreementKey as keyof Agreements]}
                onChange={() => handleAgreementChange(item.agreementKey as keyof Agreements)}
                className="w-[15px] h-[15px]"
              />
              {item.label}
            </div>
            <MoreTerms
              className="h-[11px] pl-[10px] cursor-pointer"
              onClick={() => navigate(`/${item.pathKey}`)}
            />
          </label>
        ))}

        </div>
      </div>

      {/* 하단 버튼 */}
      <button
        onClick={handleNextStep}
        disabled={!isFormValid}
        className={`fixed bottom-0 w-full max-w-content h-[86px] text-[20px] font-medium text-white-100 ${
          isFormValid ? "bg-blue-500 hover:bg-blue-400" : "bg-gray-400"
        }`}
        style={{
          paddingTop: "17px",
          paddingBottom: "39px",
        }}
      >
        동의하고 가입하기
      </button>

      {/* 위치 정보 이용 동의 모달 */}
      <Modal
        isOpen={isLocationModalOpen}
        onClose={() => {
          setIsLocationModalOpen(false);
          setLocationDeclinedOnce(true);
        }}
        onSuccess={() => {
          setAgreements((prev) => ({ ...prev, location: true }));
          setIsLocationModalOpen(false);
        }}
        title="위치 정보 이용 동의"
        subTitle="위치 정보 이용 동의를 하지 않을 경우 서비스 기능
일부분이 작동하지 않아 이용에 불편이 생길 수 있습니다."
        btn1Text="동의하지 않습니다"
        btn2Text="동의합니다"
      />

    </div>
  );
}

export default SignupStep2;
