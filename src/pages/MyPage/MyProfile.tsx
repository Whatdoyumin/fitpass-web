import { useState } from "react";
import ProfileModal from "./ProfileModal";
import Profile from "../../assets/svg/Profile";
import Camera from "../../assets/svg/Camera";
import { IcMiniBlueTicket } from "../../assets/svg";

interface MyProfileProps {
  profile: {
    id: number;
    pictureUrl: string;
    name: string;
    planType: string | null; // planType null 가능
    coinQuantity: number;
  };
}

const MyProfile = ({ profile }: MyProfileProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [profileImage, setProfileImage] = useState<string>(profile.pictureUrl || "none");

  const handleCameraClick = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleImageUpload = (image: string) => {
    setProfileImage(image);
  };

  const getPlanText = (planType: string | null) => {
    switch (planType) {
      case "basic":
        return "Basic 요금제";
      case "Standard":
        return "Standard 요금제";
      case "Pro":
        return "Pro 요금제";
      default:
        return "이용 중인 요금제가 없습니다.";
    }
  };

  return (
    <div className="w-full h-[127px] px-[25px] flex justify-between items-center bg-white-100 box-border mx-auto">
      <div className="flex flex-col gap-[12px]">
        <span className="text-22px font-bold">{profile.name}</span>
        <div className="flex items-center gap-[9px]">
          <IcMiniBlueTicket width={20} />
          <p className="text-[14px] text-blue-500">{getPlanText(profile.planType)}</p>
        </div>
      </div>
      <div className="relative w-[75px] h-[75px]">
        {profileImage === "none" ? (
          <Profile className="w-full h-full rounded-full object-cover" />
        ) : (
          <img
            src={profileImage}
            alt="Profile"
            className="w-full h-full rounded-full object-cover"
          />
        )}
        <button onClick={handleCameraClick} className="absolute bottom-0 right-0 w-[19px] h-[19px]">
          <Camera className="w-full h-full" />
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
