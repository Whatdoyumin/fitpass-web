import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import InputField from "../EditProfile/common/InputField";
import { verifyCode, verifyPhoneNumber } from "../../apis/verify/verify";
import { useChangePhoneNumber } from "../../apis/mypage/quries/useAuthChangeApi";

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
  const [verificationMessage, setVerificationMessage] = useState("");
  const navigate = useNavigate();

  const { mutate: changePhoneNumber } = useChangePhoneNumber();

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (timeLeft > 0 && isVerificationSent) {
      timer = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [timeLeft, isVerificationSent]);

  const handleSendVerification = async (): Promise<void> => {
    let hasError = false;
    const newErrors = {
      name: "",
      password: "",
      phone: "",
      verification: "",
    };

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

    try {
      await verifyCode(phoneNumber);
      setIsVerificationSent(true);
      setIsVerified(false);
      setTimeLeft(180);
      setVerificationMessage("");
      alert("인증번호가 전송되었습니다.");
    } catch (error: unknown) {
      if (error) {
        setErrors((prev) => ({ ...prev, verification: "올바른 전화번호 형식이 아닙니다." }));
      } else {
        console.error("오류:", error);
      }
    }
  };

  const handleVerifyCode = async (): Promise<void> => {
    try {
      await verifyPhoneNumber({ phoneNumber, certificationCode: verificationCode });
      setErrors((prev) => ({ ...prev, verification: "" }));
      setIsVerified(true);
      setIsVerificationSent(false);
      setVerificationMessage("인증이 완료되었습니다.");
    } catch (error: unknown) {
      if (error) {
        setErrors((prev) => ({
          ...prev,
          verification: "인증번호가 일치하지 않습니다.",
        }));
        setIsVerified(false);
      } else {
        console.error("오류:", error);
      }
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      // changePhoneNumber 호출
      changePhoneNumber(
        { name, password, newPhoneNumber: phoneNumber },
        {
          onSuccess: (data) => {
            if (data.isSuccess) {
              // 전화번호 변경 성공 시 처리
              navigate("/my");
              console.log("전화번호 변경 완료");
            }
          },
          onError: (error) => {
            if (error?.response?.status === 401) {
              alert("비밀번호 또는 이름이 올바르지 않습니다.")
            }
          },
        }
      );
    } catch (error) {
      console.error("API 호출 실패:", error);
    }
  };

  const formatTime = (seconds: number): string => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds < 10 ? "0" : ""}${remainingSeconds}`;
  };

  return (
    <div className="w-full h-full bg-white-100 px-[20px] py-[29px] flex flex-col">
      <div className="h-[500px]">
        {/* 이름 입력 */}
        <div className="mb-[25px]">
          <label className="text-gray-800 text-[16px] font-medium">이름</label>
          <InputField
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="이름을 입력해주세요"
            isValid={!errors.name}
          />
        </div>

        {/* 비밀번호 입력 */}
        <div className="mb-[25px]">
          <label className="text-gray-800 text-[16px] font-medium">비밀번호</label>
          <InputField
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="비밀번호를 입력해주세요"
            isValid={!errors.password}
          />
        </div>

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
              className={`w-full p-3 border rounded-md text-[14px] h-[50px] ${
                errors.verification ? "border-red-500" : "border-gray-300"
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
          >
            확인하기
          </button>
        </div>
        {errors.verification && (
          <p className="text-red-500 text-[13px] mt-[9px]">{errors.verification}</p>
        )}
        {verificationMessage && (
          <p className="text-gray-500 text-[13px] mt-[9px]">{verificationMessage}</p>
        )}
      </div>

      {/* 변경하기 버튼 */}
      <div className="button-container w-full flex justify-center mt-auto">
        <button
          onClick={handleSubmit}
          type="button"
          className="w-full max-w-[350px] h-[51px] bg-blue-500 text-white-100 rounded-lg text-[15px] font-bold"
        >
          변경하기{" "}
        </button>
      </div>
    </div>
  );
}

export default ChangePhone;
