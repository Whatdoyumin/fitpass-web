import { RouteObject } from "react-router-dom";
import ScrollToTop from "../components/ScrollToTop";
import AuthHandler from "../components/AuthHandler";
import RootLayout from "../layout/RootLayout";
import NotFound from "../pages/NotFound";
import {
  BuyCoins,
  ChangePassword,
  ChangePhone,
  EditProfile,
  ExploreFitness,
  FindId,
  FindPassword,
  FitnessDetails,
  Home,
  LocationDetail,
  LocationPolicyPage,
  MarketingPolicyPage,
  MyPage,
  Notice,
  PassPaymentSuccess,
  PayHistory,
  Payment,
  PrivacyPolicyPage,
  PurchasePass,
  RefundPolicyPage,
  SearchFitness,
  SearchLocation,
  SetLocation,
  Signin,
  Signup,
  SignupStep1,
  SignupStep2,
  TermsPage,
  ThirdPartyPolicyPolicyPage,
  UpdateReview,
  UploadReview,
  UsePass,
} from "../pages";
import NoticeDetail from "../pages/Notice/NoticeDetail";

const userRoutes: RouteObject = {
  path: "/",
  element: (
    <>
      <ScrollToTop />
      <AuthHandler /> {/* 소셜 로그인 후 자동 실행 */}
      <RootLayout />
    </>
  ),
  errorElement: <NotFound />,
  children: [
    {
      index: true,
      element: <Home />,
    },
    {
      path: "/signup",
      element: <Signup />,
    },
    {
      path: "/signup/step1",
      element: <SignupStep1 />,
    },
    {
      path: "/signup/step2",
      element: (
        <>
          <AuthHandler />
          <SignupStep2 />
        </>
      ),
    },
    {
      path: "/signin",
      element: <Signin />,
    },
    {
      path: "/find-id",
      element: <FindId />,
    },
    {
      path: "/find-password",
      element: <FindPassword />,
    },
    {
      path: "/set-location",
      element: <SetLocation />,
    },
    {
      path: "/search-location",
      element: <SearchLocation />,
    },
    {
      path: "/location-detail",
      element: <LocationDetail />,
    },
    {
      path: "/search-fitness",
      element: <SearchFitness />,
    },
    {
      path: "/fitness",
      element: <ExploreFitness />,
    },
    {
      path: "/fitness/:id",
      element: <FitnessDetails />,
    },
    {
      path: "/purchase-pass/:id",
      element: <PurchasePass />,
    },
    {
      path: "/purchase-pass/:id/done",
      element: <PassPaymentSuccess />,
    },
    {
      path: "/use-pass",
      element: <UsePass />,
    },
    {
      path: "/upload-review/:id",
      element: <UploadReview />,
    },
    {
      path: "/my",
      element: <MyPage />,
    },
    {
      path: "/my/edit-profile",
      element: <EditProfile />,
    },
    {
      path: "/my/change-password",
      element: <ChangePassword />,
    },
    {
      path: "/buy-coins",
      element: <BuyCoins />,
    },
    {
      path: "/buy-coins/payment",
      element: <Payment type="buy-coins" />,
    },
    {
      path: "/my/change-phone",
      element: <ChangePhone />,
    },
    {
      path: "/my/notices",
      element: <Notice />,
    },
    {
      path: "/my/notices/:id",
      element: <NoticeDetail />,
    },
    {
      path: "/my/pay-history",
      element: <PayHistory />,
    },
    {
      path: "/update-review/:id",
      element: <UpdateReview />,
    },
    // 이용 약관 페이지
    {
      path: "/terms",
      element: <TermsPage />,
    },
    // 개인정보 처리방침 페이지
    {
      path: "/privacy",
      element: <PrivacyPolicyPage />,
    },
    // 환불 정책 페이지
    {
      path: "refund-policy",
      element: <RefundPolicyPage />,
    },
    // 제3자 제공 동의 페이지
    {
      path: "/third-party",
      element: <ThirdPartyPolicyPolicyPage />,
    },
    // 위치 정보 이용 동의
    {
      path: "/location-policy",
      element: <LocationPolicyPage />,
    },
    // 마케팅 정보 제공 동의
    {
      path: "/marketing-policy",
      element: <MarketingPolicyPage />,
    },
  ],
};

export default userRoutes;
