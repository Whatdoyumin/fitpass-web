import { Outlet } from "react-router-dom";
import Header from "../components/header/Header";
import Navbar from "../components/Navbar";
import RoleRouteGuard from "../routes/guard/RoleRouteGuard";
import RootStyleManager from "./RootStyleManager";

function RootLayout() {
  return (
    <RoleRouteGuard>
      <RootStyleManager />
      <div className="w-full h-full flex flex-col relative">
        <Header />
        <Outlet />
        <Navbar />
      </div>
    </RoleRouteGuard>
  );
}

export default RootLayout;
