import { matchPath, useLocation, useNavigate } from "react-router-dom";
import { BackIcon, Location, Logo, SearchBlue } from "../assets/svg";
import { PATH_NAMES } from "../constants/nav-menu";

const Header = () => {
  const location = useLocation();

  const getPageName = (pathname: string): string => {
    for (const [path, name] of PATH_NAMES) {
      if (matchPath(path, pathname)) {
        return name;
      }
    }
    return "";
  };

  const isMainHeader = ["/", "/fitness", "/fitness/:id", "/upload-review", "/my"].some((path) =>
    matchPath(path, location.pathname)
  );

  return (
    <div className="w-full max-w-content top-0 h-header bg-white-100 fixed flex items-end z-50">
      {isMainHeader ? <MainHeader /> : <PageHeader pageName={getPageName(location.pathname)} />}
    </div>
  );
};

const MainHeader = () => {
  const navigate = useNavigate();

  return (
    <div className="w-full flex justify-center gap-6 border-b-2 border-gray-300 pb-4">
      <Logo width={"47px"} onClick={() => navigate("/")} />
      <div className="w-[219px] h-10 bg-gray-200 flex gap-4 rounded-5 px-3 py-2">
        <Location width={"16px"} />
        <input
          type="text"
          className="w-full bg-transparent text-14px text-gray-500"
          placeholder="중구 필동로 123번지"
          onClick={() => navigate("/set-location")}
        />
      </div>
      <SearchBlue width={"26px"} onClick={() => navigate("/search-fitness")} />
    </div>
  );
};

interface PageHeaderProps {
  pageName?: string;
}

const PageHeader = ({ pageName }: PageHeaderProps) => {
  return (
    <div className="w-full h-[27px] flex items-center justify-center relative border-b-2 border-gray-300 pb-8">
      <BackIcon
        width={"11px"}
        className="absolute left-0 cursor-pointer ml-3"
        onClick={() => window.history.back()}
      />
      <p className="text-18px text-black-700 font-bold">{pageName}</p>
    </div>
  );
};

export default Header;
