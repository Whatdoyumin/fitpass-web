import { useState } from "react";
import FindPasswordForm from "./FindPasswordForm";
import ChangePasswordForm from "./ChangePasswordForm";
import { findPw } from "../../apis/findpw/findpw";
import { AxiosError } from "axios";

function FindPassword() {
  const [id, setId] = useState("");
  const [showChangePassword, setShowChangePassword] = useState(false);

  /** 다음 단계로 이동 */
  const handleNextStep = async ({ id, name, phoneNumber }: { id: string; name: string; phoneNumber: string }) => {
    try {
      await findPw({ id, name, phoneNumber });
      setId(id); // 아이디 저장 후 다음 단계로 이동
      setShowChangePassword(true);
    } catch (error) {
      if (error instanceof AxiosError) {
        alert(error.response?.data?.message || "비밀번호 찾기에 실패했습니다.");
      } else {
        alert("비밀번호 찾기에 실패했습니다.");
      }
    }
  };

  return (
    <div className="w-full max-w-content flex flex-col items-center h-screen relative px-5 pt-[29px]">
      {showChangePassword ? (
        <ChangePasswordForm id={id} />
      ) : (
        <FindPasswordForm handleNextStep={handleNextStep} />
      )}
    </div>
  );
}

export default FindPassword;
