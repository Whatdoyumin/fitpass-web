import { Outlet } from "react-router-dom";
import Header from "../components/Header";
import Navbar from "../components/Navbar";

function RootLayout() {
  return (
    <div className="h-full flex flex-col">
      <Header />
      <div className="w-full h-full z-20">
        <Outlet />
      </div>
      <Navbar />
    </div>
  );
}

export default RootLayout;
