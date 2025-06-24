import { RouteObject } from "react-router-dom";
import AdminRootLayout from "../layout/AdminRootLayout";
import NotFound from "../pages/NotFound";
import {
  AdminCoin,
  AdminDashboard,
  AdminFitnessList,
  AdminFitnessUpload,
  AdminNotice,
  AdminNoticeUpload,
  AdminPayHistory,
  AdminSettings,
  AdminSignin,
  AdminUser,
  AdminFitnessUser,
  AdminFitnessRequest,
  AdminReview,
} from "../pages";

const adminRoutes: RouteObject = {
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
      path: "fitnessUser",
      element: <AdminFitnessUser />,
    },
    {
      path: "fitnessRequest",
      element: <AdminFitnessRequest />,
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
      path: "fitness/review",
      element: <AdminReview />,
    },
    {
      path: "pay",
      element: <AdminPayHistory />,
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
      path: "notice/edit/:id",
      element: <AdminNoticeUpload />,
    },
    {
      path: "settings",
      element: <AdminSettings />,
    },
  ],
};

export default adminRoutes;
