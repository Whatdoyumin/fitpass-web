import { IcCloseBtn } from "../../assets/svg";

type ModalProps = {
  onClose: () => void;
  children: React.ReactNode;
};

const UseModal = ({ onClose, children }: ModalProps) => {

  const handleCloseButton = (e: React.MouseEvent) => {
    e.stopPropagation();
    onClose(); 
  };

  const handleModalClick = () => {
    onClose();
  };

  return (
    <div
      className="fixed inset-0 bg-black-700 bg-opacity-60 flex justify-center items-center z-50"
      onClick={handleModalClick} 
    >
      <div
        className="bg-white-100 p-6 rounded-lg w-[300px] shadow-lg relative"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={handleCloseButton}
          className="absolute top-[30px] left-[25px] text-gray-500 w-[12px] h-[12px] flex justify-center items-center z-50"
        >
          <IcCloseBtn />
        </button>
        {children}
      </div>
    </div>
  );
};

export default UseModal;
