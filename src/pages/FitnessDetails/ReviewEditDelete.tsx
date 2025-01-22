interface ReviewModalProps {
  onEdit: () => void;
  onDelete: () => void;
  closeModal: () => void;
}

function ReviewEditDelete({ onEdit, onDelete, closeModal }: ReviewModalProps) {
  return(
    <>
      <div className="w-[75px] h-[62px] flex flex-col items-center justify-around ">
        <p className="h-[26px] text-medium text-[13px] justify-center"
          onClick={() => {
            onEdit();
            closeModal();
          }}>수정</p>
        <p className="h-[26px] text-medium text-[13px] justify-center"
          onClick={() => {
            onDelete();
            closeModal();
          }}>삭제</p>
      </div>
    </>
  );
}

export default ReviewEditDelete;