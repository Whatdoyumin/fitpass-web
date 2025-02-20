import { useState } from "react";
import { ArrowDown, ArrowUp } from "../../assets/svg";
import { ADMIN_NAV_MENU } from "../../constants/admin-menu";
import { useLocation, useNavigate } from "react-router-dom";

const AdminNav = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [openItems, setOpenItems] = useState<{ [key: number]: boolean }>({});

  const handleClickArrow = (id: number) => {
    setOpenItems((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  if (location.pathname === "/admin/signin") {
    return null;
  }

  return (
    <div className="w-sideNavbar left-0 top-0 pt-header h-full bg-white-200 fixed border border-r-gray-400 overflow-y-auto scrollbar-hide">
      <div className="w-full h-full flex flex-col">
        {ADMIN_NAV_MENU.map((item) => (
          <div key={item.id}>
            <div
              className={`w-full h-[50px] flex justify-between items-center px-4 border border-b-gray-450 ${
                item.id == 1 ? "bg-white-100" : "bg-blue-100 "
              } ${!item.children && "cursor-pointer"}`}
              onClick={() => item.path && navigate(item.path)}
            >
              <div className="flex gap-4 items-center">
                {item.icon}
                <p className="text-12px">{item.name}</p>
              </div>
              {item.children && (
                <>
                  {openItems[item.id] ? (
                    <ArrowUp
                      width="16px"
                      onClick={() => handleClickArrow(item.id)}
                      className="cursor-pointer"
                    />
                  ) : (
                    <ArrowDown
                      width="16px"
                      onClick={() => handleClickArrow(item.id)}
                      className="cursor-pointer"
                    />
                  )}
                </>
              )}
            </div>
            {/* children 있을 경우 표시 */}
            {item.children && openItems[item.id] && (
              <>
                {item.children.map((children) => (
                  <div
                    key={children.id}
                    className="w-full h-[50px] flex items-center bg-white-100 border border-b-gray-450 pl-14 pr-4 cursor-pointer"
                    onClick={() => navigate(children.path)}
                  >
                    <p className="text-12px">{children.name}</p>
                  </div>
                ))}
              </>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminNav;
