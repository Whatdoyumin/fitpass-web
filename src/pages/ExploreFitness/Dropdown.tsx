import { useState } from "react";
import { ArrowDropDown, ArrowDropUp } from "../../assets/svg";

type DropdownProps = {
  dropdown: string[];
  onSortChange: (sort: string) => void;
}

function Dropdown({ dropdown, onSortChange }: DropdownProps) {

  const [selectedItem, setSelectedItem] = useState(dropdown[0]);
  const [showDropdown, setShowDropdown] = useState(false);

  const handleDropdownOpen = () => {
    setShowDropdown((prev) => !prev);
  }

  const handleDropClick = (item: string) => {
    setSelectedItem(item);
    setShowDropdown(false); // 드롭다운 닫기
    onSortChange(item);  // 선택값 전달
  }

  return(
    <div className="relative">
      <button className={`flex w-[75px] h-[30px] border p-[5px] pl-[10px] rounded-3xl ${showDropdown ? "bg-white-100" : "bg-gray-200"} border-gray-300 items-center space-x-2`} onClick={handleDropdownOpen}>
        <div className="flex w-full h-full justify-between">
        <span className="w-[35px] h-[19px] text-[13px]">{selectedItem}</span>
        {showDropdown ? <ArrowDropUp /> : <ArrowDropDown />}
        </div>
      </button>
      {showDropdown ? (
        <ul className="absolute w-[75px] h-[88px] rounded-md bg-white-100 flex flex-col items-center py-[5px]">
          {dropdown.map((item, index) => (
            <li className="w-[75px] h-[26px] px-[10px] py-[5px] rounded-md hover:bg-gray-200 w-full text-center flex items-center justify-center text-[13px]" key={index} value={item} onClick={() => handleDropClick(item)}>{item}</li>
          ))}
        </ul>
        ) : (null)}
    </div>
  );
}

export default Dropdown;