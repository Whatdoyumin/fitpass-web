import { useState } from "react";

type StatusProps = {
  status: string[];
  onStatusChange: (status: string) => void;
}

function SelectStatus({ status, onStatusChange }: StatusProps) {

  const [selectedStatus, setSelectedStatus] = useState<string>("");

  const handleStatusClick = (status: string) => {
    if (status === selectedStatus) return;
    
    setSelectedStatus(status);
    onStatusChange(status);
    console.log(status);
  }

  return(
    <div className="w-full h-[50px] flex flex-col">
      <p>판매 상태</p>
      <div className="w-full flex gap-[6px]">
        {status.map((item, index) => (
          <button 
            type="button"
            className={`w-[70px] h-[30px] border rounded-[20px] text-[13px] font-medium
              ${selectedStatus === item ? 'bg-blue-100 border-blue-400' : 'bg-white-200 border-gray-300'}`}
            onClick={() => handleStatusClick(item)}
            key={index}
          >{item}</button>
        ))}
      </div>
    </div>
  );
}

export default SelectStatus;