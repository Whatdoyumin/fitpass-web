import MyCoin from "../components/MyPage/MyCoin";
import MyProfile from "../components/MyPage/MyProfile";
import SectionComponent from "../components/MyPage/SectionComponent";

const paymentItems = [
  { icon: "/src/assets/images/pass.svg", name: "구독하기", path: "/subscribe" },
  { icon: "/src/assets/images/fitness.svg", name: "코인 구매하기", path: "/buy-coins" },
];

const settingsItems = [
  { icon: "/src/assets/images/search_gray.svg", name: "공지사항", path: "/notices" },
  { icon: "/src/assets/images/my.svg", name: "개인정보 수정", path: "/my/edit-profile" },
  { icon: "/src/assets/images/profile.svg", name: "로그아웃", path: "/logout" },
];

const MyPage = () => {
  return (
    <div className="w-full p-0">
      <MyProfile />
      <MyCoin />
      <SectionComponent title="결제" items={paymentItems} />

      <SectionComponent title="고객센터 및 설정" items={settingsItems} />
    </div>
  );
};

export default MyPage;
