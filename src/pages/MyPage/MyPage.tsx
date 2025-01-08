import { useState } from "react";
import { useNavigate } from "react-router-dom";

import MyCoin from "../MyPage/MyCoin";
import MyProfile from "../MyPage/MyProfile";
import SectionComponent from "../MyPage/SectionComponent";

import IcFillDollar from "../../assets/svg/IcFillDollar";
import IcNotice from "../../assets/svg/IcNotice";
import IcMyLogout from "../../assets/svg/IcMyLogout";
import IcSubscribe from "../../assets/svg/IcSubscribe";
import IcUser from "../../assets/svg/IcUser";

import LogoutModal from "../MyPage/LogoutModal";

// 로그아웃 처리 함수 (로컬 스토리지 초기화)
const handleLogout = () => {
  localStorage.removeItem("authToken"); // JWT 토큰 삭제
  localStorage.removeItem("userInfo"); // 사용자 정보 삭제
  sessionStorage.clear(); // 세션 스토리지 초기화
};

interface MyPageItem {
  icon: (props: React.SVGProps<SVGSVGElement>) => JSX.Element;
  name: string;
  path: string;
  onClick?: () => void;
}

const paymentItems: MyPageItem[] = [
  { icon: IcSubscribe, name: "구독하기", path: "/subscribe" },
  { icon: IcFillDollar, name: "코인 구매하기", path: "/buy-coins" },
];

const MyPage = () => {
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const openLogoutModal = () => {
    setIsModalOpen(true);
  };

  const closeLogoutModal = () => {
    setIsModalOpen(false);
  };

  const handleLogoutAndNavigate = () => {
    handleLogout();
    navigate("/");
  };

  const settingsItems: MyPageItem[] = [
    { icon: IcNotice, name: "공지사항", path: "/notices" },
    { icon: IcUser, name: "개인정보 수정", path: "/my/edit-profile" },
    {
      icon: IcMyLogout,
      name: "로그아웃",
      path: "#",
      onClick: openLogoutModal ,
    },
  ];

  return (
    <div className="w-full h-full p-0 bg-white-200 overflow-y-auto">
      <MyProfile />
      <MyCoin coinAmount={123} />
      <SectionComponent title="결제" items={paymentItems} />
      <SectionComponent title="고객센터 및 설정" items={settingsItems} />
      {/* 로그아웃 확인 모달 */}
      <LogoutModal
        isOpen={isModalOpen}
        onClose={closeLogoutModal}
        onLogout={handleLogoutAndNavigate}
      />
    </div>
  );
};

export default MyPage;
