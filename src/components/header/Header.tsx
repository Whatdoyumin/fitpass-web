import { matchPath, useLocation } from "react-router-dom";
import { PATH_NAMES } from "../../constants/nav-menu";
import { PageHeader } from "./PageHeader";
import { MainHeader } from "./MainHeader";

const Header = () => {
  const location = useLocation();

  const getPageName = (pathname: string): string | undefined => {
    for (const [path, name] of PATH_NAMES) {
      if (matchPath(path, pathname)) {
        return name;
      }
    }
    return undefined;
  };

  const isMainHeader = (): boolean =>
    [
      "/",
      "/fitness",
      "/fitness/:id",
      "/upload-review/:id",
      "/my",
      "/my/pay-history",
      "/update-review/:id",
    ].some((path) => matchPath(path, location.pathname));

  const pageName = getPageName(location.pathname);

  if (!pageName && !isMainHeader()) {
    return null;
  }

  return (
    <div className="w-full max-w-content top-0 h-header bg-white-100 fixed flex items-end z-40">
      {isMainHeader() ? <MainHeader /> : <PageHeader pageName={pageName} />}
    </div>
  );
};

export default Header;
