import { useState } from "react";
import ReviewItem from "./ReviewItem";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { axiosInstance } from "../../apis/axios-instance";
import { TReview } from "../../types/review";
import { Pagination } from "../../components/Pagination";
import { useAuth } from "../../context/AuthContext";

type ReviewsResponse = {
  result: {
    reviews: TReview[];
    totalPages: number;
  };
};

type fetchReviewParams = {
  offset?: number;
  pageSize?: number;
  sortBy?: string;
};

function ReviewList() {
  const [sortOption, setSortOption] = useState<"score" | "date">("date");

  const [page, setPage] = useState(0); // 현재 페이지
  const pageSize = 5;
  const { isLogin } = useAuth();
  const { id } = useParams<{ id: string }>();

  const fetchReview = async (): Promise<ReviewsResponse> => {
    const params: fetchReviewParams = {
      offset: page,
      pageSize: pageSize,
      sortBy: sortOption,
    };
    const response = await axiosInstance.get(`/fitness/${id}/review`, { params });
    return response.data;
  };

  const { data, refetch } = useQuery<ReviewsResponse>({
    queryKey: ["reviews", id, sortOption, page],
    queryFn: fetchReview,
  });

  const totalPages: number = data?.result?.totalPages ?? 0;

  const sortReviews = (options: "score" | "date") => {
    setSortOption(options);
    setPage(0);
  };

  return (
    <>
      <p className="text-base font-bold">이용 후기</p>
      <div>
        {isLogin ? (
          data?.result.totalPages === 0 ? (
            <div className="w-full flex justify-center items-center">
              <p className="font-medium text-gray-600">리뷰가 없습니다.</p>
            </div>
          ) : (
            <>
              {/* 정렬 방식 */}
              <div className="w-[74px] h-[14px] flex items-center my-[5px] ">
                <button
                  className={`font-medium text-[12px] ${
                    sortOption === "score" ? "text-black-700" : "text-gray-350"
                  }`}
                  onClick={() => sortReviews("score")}
                >
                  별점순
                </button>
                <div className="border-r border-black-700 h-[8px] mx-[3px] "></div>
                <button
                  className={`font-medium text-[12px] ${
                    sortOption === "date" ? "text-black-700" : "text-gray-350"
                  }`}
                  onClick={() => sortReviews("date")}
                >
                  최신순
                </button>
              </div>
              <div className="flex flex-col gap-[15px]">
                {data?.result?.reviews &&
                  data?.result?.reviews.map((review) => (
                    <ReviewItem key={review.id} review={review} refetch={refetch} />
                  ))}
              </div>
              {/* pagination */}
              <Pagination totalPages={totalPages} currentPage={page} onPageChange={setPage} />
            </>
          )
        ) : (
          <div className="w-full flex justify-center items-center">
            <p className="font-medium text-gray-600 pt-4">로그인 후 리뷰 확인이 가능합니다.</p>
          </div>
        )}
      </div>
    </>
  );
}

export default ReviewList;
