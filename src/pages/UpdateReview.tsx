import { useState } from "react";
import {
  FillStar,
  IcEmptyStar,
  IcLocation,
  IcMiniBlueCoin,
  IcRightArrowDarkgray,
} from "../assets/svg";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useGetReviewFitness } from "../apis/uploadReview/quries/useReviewApi";
import { LoadingSpinner } from "../components/LoadingSpinner";
import NotFound from "./NotFound";
import { usePatchUpdateReview } from "../apis/UpdateReview/quries/useUpdateReviewApi";

export default function UpdateReview() {
  const location = useLocation();

  const { fitnessId, score, content } = location.state || {};

  const [reviewText, setReviewText] = useState(content); // 리뷰 텍스트 상태
  const [charCount, setCharCount] = useState(content ? content.length : 0); // 글자 수
  const [rating, setRating] = useState(score); // 평점 상태
  const [isModalOpen, setIsModalOpen] = useState(false); // 모달 상태
  const [isAgreed, setIsAgreed] = useState(true); // 정책 동의 체크박스 상태

  const navigate = useNavigate();

  const { data, error, isLoading } = useGetReviewFitness(fitnessId);
  const { id: reviewId } = useParams<{ id: string }>();

  // 리뷰 작성 API
  const patchUpdateReviewMutation = usePatchUpdateReview();

  if (isLoading) return <LoadingSpinner />;
  if (error) return <NotFound />;

  const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const text = e.target.value;
    if (text.length <= 250) {
      setReviewText(text);
      setCharCount(text.length);
    }
  };

  const handleStarClick = (index: number) => {
    setRating(index + 1);
  };

  const handleSubmitReview = () => {
    if (rating < 0) {
      alert("별점을 선택해주세요!");
      return;
    }
    if (charCount < 10) {
      alert("리뷰를 최소 10자 이상 작성해주세요!");
      return;
    }
    if (!isAgreed) {
      alert("리뷰 등록 정책에 동의해주세요!");
      return;
    }

    patchUpdateReviewMutation.mutate(
      {
        reviewId: Number(reviewId),
        content: reviewText,
        score: rating,
      },
      {
        onSuccess: () => {
          setIsModalOpen(true);
        },
        onError: (error) => {
          alert(`리뷰 수정 실패: ${error.message}`);
        },
      }
    );
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    navigate(`/fitness/${fitnessId}`);
  };

  const handleCheckboxChange = () => {
    setIsAgreed(!isAgreed);
  };

  return (
    <div className="h-[calc(100vh-165px)]">
      <div className="h-full bg-gray-200">
        <div className="flex justify-center bg-gray-200 pt-[21px] pb-[109px] px-[25px]">
          <div className="w-[100%] bg-white-100 rounded-t-[7px] overflow-hidden relative">
            {/* 이미지 영역 */}
            <div className="relative">
              <div
                className="w-full h-[191px] bg-cover bg-center relative"
                style={{
                  background: `linear-gradient(0deg, rgba(0, 0, 0, 0.35) 0%, rgba(0, 0, 0, 0.35) 100%), url(${data?.imageUrl}) center/cover no-repeat`,
                }}
              ></div>

              {/* 오른쪽 상단 코인 */}
              <div className="absolute top-0 right-0 flex flex-col items-center text-white-100">
                <IcMiniBlueCoin width={70} />
                <span className="text-[10px] font-bold absolute top-[6.5px] right-[10px]">
                  {data?.fee}코인
                </span>
              </div>

              {/* 이미지 위 텍스트 */}
              <div className="flex flex-col absolute bottom-4 left-4 text-white-100 gap-[12px]">
                <h2 className="text-[22px] font-bold">{data?.fitnessName}</h2>
                <div className="text-[11px] flex gap-[8px]">
                  <IcLocation width={8} />
                  {data?.address}
                </div>
              </div>
            </div>
            {/* 평점 */}
            <div className="px-[20px] py-[23px] flex flex-col gap-[11px]">
              <p className="text-[15px] font-bold">평점을 선택해주세요</p>
              <div className="flex items-center gap-[22px] text-blue-500 text-[22px] font-bold">
                <div className="flex items-center gap-[7px]">
                  {[...Array(5)].map((_, index) => (
                    <div
                      key={index}
                      className="cursor-pointer"
                      onClick={() => handleStarClick(index)}
                    >
                      {index < rating ? <FillStar width={24} /> : <IcEmptyStar width={24} />}
                    </div>
                  ))}
                </div>
                <span className="text-black text-lg">{rating}</span>
              </div>
            </div>

            <div className="w-full h-[4px] bg-[#f6f6f6]"></div>

            {/* 리뷰 작성 */}
            <div className="px-[20px] mt-[21px] flex flex-col gap-[11px]">
              <p className="text-[15px] font-bold">리뷰를 작성해주세요</p>
              <textarea
                className={`w-full h-[139px] p-[10px_15px] border border-gray-300 rounded-[10px] bg-[#F6F6F6] resize-none text-[14px] focus:outline-none`}
                placeholder="최소 10자 이상 입력해주세요"
                value={reviewText}
                onChange={handleTextChange}
              />
              <p className="text-right text-gray-400 text-xs">({charCount}/250)</p>
            </div>

            {/* 체크박스 */}
            <div className="px-4 flex mt-[14px] gap-[10px]">
              <div className="flex items-center gap-[12px]">
                <input
                  type="checkbox"
                  id="agree"
                  className="border-gray-500 w-[12px] h-[12px]"
                  checked={isAgreed}
                  onChange={handleCheckboxChange}
                />
                <label htmlFor="agree" className="text-[12px] text-gray-500 flex items-center">
                  리뷰 등록 정책 동의
                </label>
              </div>
              <IcRightArrowDarkgray width={4} className="flex items-center" />
            </div>

            <div className="pt-[22px] pb-[32px] px-[20px]">
              <button
                className="w-full bg-blue-500 text-white-100 py-[14px] rounded-[5px] text-[15px] font-bold"
                onClick={handleSubmitReview}
              >
                리뷰 수정하기
              </button>
            </div>

            {/* 둥근 모서리 추가 */}
            <div className="absolute bottom-[-20px] left-[-20px] w-[40px] h-[40px] bg-gray-200 rounded-full"></div>
            <div className="absolute bottom-[-20px] right-[-20px] w-[40px] h-[40px] bg-gray-200 rounded-full"></div>
          </div>

          {/* 모달 */}
          {isModalOpen && (
            <div className="fixed inset-0 bg-black-700 bg-opacity-50 flex justify-center items-center z-50 px-[45px]">
              <div className="flex flex-col bg-white-100 pt-[35px] pb-[15px] px-[15px] rounded-[10px] max-w-[350px] w-full gap-[25px]">
                <div className="flex flex-col gap-[10px]">
                  <p className="text-center text-[18px] font-bold">리뷰가 수정되었습니다</p>
                  <p className="text-center text-[12px] text-gray-500">리뷰 등록 감사합니다.</p>
                </div>
                <button
                  className="w-full bg-blue-500 text-white-100 text-[14px] py-[10px] rounded-[5px]"
                  onClick={handleCloseModal}
                >
                  확인
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
