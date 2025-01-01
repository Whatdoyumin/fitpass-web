import { Outlet } from "react-router-dom";
import Header from "../components/Header";
import Navbar from "../components/Navbar";

function RootLayout() {
  return (
    <div className="h-screen flex flex-col">
      <Header />
      <Outlet />
      <Navbar />
    </div>
  );
}

export default RootLayout;
