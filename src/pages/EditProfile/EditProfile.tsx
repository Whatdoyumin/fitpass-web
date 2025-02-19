import EditProfileCommon from "./EditProfileCommon"; 

function EditProfile() {
  return (
    <div className="h-[calc(100vh-165px)] bg-white-200 flex justify-center items-start pt-[29px] pr-[15px] pl-[15px]">
      <div
        className="w-[360px] h-[270px] px-5 py-[30px] bg-white-100 rounded-lg flex flex-col justify-center items-center gap-[40px]"
        style={{ boxShadow: '0px 4px 20px 0px #EAEAEA' }}
      >
        <EditProfileCommon text="비밀번호 변경" linkTo="/my/change-password" />
        <EditProfileCommon text="전화번호 변경" linkTo="/my/change-phone" />
      </div>
    </div>
  );
}

export default EditProfile;
