import { useNavigate } from "react-router-dom";
import { IcSignupUser, IcSignupOwner } from "../../assets/svg";

function Signup() {
  const navigate = useNavigate();

  const handleUserSignup = () => {
    navigate("/signup/step1");
  };

  const handleOwnerSignup = () => {
    navigate("/owner/signup/step1");
  };

  return (
    <div className="pt-[25px] bg-white-200 w-full max-w-content flex flex-col items-center gap-[20px] relative px-5 h-[calc(100vh-165px)]">

      <div className="w-[340px] flex flex-col items-center px-[20px] py-[26px] bg-white-100 rounded-[7px]">
        <IcSignupUser className="w-[80px] h-[80px] mx-auto" />
        <p className="font-bold text-[18px] mt-[18px] mb-[36px]">이용 회원이신가요?</p>
        <button className="w-[310px] h-[51px] bg-blue-500 rounded-5 text-[15px] text-white-100"
          onClick={handleUserSignup}>
          가입하기
        </button>
      </div>

      <div className="w-[340px] flex flex-col items-center px-[20px] py-[26px] bg-white-100 rounded-[7px]">
        <IcSignupOwner className="w-[80px] h-[80px] mx-auto" />
        <p className="font-bold text-[18px] mt-[18px] mb-[36px]">시설 관리자이신가요?</p>
        <button className="w-[310px] h-[51px] bg-blue-500 rounded-5 text-[15px] text-white-100"
          onClick={handleOwnerSignup}>
          가입하기
        </button>
      </div>

    </div>
  );
}

export default Signup;
