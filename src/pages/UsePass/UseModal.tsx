import { IcCloseBtn } from "../../assets/svg";

type ModalProps = {
  onClose: () => void; // 모달을 닫는 함수
  children: React.ReactNode;
};

function UseModal({ onClose, children }: ModalProps) {
  return (
    <div className="fixed inset-0 bg-black-700 bg-opacity-60 flex justify-center items-center z-50">
      <div className="bg-white-100 p-6 rounded-lg w-[300px] shadow-lg relative">
        <button
          onClick={onClose}
          className="absolute top-[30px] left-[25px] text-gray-500 w-[12px] h-[12px] flex justify-center items-center"
        >
          <IcCloseBtn />
        </button>
        {children}
      </div>
    </div>
  );
}

export default UseModal;
