
import { useState } from "react";

type CategoryProps = {
  category: string[];
  onCategoryChange: (category: string) => void;
}

function CategorySlide({ category, onCategoryChange }: CategoryProps) {

  const [selectedCategory, setSelectedCategory] = useState<string>("헬스");

  const handleClick = (category: string) => {
    setSelectedCategory(category);
    onCategoryChange(category);
  };

  return(
    <div className="flex gap-x-[7px] mb-4">
        {category.map((item, index) => (
          <button className={`border rounded-3xl px-[15px] py-[5px] text-[13px] font-medium
            ${selectedCategory === item ? "bg-blue-100 border-blue-400" : "border-gray-300"}`} 
            key={index} onClick={() => handleClick(item)}>{item}</button>
        ))}
    </div>
  );
}

export default CategorySlide;