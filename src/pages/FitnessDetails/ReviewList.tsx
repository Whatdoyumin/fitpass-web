import { useState } from "react";
import ReviewItem from "./ReviewItem";

function ReviewList() {

  // 임시 데이터
  const reviews = [
    { id: 1, score: 3, content: "리뷰 1", date: "2025-01-18" },
    { id: 2, score: 5, content: "리뷰 2", date: "2025-01-17" },
    { id: 3, score: 4, content: "리뷰 3", date: "2025-01-16" },
  ];

  // 정렬된 리뷰들
  const [sortedReviews, setSortedReviews] = useState([]);
  // 정렬 기준 (기본값: 날짜순)
  const [sortOption, setSortOption] = useState<"score" | "date">("date");

  // 별점 순 정렬

  return(
    <>
      <p className="text-base font-bold">이용 후기</p>
      {/* 정렬 방식 */}
      <div className="w-[74px] h-[14px] flex items-center my-[5px] ">
        <button className="font-medium text-[12px]">별점순</button>
        <div className="border-r border-black-700 h-[8px] mx-[3px] "></div>
        <button className="font-medium text-[12px]">최신순</button>
      </div>
      <div className="flex flex-col gap-[15px]">
        <ReviewItem />
      </div>
    </>
  );
}

export default ReviewList;