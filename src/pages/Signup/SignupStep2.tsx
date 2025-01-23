import { useState, useEffect } from "react";
import InputField from "./InputField";
import { useNavigate, useLocation } from "react-router-dom";
import { MoreTerms } from "../../assets/svg";
import { signUp } from "../../apis/signup/signup";

function SignupStep2() {
  const location = useLocation();
  const navigate = useNavigate();
  const { id, password } = location.state || {};

  const [name, setName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [isPhoneVerified, setIsPhoneVerified] = useState(false);
  const [verificationCode, setVerificationCode] = useState("");
  const [isCodeSent, setIsCodeSent] = useState(false);
  const [isCodeConfirmed, setIsCodeConfirmed] = useState(false);
  const [timer, setTimer] = useState(180); // 3분 타이머
  const [isTimerRunning, setIsTimerRunning] = useState(false);

  const [agreements, setAgreements] = useState({
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
  const handleAgreementChange = (key: keyof typeof agreements) => {
    setAgreements((prev) => {
      const updated = { ...prev, [key]: !prev[key] };
      updated.all = Object.values(updated).every(Boolean);
      return updated;
    });
  };

  /** 타이머 시작 */
  useEffect(() => {
    let timerInterval: NodeJS.Timeout;
    if (isTimerRunning && timer > 0) {
      timerInterval = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);
    } else if (timer === 0) {
      clearInterval(timerInterval);
      setIsTimerRunning(false);
    }
    return () => clearInterval(timerInterval);
  }, [isTimerRunning, timer]);

  /** 휴대폰 번호 확인 */
  const validatePhoneNumber = () => {
    const regex = /^01[0-9]{8,9}$/; // 01로 시작하는 10-11자리 숫자
    return regex.test(phoneNumber);
  };

  /** 인증하기 버튼 핸들러 */
  const handleSendCode = () => {
    if (validatePhoneNumber()) {
      setIsCodeSent(true);
      setIsTimerRunning(true);
      setTimer(180); // 3분 타이머 시작
    }
  };

  /** 인증번호 확인 */
  const handleVerifyCode = () => {
    if (verificationCode === "123456") {
      setIsCodeConfirmed(true);
      setIsPhoneVerified(true);
      setIsTimerRunning(false);
    }
  };

  /** 모든 약관이 체크되었는지 확인 */
  const isFormValid =
    name.trim() !== "" &&
    phoneNumber.trim() !== "" &&
    isPhoneVerified &&
    agreements.terms &&
    agreements.location &&
    agreements.thirdParty;

  const handleNextStep = async () => {
    if (isFormValid) {
      try {
        await signUp(name, id, password, phoneNumber);
        navigate("/signin");
      } catch (error) {
        alert(error.message);
      }
    }
  };

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

          {/* 휴대폰 입력창 */}
          <div className="w-full flex flex-col gap-[10px]">
            <label htmlFor="phone" className="text-[16px] font-medium text-black-700">
              휴대폰 번호
            </label>
            <div className="flex items-center gap-[12px]">
              {/* 휴대폰 입력창 */}
              <div className="flex items-center h-[50px] px-[20px] border border-gray-400 rounded-[5px] flex-1 gap-[20px] relative">
                <input
                  type="text"
                  placeholder="휴대폰 번호를 -없이 입력해주세요"
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  className="w-full outline-none text-[14px] font-medium placeholder-gray-400"
                />
              </div>
              <button
                onClick={handleSendCode}
                disabled={!validatePhoneNumber()}
                className={`h-[50px] px-[20px] rounded-[5px] text-[15px] font-medium ${
                  validatePhoneNumber()
                    ? "bg-blue-500 text-white-100 hover:bg-blue-400"
                    : "bg-gray-400 text-white-100"
                }`}
              >
                인증하기
              </button>
            </div>

            {/* 인증번호 입력창 */}
            {isCodeSent && !isCodeConfirmed && (
              <div className="flex items-center gap-[12px] mt-[10px]">
                <div className="flex items-center h-[50px] px-[20px] border border-gray-400 rounded-[5px] flex-1 relative">
                  <input
                    type="text"
                    placeholder="인증번호를 입력해주세요"
                    value={verificationCode}
                    onChange={(e) => setVerificationCode(e.target.value)}
                    className="w-full outline-none text-[14px] font-medium placeholder-gray-400"
                  />
                  <span className="text-red-500 text-[14px] absolute right-[15px]">
                    {`${Math.floor(timer / 60)}:${String(timer % 60).padStart(2, "0")}`}
                  </span>
                </div>
                <button
                  onClick={handleVerifyCode}
                  disabled={verificationCode.length !== 6}
                  className={`h-[50px] px-[20px] rounded-[5px] text-[15px] font-medium ${
                    verificationCode.length === 6
                      ? "bg-blue-500 text-white-100 hover:bg-blue-400"
                      : "bg-blue-250 text-white-100"
                  }`}
                >
                  확인하기
                </button>
              </div>
            )}

            {isCodeConfirmed && (
              <span className="text-[15px] text-green-500 mt-[10px]">확인되었습니다.</span>
            )}
          </div>
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
                    checked={agreements[item.key]}
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
