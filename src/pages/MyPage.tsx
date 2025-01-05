import MyCoin from "../components/MyPage/MyCoin";
import MyProfile from "../components/MyPage/MyProfile";
import SectionComponent from "../components/MyPage/SectionComponent";

// 이미지 파일 import
import PassIcon from "../assets/svg/Pass";
import IcFillDollar from "../assets/svg/IcFillDollar";
import IcNotice from "../assets/svg/IcNotice";
import MyIcon from "../assets/svg/My";
import IcMyLogout from "../assets/svg/IcMyLogout";

interface PaymentItem {
  icon: (props: React.SVGProps<SVGSVGElement>) => JSX.Element; 
  name: string;
  path: string;
}

// 수정된 데이터
const paymentItems: PaymentItem[] = [
  { icon: PassIcon, name: "구독하기", path: "/subscribe" },
  { icon: IcFillDollar, name: "코인 구매하기", path: "/buy-coins" },
];

const settingsItems: PaymentItem[] = [
  { icon: IcNotice, name: "공지사항", path: "/notices" },
  { icon: MyIcon, name: "개인정보 수정", path: "/my/edit-profile" },
  { icon: IcMyLogout, name: "로그아웃", path: "/logout" },
];

const MyPage = () => {
  return (
    <div className="w-full p-0 bg-gray-300">
      <MyProfile />
      <MyCoin coinAmount={123} />
      <SectionComponent title="결제" items={paymentItems} />
      <SectionComponent title="고객센터 및 설정" items={settingsItems} />
    </div>
  );
};

export default MyPage;
