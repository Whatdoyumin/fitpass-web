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
  Signup,
  Subscribe,
  UploadReview,
  UsePass,
  ChangePhone,
  Payment,
} from "../pages/index";
import Signin from "../pages/Signin";
import NotFound from "../pages/NotFound";

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
    ],
  },
]);

export default Router;
