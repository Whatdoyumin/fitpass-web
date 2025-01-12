
import { useState } from "react";

type CategoryProps = {
  category: string[];
  onCategoryChange: (category: string | null) => void;
}

function CategorySlide({ category, onCategoryChange }: CategoryProps) {

  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const handleClick = (category: string | null) => {
    const newCategory = selectedCategory === category ? null : category;
    setSelectedCategory(newCategory);
    onCategoryChange(newCategory);
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


// slider 사용

// import Slider, { Settings } from "react-slick";

// import "slick-carousel/slick/slick.css";
// import "slick-carousel/slick/slick-theme.css";

  // const settings: Settings = {
  //   dots: true,
  //   infinite: false,
  //   speed: 500,
  //   slidesToShow: 4,
  //   slidesToScroll: 1,
  //   arrows: false,  // 화살표 없애기
  // };
      {/* <Slider {...settings} className="inline-block">
        {category.map((item, index) => (
          <button className="border rounded-3xl border-gray-E6E6E6 w-fit" key={index}>{item}</button>
        ))}
      </Slider> */} 