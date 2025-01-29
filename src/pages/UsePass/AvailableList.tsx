import { useState, useEffect } from "react";
import AvailableItem from "./AvailableItem";
import Modal from "./UseModal";
import { IcNoAvailPass, IcUnderArrow, IcUpperArrow } from "../../assets/svg";

function AvailableList() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isChecked, setIsChecked] = useState(false); // 체크박스 상태
  const [isButtonActive, setIsButtonActive] = useState(false); // 버튼 상태
  const [isPassExpired, setIsPassExpired] = useState(false); // 패스 만료 상태
  const [passStartTime, setPassStartTime] = useState<number | null>(null); // 패스 사용 시작 시간
  const [isOpen, setIsOpen] = useState(false); // 약관 펼침 상태

  const fitnessData = [
    {
      name: "동국대학교 헬스장",
      address: "서울특별시 중구 올림픽로 789",
      distance: "5km",
      image:
        "https://pbs.twimg.com/media/GFesVWkaEAAlP-3.jpg:large",
    },
  ];

  const now = new Date();
  const currentTime = `${now.getFullYear()}.${String(now.getMonth() + 1).padStart(2, "0")}.${String(
    now.getDate()
  ).padStart(2, "0")} ${String(now.getHours()).padStart(2, "0")}:${String(
    now.getMinutes()
  ).padStart(2, "0")}`;

  // 패스를 사용하고, 사용 시작 시간을 기록합니다.
  const startPassUsage = () => {
    setPassStartTime(Date.now());
    setIsButtonActive(true);
  };

  // 1시간 후 패스 만료 처리
  useEffect(() => {
    if (passStartTime) {
      const timer = setInterval(() => {
        if (Date.now() - passStartTime >= 5000) {
          // 5초로 임시 설정
          setIsPassExpired(true); // 패스 만료 상태로 변경
          clearInterval(timer); // 타이머 종료
        }
      }, 1000); // 1초마다 체크
      return () => clearInterval(timer);
    }
  }, [passStartTime]);

  return (
    <div className="bg-white-200 px-[25px] py-[23px]">
      <h1 className="text-[18px] font-bold pb-[11px]">사용 가능 패스</h1>
      {isPassExpired ? (
        <div className="flex justify-center items-center p-auto" style={{ height: "100%" }}>
          <IcNoAvailPass width={"158px"} height={"192px"} />
        </div>
      ) : (
        <AvailableItem fitness={fitnessData} />
      )}

      {!isPassExpired && !isButtonActive && (
        <button
          onClick={() => setIsModalOpen(true)}
          className="w-[340px] h-[51px] rounded-[5px] mt-[19px] mb-[5px] bg-blue-500 text-white-100"
        >
          사용하기
        </button>
      )}

      {isButtonActive && !isPassExpired && (
        <button
          className="w-[340px] h-[51px] rounded-[5px] mt-[19px] mb-[5px] bg-white-100 border-[1px] border-blue-500 text-blue-500"
          disabled
        >
          사용 중
        </button>
      )}

      {isModalOpen && (
        <Modal
          onClose={() => {
            setIsModalOpen(false);
          }}
        >
          <div className="relative">
            <h2 className="text-xl font-bold text-center mb-4">사용하기</h2>

            <div className="p-[20px] bg-gray-200">
              <h3 className="text-black-700 text-[16px] mb-[19px] font-bold">패스 사용 목록</h3>
              <div className="flex justify-between text-[14px] mb-[17px]">
                <span className="text-gray-600">매장명</span>
                <span className="text-black-700">{fitnessData[0].name}</span>
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
                  checked={isChecked}
                  onChange={() => setIsChecked(!isChecked)}
                  className="rounded"
                />
                <span className="text-[12px]">사용 규정에 동의합니다</span>
              </label>

              <span
                className="flex items-center cursor-pointer"
                onClick={() => {
                  setIsOpen(!isOpen);
                }}
              >
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
                }}
              >
                <p>
                  여기 사용 규정 내용이 들어갑니다. 자세한 내용은 약관을 확인해주세요.여기 사용 규정
                  내용이 들어갑니다. 자세한 내용은 약관을 확인해주세요.여기 사용 규정 내용이
                  들어갑니다. 자세한 내용은 약관을 확인해주세요.
                </p>
              </div>
            )}

            <div className="flex justify-end gap-2 mt-4">
              <button
                onClick={() => {
                  if (isChecked) {
                    startPassUsage(); // 패스를 사용
                    setIsModalOpen(false);
                    alert("패스가 사용되었습니다!");
                  } else {
                    alert("사용 규정에 동의해야 합니다.");
                  }
                }}
                className="w-full h-[46px] px-4 py-2 bg-blue-500 text-white-100 rounded-[5px]"
              >
                사용하시겠습니까?
              </button>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
}

export default AvailableList;
