import { createBrowserRouter } from "react-router-dom";
import RootLayout from "../layout/RootLayout";
import {
  BuyCoins,
  ChangePassword,
  EditProfile,
  ExploreFitness,
  FindId,
  FindPassword,
  FitnessDetails,
  Home,
  MyPage,
  PurchasePass,
  SearchFitness,
  SetLocation,
  Subscribe,
  UploadReview,
  UsePass,
  Signin,
  Signup,
  SignupStep2,
  ChangePhone,
  Payment,
  Notice,
  PassPaymentSuccess,
  LocationDetail,
  SearchLocation,
  PayHistory,
  AdminDashboard,
  AdminUser,
  AdminFitnessList,
  AdminFitnessUpload,
  AdminSubscribe,
  AdminCoin,
  AdminPayHistory,
  AdminNotice,
  AdminSettings,
  AdminNoticeUpload,
  AdminSignin,
} from "../pages/index";
import NotFound from "../pages/NotFound";
import NoticeDetail from "../pages/Notice/NoticeDetail";
import AdminRootLayout from "../layout/AdminRootLayout";
import AuthHandler from "../components/AuthHandler";
import ScrollToTop from "../components/ScrollToTop";
import UpdateReview from "../pages/UpdateReview";

const Router = createBrowserRouter([
  {
    path: "/",
    element: (
      <>
      <ScrollToTop />
        <AuthHandler /> {/* ✅ 소셜 로그인 후 자동 실행 */}
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
        path: "/signup/step2",
        element: (
          <>
            <AuthHandler /> {/* ✅ 소셜 로그인 후 자동 실행 */}
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
        path: "/subscribe",
        element: <Subscribe />,
      },
      {
        path: "/subscribe/payment",
        element: <Payment type="subscribe" />,
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
    ],
  },
  {
    path: "/admin",
    element: <AdminRootLayout />,
    errorElement: <NotFound />,
    children: [
      {
        index: true,
        element: <AdminDashboard />,
      },
      {
        path: "signin",
        element: <AdminSignin />,
      },
      {
        path: "user",
        element: <AdminUser />,
      },
      {
        path: "fitness/list",
        element: <AdminFitnessList />,
      },
      {
        path: "fitness/upload",
        element: <AdminFitnessUpload />,
      },
      {
        path: "fitness/upload/:id",
        element: <AdminFitnessUpload />,
      },
      {
        path: "pay",
        element: <AdminPayHistory />,
      },
      {
        path: "pay/subscribe",
        element: <AdminSubscribe />,
      },
      {
        path: "pay/coin",
        element: <AdminCoin />,
      },
      {
        path: "notice",
        element: <AdminNotice />,
      },
      {
        path: "notice/upload",
        element: <AdminNoticeUpload />,
      },
      {
        path: "settings",
        element: <AdminSettings />,
      },
    ],
  },
]);

export default Router;
