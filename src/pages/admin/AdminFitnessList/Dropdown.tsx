import { useState } from "react";
import { ArrowDropDown, ArrowDropUp } from "../../../assets/svg";

interface DropdownProps {
  selectedItem: string;
  onSelect: (item: string) => void;
}

function Dropdown({ selectedItem, onSelect }: DropdownProps) {
  const [adminDropdown, setAdminDropdown] = useState(false);
  const dropdown: string[] = ["업체명", "이용 종목", "전화번호"];

  const toggleDropdown = () => setAdminDropdown((prev) => !prev);

  return (
    <div className="text-medium text-[12px] relative">
      <button
        onClick={toggleDropdown}
        className="relative w-[89px] h-[48px] rounded-[6px] border border-gray-300 bg-gray-200"
      >
        <div className="flex justify-evenly items-center">
          <span className="w-[49px] h-[14px]">{selectedItem}</span>
          <span className="w-5 h-5">{adminDropdown ? <ArrowDropUp /> : <ArrowDropDown />}</span>
        </div>
      </button>

      {adminDropdown && (
        <div className="absolute flex flex-col w-[89px] h-[115px] rounded-[5px] bg-white-100 shadow-lg z-10">
          {dropdown.map((item, index) => (
            <button
              key={index}
              onClick={() => {
                onSelect(item);
                setAdminDropdown(false);
              }}
              className="w-full h-[35px] hover:bg-gray-200 bg-white-100"
            >
              {item}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

export default Dropdown;
