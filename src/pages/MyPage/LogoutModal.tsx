
interface LogoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLogout: () => void;
}

const LogoutModal = ({ isOpen, onClose, onLogout }: LogoutModalProps) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black-700 bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white-100 p-6 rounded-lg w-[300px] h-[152px] sm:w-[400px] text-center pt-[25px] pl-[15px] pr-[15px] pb-[15px]">
        <h2 className="text-[18px] font-medium mb-5"style={{lineHeight:'41px'}}>로그아웃 하시겠습니까?</h2>
        <div className="flex justify-center gap-[10px]">
          <button
            onClick={onClose}
            className="bg-blue-250 text-white px-4 py-2 rounded-md text-white-100 w-[130px] h-[46px]"
          >
            아니오
          </button>
          <button
            onClick={onLogout}
            className="bg-blue-500 text-white px-4 py-2 rounded-md text-white-100 w-[130px] h-[46px]"
          >
            네
          </button>
        </div>
      </div>
    </div>
  );
};

export default LogoutModal;
