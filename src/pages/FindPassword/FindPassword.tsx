import React, { useState } from "react";
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

  const validateFields = () => {
    if (username !== "qwe1234") setUsernameError("올바르지 않은 정보입니다.");
    if (name !== "가나다") setNameError("올바르지 않은 정보입니다.");
    return username === "qwe1234" && name === "가나다";
  };

  const handleSendCode = () => {
    if (phoneNumber.length === 11) {
      setIsCodeSent(true);
    }
  };

  const handleVerifyCode = () => {
    if (verificationCode === "123456") {
      setIsCodeConfirmed(true);
    }
  };

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
          timer={180}
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
