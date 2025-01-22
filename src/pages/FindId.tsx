import { useState, useEffect } from "react";
import InputField from "./Signup/InputField";
import { useNavigate } from "react-router-dom";

function FindId() {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [isPhoneVerified, setIsPhoneVerified] = useState(false);
  const [verificationCode, setVerificationCode] = useState("");
  const [isCodeSent, setIsCodeSent] = useState(false);
  const [isCodeConfirmed, setIsCodeConfirmed] = useState(false);
  const [timer, setTimer] = useState(180); // 3분 (180초)
  const [isTimerRunning, setIsTimerRunning] = useState(false);
  const [showModal, setShowModal] = useState(false); // 모달 상태

  /** 타이머 시작 */
  useEffect(() => {
    let timerInterval: ReturnType<typeof setInterval> | null = null;

    if (isTimerRunning && timer > 0) {
      timerInterval = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);
    } else if (timer === 0) {
      if (timerInterval) {
        clearInterval(timerInterval);
      }
      setIsTimerRunning(false);
    }

    return () => {
      if (timerInterval) {
        clearInterval(timerInterval);
      }
    };
  }, [isTimerRunning, timer]);

  /** 휴대폰 번호 확인 */
  const validatePhoneNumber = () => {
    const regex = /^01[0-9]{8,9}$/;
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

  /** 확인하기 버튼 핸들러 */
  const handleNextStep = () => {
    if (isCodeConfirmed) {
      setShowModal(true); // 모달 열기
    }
  };

  /** 모달 닫기 */
  const closeModal = () => {
    setShowModal(false);
    navigate("/signin");
  };

  return (
    <div className="w-full max-w-content flex flex-col items-center h-screen relative px-5 pt-[29px]">
      {/* 스크롤 가능 영역 */}
      <div className="flex-grow w-full overflow-auto flex flex-col gap-5">
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
            <div className="flex items-center h-[50px] px-5 border border-gray-400 rounded-[5px] flex-1 gap-[20px] relative">
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
              className={`h-[50px] px-5 rounded-[5px] text-[15px] font-medium ${
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
              <div className="flex items-center h-[50px] px-5 border border-gray-400 rounded-[5px] flex-1 relative">
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
                className={`h-[50px] px-5 rounded-[5px] text-[15px] font-medium ${
                  verificationCode.length === 6
                    ? "bg-blue-500 text-white-100 hover:bg-blue-400"
                    : "bg-blue-250 text-white-100"
                }`}
              >
                확인하기
              </button>
            </div>
          )}

          {isCodeConfirmed && isPhoneVerified && (
            <span className="text-[15px] text-green-500 mt-[10px]">인증이 완료되었습니다.</span>
          )}
        </div>
      </div>

      {/* 하단 버튼 */}
      <button
        onClick={handleNextStep}
        className={`blueButton w-[350px] fixed bottom-[115px] h-[51px]`}
      >
        확인하기
      </button>

      {/* 모달 창 */}
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black-700 bg-opacity-60 z-50">
          {/* 모달 콘텐츠 */}
          <div className="bg-white-100 rounded-lg pt-5 p-[15px] w-[300px] text-center z-60">
            <h2 className="text-[18px] font-medium text-black-700 mb-[10px]">회원님의 아이디는</h2>
            <p className="text-[12px] font-medium text-gray-500 mb-[35px]">abcd123 입니다</p>
            <button onClick={closeModal} className="blueButton w-[270px] h-[46px]">
              확인
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default FindId;
