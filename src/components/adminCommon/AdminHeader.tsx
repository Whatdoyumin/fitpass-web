import { FitpassLogo } from "../../assets/svg";

const AdminHeader = () => {
  return (
    <header className="w-full max-w-admin top-0 left-0 h-header bg-white-100 fixed z-10 border border-b-gray-400">
      <div className="w-full h-full flex items-center px-6">
        <FitpassLogo width={"176px"} className="cursor-pointer" />
      </div>
    </header>
  );
};

export default AdminHeader;
