import { useState, useEffect } from "react";
import IcCloseBtn from "../../assets/svg/IcCloseBtn";
import ImgUser from "../../assets/img/ImgUser.png";
import ProfileCommonModal from "./ProfileCommonModal";
import Profile from "../../assets/svg/Profile";
import Camera from "../../assets/svg/Camera";

interface MyProfileProps {
  profile: {
    id: number;
    pictureUrl: string;
    name: string;
    coinQuantity: number;
  };
  updateProfileMutation: (file: File) => void;
  deleteProfileMutation: () => void;
}

const MyProfile = ({ profile, updateProfileMutation, deleteProfileMutation }: MyProfileProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [profileImage, setProfileImage] = useState<string>(profile.pictureUrl || ImgUser);
  const [content, setContent] = useState("default");
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(
        "ontouchstart" in window || /iPhone|iPad|iPod|Android/i.test(navigator.userAgent)
      );
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
  }, []);

  const handleCameraClick = () => {
    setIsModalOpen(true);
    setContent("default");
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setContent("default");
  };

  const handleOptionClick = async (option: string) => {
    if (option === "basic") {
      try {
        setProfileImage(ImgUser); // 기본 이미지로 설정
        await deleteProfileMutation();
        setContent("updated");
      } catch (error) {
        console.error("기본 이미지 변경 실패", error);
      }
    } else if (option === "album") {
      setContent(isMobile ? "mobileUpload" : "pcOnly");
    }
  };

  const handleImageFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];

      updateProfileMutation(file);
      setProfileImage(URL.createObjectURL(file));
      setContent("updated");
    }
  };

  return (
    <div className="w-full h-[127px] px-[25px] flex justify-between items-center bg-white-100 box-border mx-auto">
      <div className="flex flex-col gap-[12px]">
        <span className="text-22px font-bold">{profile.name} 님</span>
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
        <div className="fixed inset-0 bg-gray-700 bg-opacity-60 flex items-center justify-center z-50">
          <div
            className={`bg-white-100 rounded-lg ${
              content === "default" ? "max-w-[315px]" : "max-w-[300px]"
            } w-full`}
          >
            {content === "default" ? (
              <div className="relative max-w-[315px] w-full bg-white rounded-lg pt-[20px] pr-[20px] pb-[20px] pl-[15px]">
                <button onClick={handleCloseModal} className="absolute top-[23px] left-[15px]">
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
                onButtonClick={handleCloseModal}
              />
            ) : content === "mobileUpload" ? (
              <div className="relative w-full pt-[20px]">
                <div className="px-[15px]">
                  <div className="flex items-center justify-center" style={{ lineHeight: "21px" }}>
                    <button
                      onClick={handleCloseModal}
                      className="absolute left-[15px] text-gray-500 text-18px"
                    >
                      <IcCloseBtn className="w-[12px] h-[12px]" />
                    </button>
                    <p className="text-gray-800 text-18px">업로드할 사진을 골라주세요.</p>
                  </div>
                  {isMobile && (
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageFileUpload}
                      className="block mt-2 mb-4 mx-auto w-full text-12px"
                    />
                  )}
                  {!isMobile && (
                    <p className="text-center text-gray-500">
                      모바일에서만 사진을 업로드할 수 있습니다.
                    </p>
                  )}
                </div>
              </div>
            ) : (
              <ProfileCommonModal
                message="변경이 완료되었습니다."
                buttonText="확인"
                onButtonClick={handleCloseModal}
              />
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default MyProfile;
