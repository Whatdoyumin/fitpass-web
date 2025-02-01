import { useState, useEffect } from "react";
import IcCloseBtn from "../../assets/svg/IcCloseBtn";
import ImgUser from "../../assets/img/ImgUser.png";
import ProfileCommonModal from "./ProfileCommonModal";
import { useUpdateProfile, useDeleteProfile } from "../../apis/mypage/quries/useProfileApi"; // 훅 임포트

interface ProfileModalProps {
  onClose: () => void;
  onImageUpload: (image: string) => void;
  currentImage: string;
}

const ProfileModal = ({ onClose, onImageUpload }: ProfileModalProps) => {
  const [isMobile, setIsMobile] = useState(false);
  const [content, setContent] = useState("default");
  
  // Mutation 훅 사용
  const { mutate: updateProfileMutation } = useUpdateProfile();
  const { mutate: deleteProfileMutation } = useDeleteProfile();

  useEffect(() => {
    setIsMobile(window.innerWidth <= 768);
  }, []);

  const handleOptionClick = async (option: string) => {
    if (option === "basic") {
      try {
        onImageUpload(ImgUser);  // 기본 이미지로 설정
        await deleteProfileMutation();
        setContent("updated");
      } catch (error) {
        console.error("프로필 사진 삭제 실패", error);
      }
    } else if (option === "album") {
      setContent(isMobile ? "mobileUpload" : "pcOnly");
    }
  };

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];
  
      updateProfileMutation(file, {
        onSuccess: (data) => {
          const imageUrl = data;
          onImageUpload(imageUrl);
          setContent("updated");
        },
        onError: (error) => {
          console.error("프로필 이미지 업로드 실패", error);
        }
      });
    }
  };
  const handleClose = () => {
    onClose(); // 기존 onClose
    window.location.reload(); // 페이지 새로고침
  };
  return (
    <div className="fixed inset-0 bg-gray-700 bg-opacity-60 flex items-center justify-center z-50">
      <div
        className={`bg-white-100 rounded-lg ${content === "default" ? "max-w-[315px]" : "max-w-[300px]"} w-full`}
      >
        {content === "default" ? (
          <div className="relative max-w-[315px] w-full bg-white rounded-lg pt-[20px] pr-[20px] pb-[20px] pl-[15px]">
            <button onClick={onClose} className="absolute top-[23px] left-[15px]">
              <IcCloseBtn className="w-[12px] h-[12px]" />
            </button>
            <div className="flex flex-col items-center pt-[15px]">
              <button
                onClick={() => handleOptionClick("basic")}
                className="w-full py-[15px] text-center text-gray-800 border-b border-gray-200 text-16px"
                style={{ lineHeight: "19px" }}
              >
                기본 프로필 이용하기
              </button>
              <button
                onClick={() => handleOptionClick("album")}
                className="w-full pt-[15px] text-center text-gray-800 text-16px"
                style={{ lineHeight: "19px" }}
              >
                앨범에서 선택하기
              </button>
            </div>
          </div>
        ) : content === "pcOnly" ? (
          <ProfileCommonModal
            message="모바일에서 설정 가능합니다."
            buttonText="확인"
            onButtonClick={onClose}
          />
        ) : content === "mobileUpload" ? (
          <div className="relative w-full pt-[20px]">
            <div className="px-[15px]">
              <div className="flex items-center justify-center" style={{ lineHeight: "21px" }}>
                <button onClick={onClose} className="absolute left-[15px] text-gray-500 text-18px">
                  <IcCloseBtn className="w-[12px] h-[12px]" />
                </button>
                <p className="text-gray-800 text-18px">업로드할 사진을 골라주세요.</p>
              </div>
              {isMobile && (
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="block mt-2 mb-4 mx-auto w-full text-12px"
                />
              )}
              {!isMobile && (
                <p className="text-center text-gray-500">모바일에서만 사진을 업로드할 수 있습니다.</p>
              )}
            </div>
            <div className="mt-4 mb-[20px]">
              <div className="grid grid-cols-3">
                {Array.from({ length: 12 }).map((_, index) => (
                  <div key={index} className="w-full h-[98px] bg-gray-300 border border-black" />
                ))}
              </div>
            </div>
          </div>
        ) : (
          <ProfileCommonModal
            message="변경이 완료되었습니다."
            buttonText="확인"
            onButtonClick={handleClose}
          />
        )}
      </div>
    </div>
  );
};

export default ProfileModal;
