import { useState } from "react";

interface ToggleItem {
  label: string;
  onClick: () => void;
}

interface ToggleProps {
  items: ToggleItem[];
}

const Toggle = ({ items }: ToggleProps) => {
  const [selectedItem, setSelectedItem] = useState(items[0].label);

  const handleClick = (item: ToggleItem) => {
    setSelectedItem(item.label);
    item.onClick();
  };

  return (
    <div className="flex gap-2">
      {items.map((item) => (
        <button
          key={item.label}
          className={`flex items-center justify-center px-4 py-1 rounded-full border text-14px ${
            selectedItem === item.label
              ? "bg-blue-100 text-black border-blue-500"
              : "bg-white-200 text-black border-gray-300"
          }`}
          onClick={() => handleClick(item)}
        >
          {item.label}
        </button>
      ))}
    </div>
  );
};

export { Toggle };
