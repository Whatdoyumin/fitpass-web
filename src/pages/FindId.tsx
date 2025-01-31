import { useState } from "react";
import InputField from "./Signup/InputField";
import { useNavigate } from "react-router-dom";
import { findId } from "../apis/findid/findid";
import PhoneVerification from "../components/PhoneVerification";

function FindId() {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [isCodeConfirmed, setIsCodeConfirmed] = useState(false);
  const [showModal, setShowModal] = useState(false); // 모달 상태
  const [id, setId] = useState("");

  /** 확인하기 버튼 핸들러 */
  const handleNextStep = async () => {
    if (isCodeConfirmed) {
      const response = await findId({name, phoneNumber})
      setId(response)
      setShowModal(true); // 모달 열기
    }
  };

  /** 모달 닫기 */
  const closeModal = () => {
    setShowModal(false);
    navigate("/signin");
  };

  return (
    <div className="w-full max-w-content flex flex-col items-center h-screen relative px-5 pt-[29px]">
      {/* 스크롤 가능 영역 */}
      <div className="flex-grow w-full overflow-auto flex flex-col gap-5">
        {/* 이름 입력창 */}
        <div className="w-full flex flex-col gap-[10px]">
          <label htmlFor="name" className="text-[16px] font-medium text-black-700">
            이름
          </label>
          <InputField
            type="text"
            placeholder="이름을 입력해주세요"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>

        <PhoneVerification phoneNumber={phoneNumber} setPhoneNumber={setPhoneNumber} onVerifySuccess={() => setIsCodeConfirmed(true)} />
      </div>

      {/* 하단 버튼 */}
      <button
        onClick={handleNextStep}
        className={`blueButton w-[350px] fixed bottom-[115px] h-[51px]`}
      >
        확인하기
      </button>

      {/* 모달 창 */}
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black-700 bg-opacity-60 z-50">
          {/* 모달 콘텐츠 */}
          <div className="bg-white-100 rounded-lg pt-5 p-[15px] w-[300px] text-center z-60">
            <h2 className="text-[18px] font-medium text-black-700 mb-[10px]">회원님의 아이디는</h2>
            <p className="text-[12px] font-medium text-gray-500 mb-[35px]">{id} 입니다</p>
            <button onClick={closeModal} className="blueButton w-[270px] h-[46px]">
              확인
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default FindId;
