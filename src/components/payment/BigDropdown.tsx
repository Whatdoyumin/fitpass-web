import { useState } from "react";
import { ArrowDropDown, ArrowDropUp } from "../../assets/svg";

interface IBigDropdownProps {
  options: string[];
  onOptionSelect: (selectedOption: string) => void;
}

const BigDropdown = ({ options, onOptionSelect }: IBigDropdownProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState<string>(options[0]);

  const toggleDropdown = () => {
    setIsOpen((prev) => !prev);
  };

  const handleOptionClick = (option: string) => {
    setSelectedOption(option);
    onOptionSelect(option);
    setIsOpen(false);
  };

  return (
    <div className="w-full bg-white-100 border border-gray-600 rounded-5">
      <div
        className="w-full h-[50px] flex justify-between items-center px-4 cursor-pointer"
        onClick={toggleDropdown}
      >
        <p className="text-14px text-gray-600">{selectedOption}</p>
        {isOpen ? (
          <ArrowDropUp width={"20px"} color="#6D6D6D" />
        ) : (
          <ArrowDropDown width={"20px"} color="#6D6D6D" />
        )}
      </div>

      {/* 옵션 목록 */}
      {isOpen && (
        <div className="w-full bg-white border-t border-gray-300">
          {options.map((option, index) => (
            <div
              key={index}
              className="w-full px-4 py-2 text-14px text-black-700 hover:bg-gray-200 cursor-pointer"
              onClick={() => handleOptionClick(option)}
            >
              {option}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default BigDropdown;
