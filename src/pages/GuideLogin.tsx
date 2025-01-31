import { useNavigate } from "react-router-dom";
import { CloseIcon, Profile } from "../assets/svg";

function GuideLogin() {
  const navigate = useNavigate();

  return (
    <>
      <div className="w-full max-w-content top-0 h-header bg-white-100 fixed flex items-end z-10">
        <div className="w-full h-[27px] flex items-center justify-center relative border-b-2 border-gray-300 pb-8">
          <CloseIcon
            width={"11px"}
            className="absolute left-0 cursor-pointer ml-3"
            onClick={() => navigate("/")}
          />
        </div>
      </div>
      <div className="w-full flex flex-col justify-center items-center gap-5">
        <div className="w-full flex flex-col items-center gap-3">
          <Profile width={"72px"} />
          <p className="text-14px text-gray-350">로그인 후 이용 가능한 서비스입니다.</p>
        </div>
        <button className="blueButton text-16px w-72 py-2" onClick={() => navigate("/signin")}>
          로그인 하러 가기
        </button>
      </div>
    </>
  );
}

export { GuideLogin };
