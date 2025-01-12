interface ProfileCommonModalProps {
  message: string;
  buttonText: string;
  onButtonClick: () => void;
}

const ProfileCommonModal = ({ message, buttonText, onButtonClick }: ProfileCommonModalProps) => {
  return (
    <div className="max-w-[300px] flex flex-col items-center pt-[25px] pl-[15px] pr-[15px] pb-[15px]">
      <p className="text-center text-gray-800 text-18px pb-[25px]">{message}</p>
      <button
        onClick={onButtonClick}
        className="w-[270px] h-[46px] bg-blue-500 text-white-100 rounded-lg"
      >
        {buttonText}
      </button>
    </div>
  );
};
export default ProfileCommonModal;
