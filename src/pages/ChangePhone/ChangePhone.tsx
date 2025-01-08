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
  const [errors, setErrors] = useState({
    name: "",
    password: "",
    phone: "",
    verification: "",
  });
  const navigate = useNavigate();

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (timeLeft > 0 && isVerificationSent) {
      timer = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [timeLeft, isVerificationSent]);

  const handleSendVerification = (): void => {
    let hasError = false;
    const newErrors = {
      name: "",
      password: "",
      phone: "",
      verification: "",
    };

    if (name !== "한밤식") {
      newErrors.name = "올바르지 않은 이름입니다.";
      hasError = true;
    }

    if (password !== "currentpassword123") {
      newErrors.password = "올바르지 않은 비밀번호입니다.";
      hasError = true;
    }

    const phoneRegex = /^[0-9]{10,11}$/;
    if (!phoneRegex.test(phoneNumber)) {
      newErrors.phone = "올바른 전화번호 형식이 아닙니다.";
      hasError = true;
    }

    if (hasError) {
      setErrors(newErrors);
      return;
    } else {
      setErrors(newErrors);
    }

    // 모든 유효성 검사 통과하면 인증번호 전송
    setIsVerificationSent(true);
    setIsVerified(false);
    setTimeLeft(180); // 3분(180초)
    alert("인증번호가 전송되었습니다.");
  };

  const handleVerifyCode = (): void => {
    if (verificationCode === "1234") {
      setIsVerified(true);
      setIsVerificationSent(false);
      alert("인증이 완료되었습니다.");
    } else {
      setErrors((prev) => ({ ...prev, verification: "인증번호가 올바르지 않습니다." }));
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

  const handleSubmit = (): void => {
    if (isVerified) {
      handleNavigate();
    } else {
      setErrors((prev) => ({ ...prev, verification: "인증을 완료해주세요." }));
    }
  };

  return (
<div className="w-full bg-white-100 px-[20px] pt-[29px] flex flex-col justify-between overflow-y-auto">
{/* 이름 입력 */}
  <div className="mb-[25px]">
    <label className="text-gray-800 text-[16px] font-medium" style={{ lineHeight: "19px" }}>
      이름
    </label>
    <input
      type="text"
      value={name}
      onChange={(e) => setName(e.target.value)}
      placeholder="이름을 입력해주세요"
      className="w-full p-3 border border-gray-300 rounded-md mt-[10px] text-[14px]"
    />
    {errors.name && <p className="text-red-500 text-[12px] mt-2">{errors.name}</p>}
  </div>

  {/* 비밀번호 입력 */}
  <div className="mb-[25px]">
    <label className="text-gray-800 text-[16px] font-medium" style={{ lineHeight: "19px" }}>
      비밀번호
    </label>
    <input
      type="password"
      value={password}
      onChange={(e) => setPassword(e.target.value)}
      placeholder="비밀번호를 입력해주세요"
      className="w-full p-3 border border-gray-300 rounded-md mt-[10px] text-[14px]"
    />
    {errors.password && <p className="text-red-500 text-[12px] mt-2">{errors.password}</p>}
  </div>

  {/* 휴대폰 번호 입력 */}
  <div className="mb-[18vh]">
    <label className="text-gray-800 text-[16px] font-medium" style={{ lineHeight: "19px" }}>
      휴대폰 번호
    </label>
    <div className="flex items-center gap-2 mt-[10px] h-[50px] relative">
      <div className="relative flex-1">
        <input
          type="text"
          value={phoneNumber}
          onChange={(e) => setPhoneNumber(e.target.value)}
          placeholder="휴대폰 번호를 입력해주세요"
          className="w-full p-3 border border-gray-500 rounded-md text-[14px] h-[50px]"
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
    {errors.phone && <p className="text-red-500 text-[12px] mt-2">{errors.phone}</p>}

    <div className="flex items-center gap-2 mt-[10px] h-[50px] relative">
      <div className="relative flex-1">
        <input
          type="text"
          value={verificationCode}
          onChange={(e) => setVerificationCode(e.target.value)}
          placeholder="인증번호를 입력해주세요"
          disabled={!isVerificationSent}
          className={`w-full p-3 border rounded-md text-[14px] h-[50px] pr-[50px] ${
            isVerificationSent ? "border-gray-500" : "border-gray-400"
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
          isVerificationSent ? "bg-blue-500 text-white-100" : "bg-blue-250 text-white-100"
        }`}
        style={{ whiteSpace: "nowrap" }}
      >
        확인하기
      </button>
    </div>
    {errors.verification && <p className="text-red-500 text-[12px] mt-2">{errors.verification}</p>}
    {isVerified && (
      <p className="text-green-500 text-[12px] mt-2">인증이 완료되었습니다.</p>
    )}
  </div>

  {/* 버튼 */}
  <div className="button-container w-full flex justify-center mb-[29px]">
    <button
      onClick={handleSubmit}
      type="button"
      className="w-full max-w-[350px] h-[51px] bg-blue-500 text-white-100 rounded-lg text-[15px] font-bold"
    >
      변경하기
    </button>
  </div>
</div>


  );
}

export default ChangePhone;
