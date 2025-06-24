import {
  IcAdminDashboard,
  IcAdminFitness,
  IcAdminNotice,
  IcAdminPay,
  IcAdminSetting,
  IcAdminUser,
} from "../assets/svg";

export const ADMIN_NAV_MENU = [
  {
    id: 1,
    icon: null,
    name: "접속 아이디",
    path: null,
    children: null,
  },
  {
    id: 2,
    icon: <IcAdminDashboard width={"24px"} />,
    name: "대시보드",
    path: "/admin",
    children: null,
  },
  {
    id: 3,
    icon: <IcAdminUser width={"24px"} />,
    name: "사용자",
    path: null,
    children: [
      {
        id: 1,
        name: "회원 정보",
        path: "user",
      },
      {
        id: 2,
        name: "시설 회원 정보",
        path: "fitnessUser",
      },
      {
        id: 3,
        name: "시설 승인 요청",
        path: "fitnessRequest",
      },
    ],
  },
  {
    id: 4,
    icon: <IcAdminFitness width={"24px"} />,
    name: "피트니스 센터",
    path: null,
    children: [
      {
        id: 1,
        name: "시설 목록",
        path: "fitness/list",
      },
      {
        id: 2,
        name: "시설 등록",
        path: "fitness/upload",
      },
      {
        id: 3,
        name: "시설 리뷰 관리",
        path: "fitness/review",
      },
    ],
  },
  {
    id: 5,
    icon: <IcAdminPay width={"24px"} />,
    name: "결제",
    path: null,
    children: [
      {
        id: 1,
        name: "코인 상품 관리",
        path: "pay/coin",
      },
      {
        id: 2,
        name: "구매 내역",
        path: "pay",
      },
    ],
  },
  {
    id: 6,
    icon: <IcAdminNotice width={"24px"} />,
    name: "공지사항",
    path: "notice",
    children: null,
  },
  {
    id: 7,
    icon: <IcAdminSetting width={"24px"} />,
    name: "설정",
    path: "settings",
    children: null,
  },
];
