import { useState, useEffect } from "react";
import FindPasswordForm from "./FindPasswordForm";
import ChangePasswordForm from "./ChangePasswordForm";

function FindPassword() {
  const [username, setUsername] = useState("");
  const [name, setName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [verificationCode, setVerificationCode] = useState("");
  const [isCodeSent, setIsCodeSent] = useState(false);
  const [isCodeConfirmed, setIsCodeConfirmed] = useState(false);
  const [showChangePassword, setShowChangePassword] = useState(false);

  const [usernameError, setUsernameError] = useState("");
  const [nameError, setNameError] = useState("");

  const [timer, setTimer] = useState(180); // 3분 타이머
  const [isTimerRunning, setIsTimerRunning] = useState(false);

  /** 아이디와 이름 검증 */
  const validateFields = () => {
    let isValid = true;
    if (username !== "qwe1234") {
      setUsernameError("올바르지 않은 정보입니다.");
      isValid = false;
    } else {
      setUsernameError("");
    }

    if (name !== "가나다") {
      setNameError("올바르지 않은 정보입니다.");
      isValid = false;
    } else {
      setNameError("");
    }

    return isValid;
  };

  /** 인증번호 발송 */
  const handleSendCode = () => {
    if (phoneNumber.length === 11) {
      setIsCodeSent(true);
      setIsTimerRunning(true);
      setTimer(180); // 타이머 3분 초기화
    }
  };

  /** 인증번호 확인 */
  const handleVerifyCode = () => {
    if (verificationCode === "123456") {
      setIsCodeConfirmed(true);
      setIsTimerRunning(false); // 타이머 중지
    } else {
      setIsCodeConfirmed(false);
      alert("인증번호가 올바르지 않습니다.");
    }
  };

  /** 타이머 동작 */
  useEffect(() => {
    let timerInterval: NodeJS.Timeout;

    if (isTimerRunning) {
      timerInterval = setInterval(() => {
        setTimer((prevTimer) => {
          if (prevTimer > 0) {
            return prevTimer - 1;
          } else {
            clearInterval(timerInterval);
            setIsTimerRunning(false);
            setIsCodeSent(false);
            alert("인증 시간이 만료되었습니다. 다시 시도해주세요.");
            return 0;
          }
        });
      }, 1000);
    }

    return () => clearInterval(timerInterval);
  }, [isTimerRunning]);

  /** 다음 단계로 이동 */
  const handleNextStep = () => {
    if (validateFields() && isCodeConfirmed) {
      setShowChangePassword(true);
    }
  };

  return (
    <div className="w-full max-w-content flex flex-col items-center h-screen relative px-5 pt-[29px]">
      {showChangePassword ? (
        <ChangePasswordForm />
      ) : (
        <FindPasswordForm
          username={username}
          setUsername={setUsername}
          name={name}
          setName={setName}
          phoneNumber={phoneNumber}
          setPhoneNumber={setPhoneNumber}
          usernameError={usernameError}
          nameError={nameError}
          isCodeSent={isCodeSent}
          isCodeConfirmed={isCodeConfirmed}
          timer={timer}
          isTimerRunning={isTimerRunning}
          setTimer={setTimer}
          setIsTimerRunning={setIsTimerRunning}
          verificationCode={verificationCode}
          setVerificationCode={setVerificationCode}
          handleSendCode={handleSendCode}
          handleVerifyCode={handleVerifyCode}
          handleNextStep={handleNextStep}
        />
      )}
    </div>
  );
}

export default FindPassword;
