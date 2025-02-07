import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import InputField from "../EditProfile/common/InputField";
import Button from "../EditProfile/common/Button";

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
      newErrors.name = "올바르지 않은 정보입니다.";
      hasError = true;
    }

    if (password !== "aaaaaa456") {
      newErrors.password = "올바르지 않은 정보입니다.";
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

  const handleVerifyCode = () => {
    if (verificationCode !== "1234") {
      // 인증번호 불일치 처리
      setErrors({ ...errors, verification: "올바르지 않습니다. 다시 인증해주세요." });
      setIsVerified(false);
    } else {
      // 인증번호 일치 처리
      setErrors({ ...errors, verification: "" });
      setIsVerified(true);
      setIsVerificationSent(false);
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
    <div className="w-full h-full bg-white-100 px-[20px] py-[29px] flex flex-col">
      {/* 이름 입력 */}
      <div className="mb-[25px]">
        <label className="text-gray-800 text-[16px] font-medium" style={{ lineHeight: "19px" }}>
          이름
        </label>
        <InputField
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="이름을 입력해주세요"
          isValid={!errors.name}
          errorMessage={errors.name}
        />
      </div>

      {/* 비밀번호 입력 */}
      <form className="mb-[25px]">
        <label className="text-gray-800 text-[16px] font-medium" style={{ lineHeight: "19px" }}>
          비밀번호
        </label>
        <InputField
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="비밀번호를 입력해주세요"
          isValid={!errors.password}
          errorMessage={errors.password}
        />
      </form>

      <div className="">
        {/* 휴대폰 번호 입력 */}
        <label className="text-gray-800 text-[16px] font-medium" style={{ lineHeight: "19px" }}>
          휴대폰 번호
        </label>
        <div className="flex items-center gap-[12px] mt-[8px] h-[50px] relative">
          <div className="relative flex-1">
            <input
              type="text"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              placeholder="휴대폰 번호를 입력해주세요"
              className={`w-full p-3 border h-[50px] rounded-md text-[14px] ${
                errors.phone
                  ? "border-red-500 focus:ring-1 focus:ring-red-500"
                  : "border-gray-300 focus:ring-1 focus:ring-black-700"
              } focus:outline-none`}
            />
          </div>
          <button
            type="button"
            onClick={handleSendVerification}
            className="bg-blue-500 text-white-100 px-[20px] py-[13px] rounded-md text-[14px] font-medium max-w-[92px] w-full h-full"
          >
            인증하기
          </button>
        </div>
        {errors.phone && <p className="text-red-500 text-[13px] mt-[9px]">{errors.phone}</p>}

        {/* 인증번호 입력 */}
        <div className="flex items-center gap-[12px] mt-[23px] h-[50px] relative">
          <div className="relative flex-1">
            <input
              type="text"
              value={verificationCode}
              onChange={(e) => setVerificationCode(e.target.value)}
              placeholder="인증번호를 입력해주세요"
              disabled={!isVerificationSent || isVerified}
              className={`w-full p-3 border rounded-md text-[14px] h-[50px] pr-[50px] 
              ${
                errors.verification
                  ? "border-red-500 focus:ring-1 focus:ring-red-500"
                  : isVerificationSent
                  ? "border-gray-300 focus:ring-1 focus:ring-black-700"
                  : "border-gray-250"
              } focus:outline-none`}
            />
            {isVerificationSent && !isVerified && (
              <span className="absolute right-3 top-[50%] transform -translate-y-[50%] text-red-500 text-[14px]">
                {formatTime(timeLeft)}
              </span>
            )}
          </div>
          <button
            type="button"
            onClick={handleVerifyCode}
            disabled={!isVerificationSent || isVerified}
            className={`px-[20px] py-[13px] rounded-md text-[14px] font-medium max-w-[92px] w-full h-full ${
              isVerificationSent ? "bg-blue-500 text-white-100" : "bg-blue-250 text-white-100"
            }`}
            style={{ whiteSpace: "nowrap" }}
          >
            확인하기
          </button>
        </div>
        {errors.verification && (
          <p className="text-red-500 text-[13px] mt-[9px]">{errors.verification}</p>
        )}
        {isVerified && (
          <p className="text-green-500 text-[13px] mt-[9px]">인증이 완료되었습니다.</p>
        )}
      </div>

      {/* 버튼 */}
      <div className="button-container w-full flex justify-center mt-auto">
        <Button onClick={handleSubmit} type="button" text="변경하기" />
      </div>
    </div>
  );
}

export default ChangePhone;
