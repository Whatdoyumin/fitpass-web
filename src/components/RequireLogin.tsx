import SvgProfile from "../assets/svg/Profile";

function RequireLogin() {
  return(
    <div className="flex flex-col items-center justify-center h-full gap-[22px]">
      <SvgProfile className="w-[72px] h-[72px]" />
      <p className="text-gray-350">로그인 후 이용 가능한 서비스입니다.</p>
    </div>
  );
}

export default RequireLogin;