import { useState } from "react";
import InputField from "../../Signup/InputField";
import { useLocation } from "react-router-dom";
import PhoneVerification from "../../../components/PhoneVerification";
import { useNavigate } from "react-router-dom";
import { MoreTerms } from "../../../assets/svg";

interface Agreements {
  all: boolean;
  terms: boolean;
  privacy: boolean;
  thirdParty: boolean;
  marketing: boolean;
}

function OwnerSignupStep3() {
  const navigate = useNavigate();
  const location = useLocation();
  const { id, password } = location.state || {};
  
  const [name, setName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [isCodeConfirmed, setIsCodeConfirmed] = useState(false);

  const [agreements, setAgreements] = useState<Agreements>({
    all: false,
    terms: false,
    privacy: false,
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

  const handleNextStep = () => {
    if (!isFormValid) return;
    navigate("/owner")
  };

  return (
    <div className="w-full max-w-content flex flex-col items-center relative px-5 pt-[29px]">
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

      <button
        onClick={handleNextStep}
        disabled={!isFormValid}
        className={`z-50 fixed bottom-0 w-full max-w-content h-[86px] text-[20px] font-medium text-white-100 ${
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

export default OwnerSignupStep3;
