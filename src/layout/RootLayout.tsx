import { Outlet } from "react-router-dom";
import Header from "../components/header/Header";
import Navbar from "../components/Navbar";
import OwnerRouteGuard from "../routes/guard/OwnerRouteGuard";

function RootLayout() {
  return (
    <OwnerRouteGuard>
    <div className="h-full flex flex-col">
      <Header />
      <Outlet />
      <Navbar />
    </div>
    </OwnerRouteGuard>
  );
}

export default RootLayout;
