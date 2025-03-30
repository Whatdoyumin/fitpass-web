import { RouteObject } from "react-router-dom";
import ScrollToTop from "../components/ScrollToTop";
import RootLayout from "../layout/RootLayout";
import NotFound from "../pages/NotFound";
import {
  FacilitiesMain,
  FacilitiesRegisterStep1,
  FacilitiesRegisterStep2,
  FacilitiesRegisterStep3,
  OwnerDashboard,
  OwnerNoticeDetails,
  OwnerNotices,
  SettlementHistory,
  UsageHistory,
} from "../pages";

// 사장님(owner) 페이지 라우터
const ownerRoutes: RouteObject = {
  path: "/owner",
  element: (
    <>
      <ScrollToTop />
      <RootLayout />
    </>
  ),
  errorElement: <NotFound />,
  children: [
    {
      index: true,
      element: <OwnerDashboard />,
    },
    {
      path: "notices",
      element: <OwnerNotices />,
    },
    {
      path: "notices/:id",
      element: <OwnerNoticeDetails />,
    },
    {
      path: "settlement-history",
      element: <SettlementHistory />,
    },
    {
      path: "usage-history",
      element: <UsageHistory />,
    },
    {
      path: "facilities",
      element: <FacilitiesMain />,
    },
    {
      path: "register/step1",
      element: <FacilitiesRegisterStep1 />,
    },
    {
      path: "register/step2",
      element: <FacilitiesRegisterStep2 />,
    },
    {
      path: "register/step3",
      element: <FacilitiesRegisterStep3 />,
    },
  ],
};

export default ownerRoutes;
