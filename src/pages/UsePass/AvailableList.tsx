import { useState } from "react";
import AvailableItem from "./AvailableItem";
import Modal from "./UseModal"; 

function AvailableList() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const fitnessData = [
    {
      name: "건국대 센터 A",
      address: "서울특별시 강남구 테헤란로 123",
      distance: "2km",
    },
  ];

  return (
    <div className="bg-gray-200 px-[25px] py-[23px]">
      <h1 className="text-[18px] font-bold pb-[11px]">사용 가능 패스</h1>
      <AvailableItem fitness={fitnessData} />
      <button
        onClick={() => setIsModalOpen(true)}
        className="w-[340px] h-[51px] bg-blue-500 text-white-100 rounded-[5px] mt-[19px] mb-[5px]"
      >
        사용하기
      </button>

      {isModalOpen && (
        <Modal onClose={() => setIsModalOpen(false)}>
          <div>
            <h2 className="text-xl font-bold mb-4">사용하기</h2>
            <div>
              <h3>패스 사용 목록</h3>
              <div>
                <span>매장명</span>
                <span>매장명</span>
              </div>
              <div>
                <span>사용 일시</span>
                <span>사용 일시</span>
              </div>
            </div>
            <div className="flex justify-end gap-2 mt-4">
              <button
                onClick={() => {
                  setIsModalOpen(false);
                  alert("패스가 사용되었습니다!");
                }}
                className="px-4 py-2 bg-blue-500 text-white-100 rounded"
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
