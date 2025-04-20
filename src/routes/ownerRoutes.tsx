import { RouteObject } from "react-router-dom";
import ScrollToTop from "../components/ScrollToTop";
import RootLayout from "../layout/RootLayout";
import NotFound from "../pages/NotFound";
import {
  FacilitiesMain,
  FacilitiesRegister,
  OwnerDashboard,
  OwnerNoticeDetails,
  OwnerNotices,
  SettlementHistory,
  UsageHistory,
  OwnerSignupStep1,
  OwnerSignupStep2,
  OwnerSignupStep3,
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
      path: "facilities/:id",
    },
    {
      path: "register/step1",
      element: <FacilitiesRegister />,
    },
    {
      path: "register/step2",
      element: <FacilitiesRegister />,
    },
    {
      path: "register/step3",
      element: <FacilitiesRegister />,
    },
    {
      path: "signup/step1",
      element: <OwnerSignupStep1 />,
    },
    {
      path: "signup/step2",
      element: <OwnerSignupStep2 />,
    },
    {
      path: "signup/step3",
      element: <OwnerSignupStep3 />,
    },
  ],
};

export default ownerRoutes;
