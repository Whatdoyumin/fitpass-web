import { useState } from "react";
import { ArrowDropDown, ArrowDropUp } from "../../../assets/svg";

function Dropdown({onSelect}: { onSelect: (item: string) => void }) {

  const [adminDropdown, setAdminDropdown] = useState(false);
  const [selectedItem, setSelectedItem] = useState("업체명");

  const dropdown: string[] = ["업체명", "이용 종목", "전화번호"];

  const showDropdown = () => {
    setAdminDropdown(!adminDropdown);
  }

  const handleDropdownClick = (item: string) => {
    setAdminDropdown(false);
    setSelectedItem(item);
    onSelect(item);
  }

  return(
    <div className="text-medium text-[12px]">
      <button
        onClick={showDropdown} 
        className="relative w-[89px] h-[48px] rounded-[6px] border border-gray-300 bg-gray-200">
      <div className="flex justify-evenly items-center">
        <span className="w-[49px] h-[14px]">{selectedItem}</span>
        <span className="w-5 h-5">{adminDropdown ? <ArrowDropUp /> : <ArrowDropDown />}</span>
      </div>
      </button>
      {adminDropdown ? (
        <div className="absolute flex flex-col w-[89px] h-[115px] rounded-[5px] justify-center bg-white-100 shadow-lg z-10">
          {dropdown.map((item, index) => (
            <button 
              key={index} 
              value={item}
              onClick={() => handleDropdownClick(item)}
              className='w-full h-[35px] rounded-[5px] hover:bg-gray-200 bg-white-100'
            >{item}</button>
          ))}
        </div>
      ) : (null)}
    </div>
  );
}

export default Dropdown;