import { useState, useEffect } from "react";
import Modal from "./UseModal";
import { IcNoAvailPass, IcUnderArrow, IcUpperArrow } from "../../assets/svg";
import FitnessCard from "../../components/fitnessCard/FitnessCard";
import { TFitness } from "../../types/fitnessCard";
import { usePostPass } from "../../apis/usepass/quries/useUsepassApi";
import { PAYMENT_POLICY } from "../../constants/policies";

type AvailableListProps = {
  passes: TFitness[];
  updatePassStatus: (passId: number | undefined, newStatus: string) => void;
};

const AvailableList = ({ passes, updatePassStatus }: AvailableListProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isAgree, setIsChecked] = useState(false); // 체크박스 상태
  const [isButtonActive, setIsButtonActive] = useState(false); // 버튼 상태
  const [remainingTime, setRemainingTime] = useState<number>(60 * 60); // 남은 시간 (60분)
  const [isOpen, setIsOpen] = useState(false); // 약관 펼침 상태
  const { mutate: postUsePass } = usePostPass();

  const now = new Date();
  const currentTime = `${now.getFullYear()}.${String(now.getMonth() + 1).padStart(2, "0")}.${String(
    now.getDate()
  ).padStart(2, "0")} ${String(now.getHours()).padStart(2, "0")}:${String(
    now.getMinutes()
  ).padStart(2, "0")}`;

  const startPassUsage = (passId: number | undefined) => {
    const startTime = Date.now();
    localStorage.setItem("passUsage", JSON.stringify({ passId, startTime }));

    setIsButtonActive(true);
    updatePassStatus(passId, "PROGRESS");

    setRemainingTime(60 * 60);
  };

  // 로컬스토리지에서 남은 시간 계산
  useEffect(() => {
    const storedPass = localStorage.getItem("passUsage");

    if (storedPass) {
      const { passId, startTime } = JSON.parse(storedPass);
      const elapsedTime = Math.floor((Date.now() - startTime) / 1000);
      const timeLeft = 60 * 60 - elapsedTime;

      if (timeLeft > 0) {
        setRemainingTime(timeLeft);
        setIsButtonActive(true);
      } else {
        localStorage.removeItem("passUsage");
        updatePassStatus(passId, "DONE");
      }
    }
  }, [updatePassStatus]);

  // 카운트다운
  useEffect(() => {
    if (isButtonActive && remainingTime > 0) {
      const timer = setInterval(() => {
        setRemainingTime((prevTime) => {
          if (prevTime <= 1) {
            clearInterval(timer);
            localStorage.removeItem("passUsage");
            setIsButtonActive(false);
            return 0;
          }
          return prevTime - 1;
        });
      }, 1000);

      return () => clearInterval(timer);
    }
  }, [isButtonActive, remainingTime]);

  const handlePostPass = () => {
    if (isAgree && passes.length > 0) {
      const pass = passes.find((pass) => pass.status === "NONE");
      if (pass) {
        postUsePass({ passId: pass.id, isAgree });
        setIsModalOpen(false);
        alert("패스가 사용되었습니다!");
        startPassUsage(pass.id);
      }
    }
  };

  const hasAvailablePass = passes.some(
    (pass) => pass.status === "NONE" || pass.status === "PROGRESS"
  );
  const isPassExpired = passes.length === 0 || !hasAvailablePass;
  const isNonePassAvailable = passes.some((pass) => pass.status === "NONE");
  const isAllProgress = passes.every((pass) => pass.status === "PROGRESS");

  return (
    <div className="bg-white-200 px-[25px] py-[23px]">
      <h1 className="text-[18px] font-bold pb-[11px]">사용 가능 패스</h1>
      {isPassExpired ? (
        <div className="flex justify-center items-center p-auto" style={{ height: "100%" }}>
          <IcNoAvailPass width={"158px"} height={"192px"} />
        </div>
      ) : (
        <div className="flex flex-col items-center">
          {passes.length > 0 && <FitnessCard fitness={passes} limitTime={remainingTime} />}
        </div>
      )}
      <div className="flex flex-col items-center">
        {isNonePassAvailable && !isAllProgress && (
          <button
            onClick={() => setIsModalOpen(true)}
            className="w-[340px] h-[51px] rounded-[5px] mt-[19px] mb-[5px] bg-blue-500 text-white-100"
          >
            사용하기
          </button>
        )}
        {isAllProgress && !isPassExpired && (
          <button
            className="w-[340px] h-[51px] rounded-[5px] mt-[19px] mb-[5px] bg-white-100 border-[1px] border-blue-500 text-blue-500"
            disabled
          >
            사용 중
          </button>
        )}
      </div>
      {isModalOpen && (
        <Modal onClose={() => setIsModalOpen(false)}>
          <div className="relative">
            <h2 className="text-xl font-bold text-center mb-4">사용하기</h2>
            <div className="p-[20px] bg-gray-200">
              <h3 className="text-black-700 text-[16px] mb-[19px] font-bold">패스 사용 목록</h3>
              <div className="flex justify-between text-[14px] mb-[17px]">
                <span className="text-gray-600">매장명</span>
                <span className="text-black-700">{passes[0]?.fitnessName}</span>
              </div>
              <div className="flex justify-between text-[14px]">
                <span className="text-gray-600">사용 일시</span>
                <span className="text-black-700">{currentTime}</span>
              </div>
            </div>

            <div className="flex justify-start gap-[10px] mt-4 text-gray-500 text-[12px]">
              <label className="flex gap-[13px]">
                <input
                  type="checkbox"
                  checked={isAgree}
                  onChange={() => setIsChecked(!isAgree)}
                  className="rounded"
                />
                <span className="text-[12px]">사용 규정에 동의합니다</span>
              </label>
              <span className="flex items-center cursor-pointer" onClick={() => setIsOpen(!isOpen)}>
                {isOpen ? (
                  <IcUpperArrow className="w-[9px] transform transition-transform" />
                ) : (
                  <IcUnderArrow className="w-[9px] transform transition-transform" />
                )}
              </span>
            </div>

            {isOpen && (
              <div
                className="mt-2 max-h-[150px] overflow-y-auto transition-all duration-300 ease-in-out"
                style={{
                  borderRadius: "7px",
                  border: "1px solid #BABABA",
                  background: "#F7F7F7",
                  padding: "10px",
                  fontSize: "14px",
                }}
              >
                <p className="whitespace-pre-line text-gray-500 text-12px">
                  {PAYMENT_POLICY[2].content}
                </p>
              </div>
            )}

            <div className="flex justify-end gap-2 mt-4">
              <button
                onClick={handlePostPass}
                disabled={!isAgree}
                className={`w-full h-[46px] px-4 py-2 rounded-[5px] ${
                  isAgree
                    ? "bg-blue-500 text-white-100"
                    : "bg-blue-250 text-white-100 cursor-not-allowed"
                }`}
              >
                사용하시겠습니까?
              </button>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
};

export default AvailableList;
