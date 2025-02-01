import { useState, useEffect } from "react";
import { verifyCode, verifyPhoneNumber } from "../apis/verify/verify";
import { AxiosError } from "axios";

interface PhoneVerificationProps {
  phoneNumber: string;
  setPhoneNumber: (value: string) => void;
  onVerifySuccess: () => void; // 인증 성공 시 부모 컴포넌트에서 실행할 함수
}

const PhoneVerification: React.FC<PhoneVerificationProps> = ({
  phoneNumber,
  setPhoneNumber,
  onVerifySuccess,
}) => {
  const [certificationCode, setCertificationCode] = useState("");
  const [isCodeSent, setIsCodeSent] = useState(false);
  const [isCodeConfirmed, setIsCodeConfirmed] = useState(false);
  const [timer, setTimer] = useState(180); // 3분 타이머
  const [isTimerRunning, setIsTimerRunning] = useState(false);
  const [codeError, setCodeError] = useState("");

  /** 타이머 시작 */
  useEffect(() => {
    let timerInterval: ReturnType<typeof setInterval> | null = null;

    if (isTimerRunning && timer > 0) {
      timerInterval = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);
    } else if (timer === 0) {
      if (timerInterval) clearInterval(timerInterval);
      setIsTimerRunning(false);
    }

    return () => {
      if (timerInterval) clearInterval(timerInterval);
    };
  }, [isTimerRunning, timer]);

  /** 휴대폰 번호 확인 */
  const validatePhoneNumber = () => {
    const regex = /^01[0-9]{8,9}$/; // 01로 시작하는 10-11자리 숫자
    return regex.test(phoneNumber);
  };

  /** 인증하기 버튼 핸들러 */
  const handleSendCode = async () => {
    if (validatePhoneNumber()) {
      await verifyCode(phoneNumber);
      setIsCodeSent(true);
      setIsTimerRunning(true);
      setTimer(180); // 3분 타이머 시작
    }
  };

  /** 인증번호 확인 */
  const handleVerifyCode = async () => {
    if (certificationCode.length === 6) {
      try {
        await verifyPhoneNumber({ phoneNumber, certificationCode });
        setCodeError("");
        setIsCodeConfirmed(true);
        setIsTimerRunning(false);
        onVerifySuccess(); // 인증 성공 시 부모 컴포넌트에서 실행할 함수 호출
      } catch (error) {
        if (error instanceof AxiosError) {
          setCodeError(error.response?.data?.message || "인증에 실패했습니다.");
        } else {
          setCodeError("인증에 실패했습니다.");
        }
      }
    }
  };

  return (
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
              : "bg-blue-250 text-white-100"
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
              value={certificationCode}
              onChange={(e) => setCertificationCode(e.target.value)}
              className="w-full outline-none text-[14px] font-medium placeholder-gray-400"
            />
            <span className="text-red-500 text-[14px] absolute right-[15px]">
              {`${Math.floor(timer / 60)}:${String(timer % 60).padStart(2, "0")}`}
            </span>
          </div>
          <button
            onClick={handleVerifyCode}
            disabled={certificationCode.length !== 6}
            className={`h-[50px] px-[20px] rounded-[5px] text-[15px] font-medium ${
              certificationCode.length === 6
                ? "bg-blue-500 text-white-100 hover:bg-blue-400"
                : "bg-blue-250 text-white-100"
            }`}
          >
            확인하기
          </button>
        </div>
      )}

      {/* 인증번호 오류 메시지 */}
      {codeError && <span className="text-red-500 text-[13px] mt-[10px]">{codeError}</span>}
      {isCodeConfirmed && <span className="text-[15px] text-green-500 mt-[10px]">인증이 완료되었습니다.</span>}
    </div>
  );
};

export default PhoneVerification;
