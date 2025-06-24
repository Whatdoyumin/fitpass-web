import { useLocation, useNavigate } from "react-router-dom";
import { NAV_MENU } from "../constants/nav-menu";

const Navbar = () => {
  const location = useLocation();
  const navigate = useNavigate();

  if (
    location.pathname.startsWith("/signup") ||
    location.pathname === "/buy-coins/payment" ||
    location.pathname === "/terms" ||
    location.pathname === "/privacy" ||
    location.pathname === "/refund-policy" ||
    location.pathname === "/third-party" ||
    location.pathname === "/location-policy" ||
    location.pathname === "/marketing-policy" ||
    location.pathname.startsWith("/owner")
  ) {
    return null;
  }

  return (
    <div className="w-full max-w-content bottom-0 h-navbar bg-white-100 border-t-2 border-gray-300 fixed z-20">
      <div className="w-full h-[45px] mt-3 px-6 flex justify-between items-center">
        {NAV_MENU.map((item) => {
          const isActive = item.path.some((path) =>
            path === "/" ? location.pathname === "/" : location.pathname.startsWith(path)
          );
          return (
            <div
              key={item.id}
              className="flex flex-col items-center gap-1 cursor-pointer"
              onClick={() => navigate(item.path[0])}
            >
              {isActive ? item.img : item.img_empty}
              <p className={`text-10px ${isActive ? "text-blue-500" : "text-gray-325"}`}>
                {item.text}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Navbar;
