import { FitpassLogo } from "../../assets/svg";
import { useLocation } from "react-router-dom";

const AdminHeader = () => {
  const location = useLocation();

  if (location.pathname === "/admin/signin") {
    return null;
  }

  return (
    <header className="w-screen min-w-admin top-0 left-0 h-header bg-white-100 fixed z-10 border border-b-gray-400">
      <div className="w-full h-full flex items-center px-6">
        <FitpassLogo width={"176px"} className="cursor-pointer" />
      </div>
    </header>
  );
};

export default AdminHeader;
