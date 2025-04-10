interface ToggleProps {
    isOn: boolean;
    onToggle: () => void;
  }
  
  const Toggle = ({ isOn, onToggle }: ToggleProps) => {
    return (
      <div
        onClick={onToggle}
        className={`w-[48px] h-[24px] rounded-full cursor-pointer relative transition-colors duration-300
          ${isOn ? "bg-blue-400" : "bg-gray-350"}`}
      >
        <div
          className={`
            absolute top-[3px] left-0 w-[18px] h-[18px] rounded-full bg-white-100 transition-transform duration-300
            ${isOn ? "translate-x-[26px]" : "translate-x-[4px]"}
          `}
        />
      </div>
    );
  };
  
  
  export default Toggle;
  