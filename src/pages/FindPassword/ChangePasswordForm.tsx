import type React from "react";
import { useState } from "react";
import InputField from "../Signup/InputField";
import { useNavigate } from "react-router-dom";

const ChangePasswordForm: React.FC = () => {
    const navigate = useNavigate();
	const [password, setPassword] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("");
	const [passwordError, setPasswordError] = useState("");
	const [confirmPasswordError, setConfirmPasswordError] = useState("");

	/** 비밀번호 검증 */
	const validatePassword = (value: string) => {
		const regex = /^[a-zA-Z0-9]{8,20}$/;
		if (!regex.test(value)) {
			setPasswordError("영어와 숫자를 사용하여 8-20자로 입력해주세요.");
		} else {
			setPasswordError("");
		}
		setPassword(value);
	};

	/** 비밀번호 확인 검증 */
	const validateConfirmPassword = (value: string) => {
		if (value !== password) {
			setConfirmPasswordError("비밀번호가 일치하지 않습니다.");
		} else {
			setConfirmPasswordError("");
		}
		setConfirmPassword(value);
	};

	/** 변경하기 버튼 핸들러 */
	const handleChangePassword = () => {
		if (
			!passwordError &&
			!confirmPasswordError &&
			password &&
			confirmPassword
		) {
			alert("비밀번호가 성공적으로 변경되었습니다!");
            navigate("/signin");
		} else {
			if (!password) setPasswordError("비밀번호를 입력해주세요.");
			if (!confirmPassword)
				setConfirmPasswordError("비밀번호를 재확인해주세요.");
		}
	};

	return (
		<div className="flex-grow w-full overflow-auto flex flex-col gap-[10px]">
			{/* 비밀번호 입력 */}
			<div className="w-full flex flex-col gap-[10px]">
				<label
					htmlFor="password"
					className="text-[16px] font-medium text-black-700"
				>
					새로운 비밀번호
				</label>
				<InputField
					type="password"
					placeholder="새로운 비밀번호를 입력해주세요"
					value={password}
					onChange={(e) => validatePassword(e.target.value)}
					hasError={!!passwordError}
				/>
				{passwordError && (
					<span className="text-red-500 text-[13px]">{passwordError}</span>
				)}
			</div>
			{/* 비밀번호 확인 */}
			<div className="w-full flex flex-col gap-[10px]">
				<InputField
					type="password"
					placeholder="비밀번호를 재확인해주세요"
					value={confirmPassword}
					onChange={(e) => validateConfirmPassword(e.target.value)}
					hasError={!!confirmPasswordError}
				/>
				{confirmPasswordError && (
					<span className="text-red-500 text-[13px]">
						{confirmPasswordError}
					</span>
				)}
			</div>
			{/* 변경하기 버튼 */}
			<button
				onClick={handleChangePassword}
				className={`blueButton w-[350px] fixed bottom-[115px] h-[51px] bg-blue-500 text-white-100`}
			>
				변경하기
			</button>
		</div>
	);
};

export default ChangePasswordForm;
