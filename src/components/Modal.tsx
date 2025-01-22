interface IModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
  title: string;
  subTitle?: string;
  btn1Text?: string | null;
  btn2Text: string;
}

const Modal = ({ isOpen, onClose, onSuccess, title, subTitle, btn1Text, btn2Text }: IModalProps) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black-700 bg-opacity-50 flex justify-center items-center z-50">
      <div className={`bg-white-100 p-6 rounded-lg w-[300px] text-center px-4 pt-8 pb-5 ${subTitle ? 'h-[176px]' : 'h-[152px]'}`}>
        <div className="w-full h-full flex flex-col justify-between items-center">
          <h2 className="text-[18px] font-medium">{title}</h2>
          {subTitle && (
            <p className="text-[12px] font-medium text-gray-500 mb-[20px]">{subTitle}</p>
          )}
          <div
            className={`w-full flex ${btn1Text ? "justify-center gap-[10px]" : "justify-center"}`}
          >
            {btn1Text && (
              <button onClick={onClose} className="skyBlueButton w-[130px] h-[46px]">
                {btn1Text}
              </button>
            )}
            <button
              onClick={onSuccess}
              className={`blueButton h-[46px] ${btn1Text ? "w-[130px]" : "w-full"}`}
            >
              {btn2Text}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
