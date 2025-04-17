import { Outlet } from "react-router-dom";
import Header from "../components/header/Header";
import Navbar from "../components/Navbar";
import RoleRouteGuard from "../routes/guard/RoleRouteGuard";

function RootLayout() {
  return (
    <RoleRouteGuard>
      <div className="w-full h-full flex flex-col">
        <Header />
        <Outlet />
        <Navbar />
      </div>
    </RoleRouteGuard>
  );
}

export default RootLayout;
