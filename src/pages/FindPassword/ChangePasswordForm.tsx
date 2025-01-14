import type React from "react";
import InputField from "../Signup/InputField";

interface ChangePasswordFormProps {
	newPassword: string;
	setNewPassword: (value: string) => void;
	confirmPassword: string;
	setConfirmPassword: (value: string) => void;
	handleChangePassword: () => void;
	passwordError: string;
}

const ChangePasswordForm: React.FC<ChangePasswordFormProps> = ({
	newPassword,
	setNewPassword,
	confirmPassword,
	setConfirmPassword,
	handleChangePassword,
	passwordError,
}) => {
	return (
		<div className="flex-grow w-full overflow-auto flex flex-col gap-[25px]">
			<div className="w-full flex flex-col gap-[10px]">
				<label
					htmlFor="new-password"
					className="text-[16px] font-medium text-black-700"
				>
					새로운 비밀번호
				</label>
				<InputField
					type="password"
					placeholder="새로운 비밀번호를 입력해주세요"
					value={newPassword}
					onChange={(e) => setNewPassword(e.target.value)}
				/>
			</div>
			<div className="w-full flex flex-col gap-[10px]">
				<InputField
					type="password"
					placeholder="비밀번호를 재확인해주세요"
					value={confirmPassword}
					onChange={(e) => setConfirmPassword(e.target.value)}
				/>
				{passwordError && (
					<span className="text-red-500 text-[13px]">{passwordError}</span>
				)}
			</div>
			<button
				onClick={handleChangePassword}
				className={`blueButton w-[350px] fixed bottom-[115px] h-[51px]`}
			>
				변경하기
			</button>
		</div>
	);
};

export default ChangePasswordForm;
