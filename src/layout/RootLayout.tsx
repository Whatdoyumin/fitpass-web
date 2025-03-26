import { Outlet } from "react-router-dom";
import Header from "../components/header/Header";
import Navbar from "../components/Navbar";

function RootLayout() {
  return (
    <div className="h-full flex flex-col">
      <Header />
      <Outlet />
      <Navbar />
    </div>
  );
}

export default RootLayout;
