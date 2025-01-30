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
} from "../pages/index";
import NotFound from "../pages/NotFound";
import NoticeDetail from "../pages/Notice/NoticeDetail";

const Router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
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
        element: <SignupStep2 />,
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
        path: "/upload-review",
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
        path: "/my/noticedetail/:id",
        element: <NoticeDetail />,
      },
      {
        path: "/my/pay-history",
        element: <PayHistory />,
      },
    ],
  },
]);

export default Router;
