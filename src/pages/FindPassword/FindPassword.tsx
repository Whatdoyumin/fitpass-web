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
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const handleNextStep = () => {
    setShowChangePassword(true);
  };

  const handleChangePassword = () => {
    if (newPassword !== confirmPassword) {
      setPasswordError("비밀번호가 일치하지 않습니다.");
    } else {
      setPasswordError("");
      alert("비밀번호가 성공적으로 변경되었습니다.");
    }
  };

  return (
    <div className="w-full max-w-content flex flex-col items-center h-screen relative px-5 pt-[29px]">
      {showChangePassword ? (
        <ChangePasswordForm
          newPassword={newPassword}
          setNewPassword={setNewPassword}
          confirmPassword={confirmPassword}
          setConfirmPassword={setConfirmPassword}
          handleChangePassword={handleChangePassword}
          passwordError={passwordError}
        />
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
          handleSendCode={() => {}}
          handleVerifyCode={() => {}}
          handleNextStep={handleNextStep}
        />
      )}
    </div>
  );
}

export default FindPassword;
