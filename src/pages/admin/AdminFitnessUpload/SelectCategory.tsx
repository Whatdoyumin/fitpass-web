import { useState } from "react";

type CategoryProps = {
  category: string[];
  onCategoryChange: (category: string[]) => void;
}

function SelectCategory({ category, onCategoryChange }: CategoryProps) {
  const [selectedCategory, setSelectedCategory] = useState<string[]>([]);

  const handleCategoryClick = (category: string) => {
    let updatedCategory;

    if (selectedCategory.includes(category)) {
      updatedCategory = selectedCategory.filter((item) => item !== category);
    } else {
      updatedCategory = [...selectedCategory, category];
    }
    setSelectedCategory(updatedCategory);
    onCategoryChange(updatedCategory);
    // console.log(updatedCategory);
  }

  return(
    <div className="w-[300px] h-[50px] flex flex-col">
      <p>카테고리</p>
      <div className="w-full flex gap-[6px]">
        {category.map((item, index) => (
          <button
            type="button"
            onClick={() => handleCategoryClick(item)}
            key={index}
            className={`w-[70px] h-[30px] border rounded-[20px] text-[13px] font-medium
              ${selectedCategory.includes(item) ? 'bg-blue-100 border-blue-400' : 'bg-white-200 border-gray-300'}`}
          >{item}</button>
        ))}
      </div>
    </div>
  );
}

export default SelectCategory;