import { Link, useNavigate } from "react-router-dom";
import { CloseIcon, SearchBlue } from "../../assets/svg";

interface IMenuProps {
  onClick: React.MouseEventHandler<HTMLButtonElement | SVGSVGElement>;
  isClosing: boolean;
}

export const HamburgerMenu = ({ onClick, isClosing }: IMenuProps) => {
  const navigate = useNavigate();

  const handleRouteSearchFit = () => {
    navigate("/search-fitness");
  };

  return (
    <div className="w-full min-h-screen z-50 absolute top-0 left-0 bg-black-700 bg-opacity-50">
      <div
        className={`
          w-72 h-full bg-white-100 absolute right-0 overflow-y-auto
          ${isClosing ? "animate-slide-out" : "animate-slide-in"}
        `}
      >
        <nav className="w-full h-full flex flex-col justify-center">
          <ul className="w-full h-full text-16px whitespace-nowrap font-semibold">
            <li className="h-20 p-5">
              <CloseIcon width={"20px"} className="float-end cursor-pointer" onClick={onClick} />
            </li>
            <li className="w-full h-20 px-5 py-4 flex justify-between items-center border-b border-b-white-200">
              <p className="cursor-pointer" onClick={handleRouteSearchFit}>
                시설 검색
              </p>
              <div
                className="relative w-10 h-10 rounded-full shadow-md cursor-pointer"
                onClick={handleRouteSearchFit}
              >
                <SearchBlue
                  width={"20px"}
                  className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
                />
              </div>
            </li>
          </ul>
          <ul className="w-full text-16px whitespace-nowrap font-semibold">
            <li className="w-full h-20 px-5 py-4 flex justify-between items-center border-b border-b-white-200">
              <Link to="/terms" className="cursor-pointer">
                이용 약관
              </Link>
            </li>
            <li className="w-full h-20 px-5 py-4 flex justify-between items-center border-b border-b-white-200">
              <Link to="/privacy" className="cursor-pointer">
                개인정보 처리방침
              </Link>
            </li>
            <li className="w-full h-20 px-5 py-4 flex justify-between items-center border-b border-b-white-200">
              <Link to="/refund-policy" className="cursor-pointer">
                환불 정책
              </Link>
            </li>
          </ul>
          <div className="w-full h-[140px] bg-gray-200 p-4 flex flex-col gap-1 text-gray-500 text-9px">
            <p>상호명: 핏패스</p>
            <p>사업자번호 : 705-53-01056 </p>
            <p>대표자명 : 이수성</p>
            <p>주소 : 서울특별시 강남구 강남대로112길 47, 2층-J676호(논현동)</p>
            <p>전화번호 : 010-8417-3845</p>
          </div>
        </nav>
      </div>
    </div>
  );
};
