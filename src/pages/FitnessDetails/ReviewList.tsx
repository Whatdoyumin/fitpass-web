import { useState } from "react";
import ReviewItem from "./ReviewItem";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { axiosInstance } from "../../apis/axios-instance";
import { TReview } from "../../types/review";

type ReviewsResponse = {
  result: {
    reviews: TReview[];
    totalPages: number;
  };
}

type fetchReviewParams = {
  offset?: number;
  pageSize?: number;
  sortBy?: string;
}

function ReviewList() {

  const [sortOption, setSortOption] = useState<"score" | "date">("date");
  
  const [page, setPage] = useState(1);  // 현재 페이지
  const pageSize = 3;

  const { id } = useParams<{ id: string }>();

  const fetchReview = async (): Promise<ReviewsResponse> => {
    const params: fetchReviewParams = {
      offset: (page - 1) * pageSize,
      pageSize: pageSize,
      sortBy: sortOption,
    }
    const response = await axiosInstance.get(`/fitness/${id}/review`, {params});
    return response.data;
  }

  const { data, refetch } = useQuery<ReviewsResponse>({
    queryKey: ['reviews', id, sortOption, page],
    queryFn: fetchReview,
  })

  const handlePageChange = (newPage: number) => {
    if (newPage < 1 || newPage > (data?.result?.totalPages ?? 0)) return;
    setPage(newPage);
    if (newPage !== page) {
      refetch();
      console.log("페이지 넘어감")
    }
  }

  const sortReviews = (options: "score" | "date") => {
    setSortOption(options);
    setPage(1);
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
        {data?.result?.reviews.map((review) => (
          <ReviewItem key={review.id} review={review} refetch={refetch} />
        ))}
      </div>
      {/* pagination */}
      <div className="text-gray-350 w-[300px] h-[17px] gap-[12px] flex justify-center text-[14px] mt-[20px]">
        <button
          onClick={() => handlePageChange(page - 1)}
          disabled={page === 1}>{"<"}</button>
        {
          new Array(data?.result?.totalPages).fill(null).map((_, index) => {
            const pageNum = index + 1;
            return (
              <button
                key={pageNum}
                className={`${page === pageNum ? 'text-gray-600' : 'text-gray-350'}`}
                onClick={() => handlePageChange(pageNum)}
              >
                {pageNum}
              </button>
            )
          })
        }
      <button
        onClick={() => handlePageChange(page + 1)}
        disabled={page >= (data?.result?.totalPages ?? 0)}>{">"}</button>
      </div>
    </>
  );
}

export default ReviewList;