import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import DotVector from "../../../assets/img/Vector.png";
import Modal from "../../../components/Modal";
import { deleteAdminFitness, changeAdminFitnessStatus } from "../../../apis/adminFitness/adminFitnessData";

interface FitnessRowDropdownProps {
  fitnessId: number;
  onDataChange: () => void;
}

function FitnessRowDropdown({ fitnessId, onDataChange }: FitnessRowDropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const navigate = useNavigate();

  const handleDotClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsOpen(!isOpen);
  };

  const handleMenuClick = (action: string) => {
    setIsOpen(false);
    
    switch (action) {
      case "수정하기":
        navigate(`/admin/fitness/upload/${fitnessId}`);
        break;
      case "삭제하기":
        setIsDeleteModalOpen(true);
        break;
      case "구매 상태 변경":
        handleStatusChange();
        break;
      default:
        break;
    }
  };

  const handleStatusChange = async () => {
    try {
      await changeAdminFitnessStatus(fitnessId);
      onDataChange();
    } catch (error) {
      console.error("구매 상태 변경 실패:", error);
    }
  };

  const handleDeleteConfirm = async () => {
    try {
      await deleteAdminFitness(fitnessId);
      setIsDeleteModalOpen(false);
      onDataChange(); 
    } catch (error) {
      console.error("삭제 실패:", error);
      setIsDeleteModalOpen(false);
    }
  };

  const handleDeleteCancel = () => {
    setIsDeleteModalOpen(false);
  };
  
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (!target.closest(`[data-dropdown-id="${fitnessId}"]`)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener("click", handleClickOutside);
    }

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [isOpen, fitnessId]);

  return (
    <>
      <div className="relative" data-dropdown-id={fitnessId}>
        <img
          src={DotVector}
          alt="더보기"
          className="cursor-pointer"
          onClick={handleDotClick}
        />
        {isOpen && (
          <div className="absolute right-0 top-full mt-1 w-[100px] text-[12px] bg-white-100 border border-gray-300 rounded-[6px] shadow-lg z-50">
            <div className="flex flex-col">
              <button
                onClick={() => handleMenuClick("수정하기")}
                className="w-full h-[35px] hover:bg-gray-200 bg-white-100"
              >
                수정하기
              </button>
              <button
                onClick={() => handleMenuClick("삭제하기")}
                className="w-full h-[35px] hover:bg-gray-200 bg-white-100"
              >
                삭제하기
              </button>
              <button
                onClick={() => handleMenuClick("구매 상태 변경")}
                className="w-full h-[35px] hover:bg-gray-200 bg-white-100"
              >
                구매 상태 변경
              </button>
            </div>
          </div>
        )}
      </div>

      <Modal
        isOpen={isDeleteModalOpen}
        onClose={handleDeleteCancel}
        onSuccess={handleDeleteConfirm}
        title="삭제 후 복구 불가능합니다. 삭제하시겠습니까?"
        btn1Text="아니오"
        btn2Text="네"
        customWidth="380px"
      />
    </>
  );
}

export default FitnessRowDropdown; 