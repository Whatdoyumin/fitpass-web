import { useState } from "react";
import CategorySlide from "./CategorySlide";
import Dropdown from "./Dropdown";
import FitnessCard from "../../components/FitnessCard";

// 피트니스 시설 살펴보기
function ExploreFitness() {

  const dropdown: string[] = ["거리순", "저가순", "고가순"];
  const category: string[] = ["헬스", "필라테스", "요가", "기타"];

  type Fitness = {
    name: string;
    address: string;
    distance: string;
  }

  const fitness: Fitness[] = [
    {
      name: "동국대 헬스장",
      address: "서울특별시 중구 필동로 1길 30",
      distance: "1.1km"
    },
    {
      name: "로아짐 수유역점",
      address: "서울 강북구 노해로8길 22 경남아너스빌 3층",
      distance: "1.1km"
    },
    {
      name: "On 필라테스 센터",
      address: "서울 강북구 한천로 1093 농협건물 2층 (수유동)",
      distance: "2.1km"
    },
    {
      name: "진짜 요가센터",
      address: "중구 퇴계로 59000길",
      distance: "2.6km"
    },
  ];

  const [selectedSort, setSelectedSort] = useState(dropdown[0]);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const handleCategoryChange = (category: string | null) => {
    setSelectedCategory(category);
  }

  return (
    <div className="bg-white-200 px-5 py-6 h-full">
      <div className="flex justify-between mb-3 mt-5 px-1">
        <span className="text-[25px] font-extrabold">피트니스 시설</span>
        <div className="relative z-10">
          <Dropdown dropdown={dropdown} onSortChange={setSelectedSort} />
        </div>
      </div>
      <CategorySlide category={category} onCategoryChange={handleCategoryChange} />
      <div className="flex flex-col items-center">
        <FitnessCard fitness={fitness} />
      </div>
    </div>
  );
}

export default ExploreFitness;
