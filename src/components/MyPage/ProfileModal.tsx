import { useState, useEffect } from "react";

const ProfileModal = ({
  onClose,
  onImageUpload,
}: {
  onClose: () => void;
  onImageUpload: (image: string) => void;
  currentImage: string;
}) => {
  const [isMobile, setIsMobile] = useState(false);
  const [content, setContent] = useState("default");

  useEffect(() => {
    setIsMobile(window.innerWidth <= 768); // 모바일에서만 되도록...?
  }, []);

  const handleOptionClick = (option: string) => {
    if (option === "basic") {
      setContent("updated");
      onImageUpload("/src/assets/images/profile.svg"); // 기본 프로필로 설정
    } else if (option === "album") {
      if (isMobile) {
        setContent("mobileUpload");
      } else {
        setContent("pcOnly");
      }
    }
  };

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      const reader = new FileReader();
      reader.onload = () => {
        if (typeof reader.result === "string") {
          onImageUpload(reader.result);
          setContent("updated");
        }
      };
      reader.readAsDataURL(event.target.files[0]);
    }
  };

  return (
    <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white-100 max-w-[90%] w-[300px] sm:w-[315px] rounded-lg p-3">
        {content === "default" ? (
          <div className="relative bg-white w-full rounded-lg">
            <button onClick={onClose} className="text-gray-500">
              &times;
            </button>

            {/* 모달 내용 - 중앙 정렬 */}
            <div className="flex flex-col items-center">
              <button
                onClick={() => handleOptionClick("basic")}
                className="w-full py-3 text-center text-gray-800 border-b border-gray-200 hover:bg-gray-100 text-16px"
              >
                기본 프로필 이용하기
              </button>
              <button
                onClick={() => handleOptionClick("album")}
                className="w-full py-3 text-center text-gray-800 hover:bg-gray-100 text-16px"
              >
                앨범에서 선택하기
              </button>
            </div>
          </div>
        ) : content === "pcOnly" ? (
          <div className="flex flex-col items-center space-y-5 mt-5">
            <p className="text-center text-gray-800 text-18px">
              모바일에서 설정 가능합니다.
            </p>
            <button
              onClick={onClose}
              className="w-[270px] h-[46px] bg-blue-500 text-white rounded-lg"
            >
              확인
            </button>
          </div>
        ) : content === "mobileUpload" ? (
          <div className="relative w-full">
            <button
              onClick={onClose}
              className="absolute left-2 text-gray-500 text-lg"
            >
              &times;
            </button>
            <p className="text-center text-gray-800 mb-4 text-18px">
              업로드할 사진을 골라주세요.
            </p>
            <input
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              className="block mx-auto mb-4"
            />
            <div className="mt-4">
              {/* 12개 사진을 그리드 형태로 3개씩 4줄로 표시 */}
              <div className="grid grid-cols-3">
                {Array.from({ length: 12 }).map((_, index) => (
                  <div
                    key={index}
                    className="w-full h-[60px] bg-gray-300 border border-black"
                  />
                ))}
              </div>
            </div>
          </div>

        ) : (
          <div className="flex flex-col items-center space-y-5 mt-5">
            <p className="text-center text-gray-800 text-18px">
              변경이 완료되었습니다.
            </p>
            <button
              onClick={onClose}
              className="w-[270px] h-[46px] bg-blue-500 text-white rounded-lg"
            >
              확인
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProfileModal;
