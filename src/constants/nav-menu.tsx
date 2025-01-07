import {
  Fitness,
  FitnessFilled,
  Home,
  HomeFilled,
  My,
  MyFilled,
  Pass,
  PassFilled,
} from "../assets/svg";

export const PATH_NAMES = new Map<string, string>([
  ["/signup", "회원가입"],
  ["/signin", "로그인"],
  ["/find-id", "아이디 찾기"],
  ["/find-password", "비밀번호 찾기"],
  ["/purchase-pass/:id", "패스 구매하기"],
  ["/use-pass", "보유 패스"],
  ["/my/edit-profile", "개인정보 수정"],
  ["/my/change-password", "비밀번호 변경"],
  ["/subscribe", "요금제 안내"],
  ["/buy-coins", "코인 안내"],
]);

export const NAV_MENU = [
  {
    id: 1,
    img_empty: <Home className="h-8 px-1.5 py-[5px]" />,
    img: <HomeFilled className="h-8 px-1.5 py-[5px]" />,
    text: "홈",
    path: ["/", "/set-location", "/search-fitness"],
  },
  {
    id: 2,
    img_empty: <Fitness width={"20px"} className="w-8 py-[5px]" />,
    img: <FitnessFilled width={"20px"} className="w-8 py-[5px]" />,
    text: "피트니스 찾기",
    path: ["/fitness", "/purchase-pass"],
  },
  {
    id: 3,
    img_empty: <Pass width={"20px"} className="w-8 py-[5px]" />,
    img: <PassFilled width={"20px"} className="w-8 py-[5px]" />,
    text: "패스",
    path: ["/use-pass", "/upload-review"],
  },
  {
    id: 4,
    img_empty: <My className="h-8 px-1.5 py-[3px]" />,
    img: <MyFilled className="h-8 px-1.5 py-[3px]" />,
    text: "마이페이지",
    path: ["/my", "/subscribe", "/buy-coins"],
  },
];
