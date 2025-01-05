interface ChangePasswordProps {
  currentPassword: string;
  newPassword: string;
  confirmNewPassword: string;
}

function ChangePassword({
  currentPassword,
  newPassword,
  confirmNewPassword
}: ChangePasswordProps) {
  return (
      <div className="bg-white p-6">
        {/* 기존 비밀번호 */}
        <div className="mb-[10px]">
          <label className="text-gray-800 text-[16px] font-bold">기존 비밀번호</label>
          <input
            type="password"
            value={currentPassword}
            placeholder="비밀번호를 입력해주세요"
            className="w-full p-3 border border-gray-300 rounded-md mt-[10px] text-[14px] font-bold"
          />
        </div>

        {/* 새로운 비밀번호 */}
        <div className="mb-[227px]">
          <label className="text-gray-800 text-[16px] font-bold">새로운 비밀번호</label>
          <input
            type="password"
            value={newPassword}
            placeholder="새로운 비밀번호를 입력해주세요"
            className="w-full p-3 border border-gray-300 rounded-md mt-[10px] text-[14px] font-bold"
          />
          <input
            type="password"
            value={confirmNewPassword}
            placeholder="새로운 비밀번호를 재확인해주세요"
            className="w-full p-3 border border-gray-300 rounded-md mt-[10px] text-[14px] font-bold"
          />
        </div>
        {/* 변경하기 버튼 */}
        <button className="w-full max-w-[350px] h-[51px] bg-blue-500 text-white-100 rounded-lg text-[15px] font-bold">
          변경하기
        </button>
      </div>
  );
}

export default ChangePassword;
