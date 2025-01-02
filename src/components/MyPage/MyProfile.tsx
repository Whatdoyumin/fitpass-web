import { useState } from "react";
import ProfileModal from "./ProfileModal";
import ProfileIcon from "../../assets/svg/Profile";
import CameraIcon from "../../assets/svg/Camera";

const MyProfile = () => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [profileImage, setProfileImage] = useState<string>("");

  const handleCameraClick = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleImageUpload = (image: string) => {
    setProfileImage(image);
  };

  return (
    <div className="w-full h-[127px] px-[5px] flex justify-between items-center bg-white-100 box-border mx-auto">
      <span className="text-22px font-bold">000 님</span>
      <div className="relative w-[75px] h-[75px]">
        {profileImage ? (
          <img
            src={profileImage}
            alt="Profile"
            className="w-full h-full rounded-full object-cover"
          />
        ) : (
          <ProfileIcon className="w-full h-full rounded-full object-cover" />
        )}
        <button
          onClick={handleCameraClick}
          className="absolute bottom-0 right-0 w-[19px] h-[19px]"
        >
          <CameraIcon className="w-full h-full" />
        </button>
      </div>

      {isModalOpen && (
        <ProfileModal
          onClose={handleCloseModal}
          onImageUpload={handleImageUpload}
          currentImage={profileImage}
        />
      )}
    </div>
  );
};

export default MyProfile;
