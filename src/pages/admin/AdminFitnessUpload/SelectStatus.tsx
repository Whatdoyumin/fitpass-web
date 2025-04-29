import { useState, useEffect } from "react";

type StatusProps = {
  status: boolean;
  onStatusChange: (status: boolean) => void;
};

function SelectStatus({ status, onStatusChange }: StatusProps) {
  const [selectedStatus, setSelectedStatus] = useState<boolean>(status);

  useEffect(() => {
    setSelectedStatus(status);
  }, [status]);

  const handleStatusClick = (newStatus: boolean) => {
    if (newStatus === selectedStatus) return;
    setSelectedStatus(newStatus);
    onStatusChange(newStatus);
  };

  return (
    <div className="w-full flex flex-col gap-4">
      <p>판매 상태</p>
      <div className="w-full flex gap-[6px]">
        <button
          type="button"
          className={`w-[70px] h-[30px] border rounded-[20px] text-[13px] font-medium 
            ${
              selectedStatus === true
                ? "bg-blue-100 border-blue-400"
                : "bg-white-200 border-gray-300"
            }`}
          onClick={() => handleStatusClick(true)}
        >
          구매 가능
        </button>
        <button
          type="button"
          className={`w-[70px] h-[30px] border rounded-[20px] text-[13px] font-medium 
            ${
              selectedStatus === false
                ? "bg-blue-100 border-blue-400"
                : "bg-white-200 border-gray-300"
            }`}
          onClick={() => handleStatusClick(false)}
        >
          구매 불가
        </button>
      </div>
    </div>
  );
}

export default SelectStatus;
