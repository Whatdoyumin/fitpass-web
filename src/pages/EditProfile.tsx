import { Link } from "react-router-dom";

function EditProfile() {
  return (
    <div className="h-full overflow-hidden bg-white-200 flex justify-center items-start pt-[29px] pr-[15px] pl-[15px]">
      <div
        className="w-[360px] h-[270px] px-5 py-[30px] bg-white-100 rounded-lg flex flex-col justify-center items-center"
        style={{ boxShadow: '0px 4px 20px 0px #EAEAEA' }}
      >        
        <div className="flex flex-col">
          <div>
            <p className="text-gray-800 text-[16px] font-medium" style={{ lineHeight: '19px' }}>비밀번호 변경</p>
            <div className="h-[15px]" />
            <Link to="/my/change-password">
              <button className="w-[320px] h-[51px] bg-blue-500 text-white-100 rounded-lg text-[15px] font-bold">
                비밀번호 변경하기
              </button>
            </Link>
          </div>

          <div>
          <p className="text-gray-800 text-[16px] mt-[40px] font-medium" style={{ lineHeight: '19px' }}>전화번호 변경</p>
          <div className="h-[15px]" />
            <Link to="/my/change-phone">
              <button className="w-[320px] h-[51px] bg-blue-500 text-white-100 rounded-lg text-[15px] font-bold">
                전화번호 변경하기
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EditProfile;
