import { Link } from "react-router-dom";

function EditProfile() {
  return (
    <div className="flex justify-center items-center">
      <div className="w-[360px] h-[270px] p-[30px_20px] bg-white rounded-[7px] flex justify-center items-center">
        <div className="flex flex-col">
          {/* 비밀번호 변경 */}
          <div>
            <p className="text-gray-800 text-[16px] font-bold">비밀번호 변경</p>
            <div className="h-[15px]" /> {/* 15px 공백 */}
            <Link to="/my/change-password">
              <button className="w-[320px] h-[51px] bg-blue-500 text-white rounded-lg text-[15px] font-bold">
                비밀번호 변경하기
              </button>
            </Link>
          </div>

          {/* 전화번호 변경 */}
          <div>
          <p className="text-gray-800 text-[16px] mt-[40px] font-bold">전화번호 변경</p>
          <div className="h-[15px]" /> {/* 15px 공백 */}
            <Link to="/my/change-phone">
              <button className="w-[320px] h-[51px] bg-blue-500 text-white rounded-lg text-[15px] font-bold">
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
