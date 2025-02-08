import SvgIcCloseBtn from "../../../assets/svg/IcCloseBtn";

interface ModalProps {
  onClose: () => void;
}

function SetLocationModal({ onClose }: ModalProps) {
  return(
    <div className="fixed inset-0 bg-black-700 bg-opacity-50 z-50 flex justify-center items-center">
      <div className="bg-white-100 w-[430px] h-[569px] flex flex-col rounded-[10px] ">
        <div className="flex items-center justify-between p-[30px] ">
          <h1 className="font-bold text-[22px] text-gray-600 ">주소 검색</h1>
          <SvgIcCloseBtn width="14px" height="14px" onClick={onClose} />
        </div>
        <div className="border-b border-gray-350" />
        <div className="flex flex-col">
          <div className="flex justify-evenly py-[20px] ">
            <input 
              type="text"
              placeholder="상명대"
              className="w-[284px] h-[38px] border border-gray-400 pl-2"
            />
            <button 
              type="button"
              className="w-[67px] h-[38px] bg-gray-400 text-white-100 rounded-[5px] "
            >검색</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SetLocationModal;