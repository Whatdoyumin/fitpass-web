import { useEffect, useState } from "react";

type CategoryProps = {
  category: string[];
  initialSelected: string[];
  onCategoryChange: (category: string[]) => void;
};

function SelectCategory({ category, initialSelected, onCategoryChange }: CategoryProps) {
  const [selectedCategory, setSelectedCategory] = useState<string[]>([]);

  useEffect(() => {
    setSelectedCategory(initialSelected);
  }, [initialSelected.join(",")]);

  const handleCategoryClick = (category: string) => {
    let updatedCategory;

    if (selectedCategory.includes(category)) {
      updatedCategory = selectedCategory.filter((item) => item !== category);
    } else {
      updatedCategory = [...selectedCategory, category];
    }

    setSelectedCategory(updatedCategory);
    onCategoryChange(updatedCategory);
  };

  return (
    <div className="w-full flex flex-col gap-4">
      <p>카테고리</p>
      <div className="w-full flex gap-[6px]">
        {category.map((item, index) => (
          <button
            type="button"
            onClick={() => handleCategoryClick(item)}
            key={index}
            className={`w-[70px] h-[30px] border rounded-[20px] text-[13px] font-medium
              ${
                selectedCategory.includes(item)
                  ? "bg-blue-100 border-blue-400"
                  : "bg-white-200 border-gray-300"
              }`}
          >
            {item}
          </button>
        ))}
      </div>
    </div>
  );
}

export default SelectCategory;
