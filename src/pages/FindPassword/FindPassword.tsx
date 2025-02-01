import { useState } from "react";
import FindPasswordForm from "./FindPasswordForm";
import ChangePasswordForm from "./ChangePasswordForm";
import { findPw } from "../../apis/findpw/findpw";
import { AxiosError } from "axios";

function FindPassword() {
  const [id, setId] = useState("");
  const [name, setName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [isCodeConfirmed, setIsCodeConfirmed] = useState(false);
  const [showChangePassword, setShowChangePassword] = useState(false);

  const [idError, setIdError] = useState("");
  const [nameError, setNameError] = useState("");

  /** 다음 단계로 이동 */
  const handleNextStep = async () => {
    if (isCodeConfirmed) {
      try {
        await findPw({ id, name, phoneNumber });
        setShowChangePassword(true);
      } catch (error) {
        if (error instanceof AxiosError) {
          alert(error.response?.data?.message || "비밀번호 찾기에 실패했습니다.");
        } else {
          alert("비밀번호 찾기에 실패했습니다.");
        }
      }
    }
  };

  return (
    <div className="w-full max-w-content flex flex-col items-center h-screen relative px-5 pt-[29px]">
      {showChangePassword ? (
        <ChangePasswordForm
        id={id}
         />
      ) : (
        <FindPasswordForm
          id={id}
          setId={setId}
          name={name}
          setName={setName}
          phoneNumber={phoneNumber}
          setPhoneNumber={setPhoneNumber}
          idError={idError}
          nameError={nameError}
          isCodeConfirmed={isCodeConfirmed}
          setIsCodeConfirmed={setIsCodeConfirmed}
          handleNextStep={handleNextStep}
        />
      )}
    </div>
  );
}

export default FindPassword;
