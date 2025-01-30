import { useState } from "react";
import ReviewItem from "./ReviewItem";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { axiosInstance } from "../../apis/axios-instance";
import config from "../../apis/config";

type fetchReviewParams = {
  offset?: number;
  pageSize?: number;
  sortBy?: string;
}

function ReviewList() {

  // 정렬된 리뷰들
  // const [sortedReviews, setSortedReviews] = useState(reviews);
  // 정렬 기준 (기본값: 날짜순)
  const [sortOption, setSortOption] = useState<"score" | "date">("date");

  const { id } = useParams();

  const fetchReview = async () => {
    const params: fetchReviewParams = {
      offset: 0,
      pageSize: 5,
      sortBy: sortOption,
    }
    // const response = await axios.get(`${config.apiBaseUrl}/fitness/${id}/review`, {params});
    const response = await axiosInstance.get(`/fitness/${id}/review`, {params});
    return response;
  }

  const { data } = useQuery({
    queryKey: ['reviews', id, sortOption],
    queryFn: fetchReview,
  })

  console.log(data?.data.result);

  const sortReviews = (options: "score" | "date") => {
    setSortOption(options);
    // // 별점 순 정렬
    // if (options === "score") {
    //   const sortedByScore = reviews.sort((a, b) => b.score - a.score);
    //   setSortedReviews(sortedByScore);
    // } else {
    //   const sortedByDate = reviews.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
    //   setSortedReviews(sortedByDate);
    // }
  };

  return(
    <>
      <p className="text-base font-bold">이용 후기</p>
      {/* 정렬 방식 */}
      <div className="w-[74px] h-[14px] flex items-center my-[5px] ">
        <button className={`font-medium text-[12px] ${sortOption === "score" ? "text-black-700" : "text-gray-350"}`}
          onClick={() => sortReviews("score")}>별점순</button>
        <div className="border-r border-black-700 h-[8px] mx-[3px] "></div>
        <button className={`font-medium text-[12px] ${sortOption === "date" ? "text-black-700" : "text-gray-350"}`}
          onClick={() => sortReviews("date")}>최신순</button>
      </div>
      <div className="flex flex-col gap-[15px]">
        {data?.data.result?.reviews.map((review) => (
          <ReviewItem key={review.id} review={review} />
        ))}
      </div>
    </>
  );
}

export default ReviewList;