import { JSX, useEffect, useState } from "react";
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
import IcPayList from "../../assets/svg/IcPayList";

import { useGetProfile } from "../../apis/mypage/quries/useProfileApi";

const handleLogout = () => {
  sessionStorage.removeItem("accessToken");
  sessionStorage.removeItem("refreshToken");

  sessionStorage.clear();
};

interface MyPageItem {
  id: number;
  icon: (props: React.SVGProps<SVGSVGElement>) => JSX.Element;
  name: string;
  path: string;
  onClick?: () => void;
}

const paymentItems: MyPageItem[] = [
  { id: 1, icon: IcSubscribe, name: "구독하기", path: "/subscribe" },
  { id: 2, icon: IcFillDollar, name: "코인 구매하기", path: "/buy-coins" },
  { id: 3, icon: IcPayList, name: "구매 내역", path: "#" },
];

const MyPage = () => {
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const authToken = sessionStorage.getItem("accessToken");
    if (!authToken) {
      navigate("/signin");
    }
  }, [navigate]);

  const { data: profile, isLoading, isError } = useGetProfile();

  // 로딩 또는 에러 처리
  if (isLoading) {
    return <div>로딩 중...</div>;
  }

  if (isError) {
    return <div>프로필 정보를 가져오는 데 실패했습니다.</div>;
  }

  const openLogoutModal = () => setIsModalOpen(true);
  const closeLogoutModal = () => setIsModalOpen(false);

  const handleLogoutAndNavigate = () => {
    handleLogout();
    navigate("/");
  };

  const settingsItems: MyPageItem[] = [
    { id: 1, icon: IcNotice, name: "공지사항", path: "/my/notices" },
    { id: 2, icon: IcUser, name: "개인정보 수정", path: "/my/edit-profile" },
    {
      id: 3,
      icon: IcMyLogout,
      name: "로그아웃",
      path: "#",
      onClick: openLogoutModal,
    },
  ];

  return (
    <div className="w-full min-h-[893px] bg-white-200">
      {profile && <MyProfile profile={profile} />}
      {profile && <MyCoin profile={profile} />}
      <SectionComponent title="결제" items={paymentItems} />
      <SectionComponent title="고객센터 및 설정" items={settingsItems} />

      <LogoutModal
        isOpen={isModalOpen}
        onClose={closeLogoutModal}
        onLogout={handleLogoutAndNavigate}
      />
    </div>
  );
};

export default MyPage;
