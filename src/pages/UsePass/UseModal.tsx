
type ModalProps = {
  children: React.ReactNode;
  onClose: () => void;
};

function UseModal({ children, onClose }: ModalProps) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-white-100 p-6 rounded-lg w-[300px] shadow-lg">
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-500"
        >
          ✕
        </button>
        {children}
      </div>
    </div>
  );
}

export default UseModal;
