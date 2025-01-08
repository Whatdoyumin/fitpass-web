import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function ChangePhone() {
  const [name, setName] = useState(""); 
  const [password, setPassword] = useState(""); 
  const [phoneNumber, setPhoneNumber] = useState(""); 
  const [verificationCode, setVerificationCode] = useState("");
  const [isVerificationSent, setIsVerificationSent] = useState(false);
  const [isVerified, setIsVerified] = useState(false);
  const [timeLeft, setTimeLeft] = useState(180);
  const navigate = useNavigate();

  useEffect(() => {
    let timer: NodeJS.Timeout; // 타이머 타입 명시
    if (timeLeft > 0 && isVerificationSent) {
      timer = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [timeLeft, isVerificationSent]);

  const handleSendVerification = (): void => {
    setIsVerificationSent(true);
    setIsVerified(false);
    setTimeLeft(180); // 3분(180초)
    alert("인증번호가 전송되었습니다.");
  };

  const handleVerifyCode = (): void => {
    if (verificationCode === "1234") {
      setIsVerified(true);
      alert("인증이 완료되었습니다.");
    } else {
      alert("인증번호가 올바르지 않습니다.");
    }
  };

  const handleNavigate = (): void => {
    navigate("/my");
  };

  const formatTime = (seconds: number): string => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds < 10 ? "0" : ""}${remainingSeconds}`;
  };

  return (
    <div className="h-full w-full bg-white-100 px-[20px] py-[29px]">
      {/* 이름 입력 */}
      <div className="mb-[25px]">
        <label
          className="text-gray-800 text-[16px] font-medium"
          style={{ lineHeight: "19px" }}
        >
          이름
        </label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="이름을 입력해주세요"
          className="w-full p-3 border border-gray-300 rounded-md mt-[10px] text-[14px]"
        />
      </div>

      {/* 비밀번호 입력 */}
      <div className="mb-[25px]">
        <label
          className="text-gray-800 text-[16px] font-medium"
          style={{ lineHeight: "19px" }}
        >
          비밀번호
        </label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="비밀번호를 입력해주세요"
          className="w-full p-3 border border-gray-300 rounded-md mt-[10px] text-[14px]"
        />
      </div>

      {/* 휴대폰 번호 입력 */}
      <div className="mb-[162px]">
        <label
          className="text-gray-800 text-[16px] font-medium"
          style={{ lineHeight: "19px" }}
        >
          휴대폰 번호
        </label>
        <div className="flex items-center gap-2 mt-[10px] h-[50px] relative">

        <div className="relative flex-1">
        <input
            type="text"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
            placeholder="휴대폰 번호를 입력해주세요"
            className="w-full p-3 border rounded-md text-[14px] h-[50px]"
          />
          </div>
          <button
            type="button"
            onClick={handleSendVerification}
            className="bg-blue-500 text-white-100 px-4 py-2 rounded-md text-[14px] font-medium h-full max-w-[92px]"
          >
            인증하기
          </button>
        </div>
        <div className="flex items-center gap-2 mt-[10px] h-[50px] relative">
          <div className="relative flex-1">
            <input
              type="text"
              value={verificationCode}
              onChange={(e) => setVerificationCode(e.target.value)}
              placeholder="인증번호를 입력해주세요"
              disabled={!isVerificationSent}
              className={`w-full p-3 border rounded-md text-[14px] h-[50px] pr-[50px] ${
                isVerificationSent ? "border-gray-300" : "border-gray-200 bg-gray-100"
              }`}
            />
            {isVerificationSent && (
              <span className="absolute right-3 top-[50%] transform -translate-y-[50%] text-red-500 text-[14px]">
                {formatTime(timeLeft)}
              </span>
            )}
          </div>
          <button
            type="button"
            onClick={handleVerifyCode}
            disabled={!isVerificationSent}
            className={`px-4 py-2 rounded-md text-[14px] font-medium h-full ${
              isVerificationSent
                ? "bg-blue-500 text-white-100"
                : "bg-gray-300 text-gray-600"
            }`}
            style={{ whiteSpace: "nowrap" }}
          >
            확인하기
          </button>
        </div>
        {isVerificationSent && !isVerified && (
          <p className="text-red-500 text-[12px] mt-2">인증번호를 입력해주세요.</p>
        )}
        {isVerified && (
          <p className="text-green-500 text-[12px] mt-2">인증이 완료되었습니다.</p>
        )}
      </div>
      <div className="mb-[29px] fixed bottom-[86px] left-[50%] transform -translate-x-[50%] w-full px-[20px] flex justify-center">
        <button
          onClick={handleNavigate}
          type="submit"
          className="w-full max-w-[350px] h-[51px] bg-blue-500 text-white-100 rounded-lg text-[15px] font-bold"
        >
          변경하기
        </button>
      </div>

    </div>
  );
}

export default ChangePhone;
