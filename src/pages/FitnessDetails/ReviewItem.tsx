import { useState } from "react";
import ImgUser from "../../assets/img/ImgUser.png";
import { BorderStar, FillStar } from "../../assets/svg";
import ReviewEditDelete from "./ReviewEditDelete";
import { useNavigate, useParams } from "react-router-dom";
import Modal from "../../components/Modal";
import config from "../../apis/config";
import { useMutation } from "@tanstack/react-query";
import { axiosInstance } from "../../apis/axios-instance";
import { TReview } from "../../types/review";

interface ReviewProps {
  review: TReview;
  refetch: () => void;
}

function ReviewItem({ review, refetch }: ReviewProps) {
  const [isOpen, setIsOpen] = useState(false); // 수정삭제 버튼

  const navigate = useNavigate();

  const { id: fitnessId } = useParams();

  // 수정 삭제 모달 열기
  const handleEditDelete = () => {
    setIsOpen(!isOpen);
  };

  // 수정 삭제 모달 닫기
  const closeModal = () => {
    setIsOpen(false);
  };

  // 리뷰 수정 시 리뷰 작성 페이지로 이동
  const handleEdit = () => {
    navigate(`/update-review/${review.id}`, {
      state: {
        fitnessId,
        score: review.score,
        content: review.content,
      },
    });
  };

  // 삭제하기 버튼 클릭 시 삭제 모달 오픈
  const [openDeleteModal, setOpenDeleteModal] = useState(false);

  // 삭제 모달 열기
  const handleDelete = () => {
    setOpenDeleteModal(!openDeleteModal);
  };

  // 삭제 모달 닫기
  const closeDeleteModal = () => {
    setOpenDeleteModal(false);
  };

  const mutation = useMutation({
    mutationFn: async () => {
      const response = await axiosInstance.delete(
        `${config.apiBaseUrl}/fitness/review/${review.id}`
      );
      return response.data;
    },
    onSuccess: () => {
      setOpenDeleteModal(false);
      refetch();
    },
    onError: (error) => {
      console.log("삭제 실패", error);
    },
  });

  // 삭제 성공
  const handleDeleteSuccess = () => {
    console.log("리뷰가 삭제 됨");
    mutation.mutate();
  };

  // 날짜, 시간 변환 함수
  const myDate = (dateString: string): string => {
    const date = new Date(dateString);

    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();
    const hours = date.getHours();
    const minutes = date.getMinutes();

    return `${year}.${month.toString().padStart(2, "0")}.${day.toString().padStart(2, "0")}. ${hours
      .toString()
      .padStart(2, "0")}:${minutes.toString().padStart(2, "0")}`;
  };

  return (
    <div className="w-[300px] h-[77px] flex flex-col gap-[12px] mt-[5px] ">
      {/* 프로필사진, 별점, 내 리뷰일 때 수정삭제 가능한 더보기 버튼 */}
      <div className="flex h-[27px] items-center justify-between">
        <div className="flex items-center">
          <img src={ImgUser} alt="프로필 이미지" width="27px" height="27px" />
          <div className="flex items-center gap-[5px] w-[131px] h-[17px] ml-[15px] ">
            {Array.from({ length: 5 }, (_, index) =>
              index < review.score ? (
                <FillStar width="17px" key={index} />
              ) : (
                <BorderStar width="17px" key={index} />
              )
            )}
            <span className="font-medium text-[14px] text-blue-500 ml-[5px]">{review.score}</span>
          </div>
        </div>
        {/* 더보기 버튼 */}
        {review.isOwner && (
          <div onClick={handleEditDelete} className="relative flex justify-center ">
            <button className="w-[24px] h-[24px]">
              <div className="flex flex-col gap-[3px] items-center">
                <div className="rounded-full w-[3px] h-[3px] bg-gray-350"></div>
                <div className="rounded-full w-[3px] h-[3px] bg-gray-350 "></div>
                <div className="rounded-full w-[3px] h-[3px] bg-gray-350 "></div>
              </div>
            </button>
            {isOpen && (
              <div className="absolute top-[30px] right-[10px] shadow-lg rounded-[5px]">
                <ReviewEditDelete
                  onEdit={handleEdit}
                  onDelete={handleDelete}
                  closeModal={closeModal}
                />
              </div>
            )}
          </div>
        )}
      </div>
      <p className="font-medium text-[12px]">{review.content}</p>
      <p className="text-[10px] text-gray-600">
        {review.updatedAt ? myDate(review.updatedAt) : myDate(review.createdAt)}
      </p>

      {/* 수정, 삭제 모달 */}
      {openDeleteModal && (
        <Modal
          isOpen={openDeleteModal}
          onClose={closeDeleteModal}
          onSuccess={handleDeleteSuccess}
          title="리뷰를 삭제 하시겠습니까?"
          subTitle="리뷰 삭제 후 복구는 어렵습니다"
          btn1Text="아니요"
          btn2Text="네, 삭제하겠습니다"
        />
      )}
    </div>
  );
}

export default ReviewItem;
