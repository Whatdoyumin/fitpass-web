import { useNavigate } from "react-router-dom";
import { JSX, useState, useEffect } from "react";

import MyCoin from "../MyPage/MyCoin";
import MyProfile from "../MyPage/MyProfile";
import SectionComponent from "../MyPage/SectionComponent";

import IcFillDollar from "../../assets/svg/IcFillDollar";
import IcNotice from "../../assets/svg/IcNotice";
import IcMyLogout from "../../assets/svg/IcMyLogout";
import IcUser from "../../assets/svg/IcUser";

import LogoutModal from "../MyPage/LogoutModal";
import IcPayList from "../../assets/svg/IcPayList";

import { useGetProfile } from "../../apis/mypage/quries/useProfileApi";
import { LoadingSpinner } from "../../components/LoadingSpinner";
import NotFound from "../NotFound";

import { useUpdateProfile, useDeleteProfile } from "../../apis/mypage/quries/useProfileApi"; // 훅 임포트
import { useAuth } from "../../context/AuthContext";

interface MyPageItem {
  id: number;
  icon: (props: React.SVGProps<SVGSVGElement>) => JSX.Element;
  name: string;
  path: string;
  onClick?: () => void;
}

const paymentItems: MyPageItem[] = [
  { id: 1, icon: IcFillDollar, name: "코인 구매하기", path: "/buy-coins" },
  { id: 2, icon: IcPayList, name: "구매 내역", path: "/my/pay-history" },
];

const MyPage = () => {
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { logout } = useAuth();

  useEffect(() => {
    const authToken = sessionStorage.getItem("accessToken");
    if (!authToken) {
      navigate("/signin");
    }
  }, [navigate]);

  const { data: profile, isLoading, isError } = useGetProfile();
  const { mutate: updateProfileMutation } = useUpdateProfile();
  const { mutate: deleteProfileMutation } = useDeleteProfile();

  if (isLoading) {
    return <LoadingSpinner />;
  }

  if (isError) {
    navigate("/");
    return <NotFound />;
  }

  const openLogoutModal = () => setIsModalOpen(true);
  const closeLogoutModal = () => setIsModalOpen(false);

  const handleLogoutAndNavigate = () => {
    logout();
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

  if (!profile) return null;

  return (
    <div className="w-full min-h-[calc(100vh-165px)] bg-white-200 overflow-y-auto">
      {profile && (
        <MyProfile
          profile={profile}
          updateProfileMutation={updateProfileMutation} // 훅을 props로 전달
          deleteProfileMutation={deleteProfileMutation} // 훅을 props로 전달
        />
      )}
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
