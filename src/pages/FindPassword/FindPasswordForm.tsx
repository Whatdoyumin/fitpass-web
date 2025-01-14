import type React from "react";
import InputField from "../Signup/InputField";

interface FindPasswordFormProps {
	username: string;
	setUsername: (value: string) => void;
	name: string;
	setName: (value: string) => void;
	phoneNumber: string;
	setPhoneNumber: (value: string) => void;
	usernameError: string;
	nameError: string;
	isCodeSent: boolean;
	isCodeConfirmed: boolean;
	timer: number;
	verificationCode: string;
	setVerificationCode: (value: string) => void;
	handleSendCode: () => void;
	handleVerifyCode: () => void;
	handleNextStep: () => void;
}

const FindPasswordForm: React.FC<FindPasswordFormProps> = ({
	username,
	setUsername,
	name,
	setName,
	phoneNumber,
	setPhoneNumber,
	usernameError,
	nameError,
	isCodeSent,
	isCodeConfirmed,
	timer,
	verificationCode,
	setVerificationCode,
	handleSendCode,
	handleVerifyCode,
	handleNextStep,
}) => {
	return (
		<div className="flex-grow w-full overflow-auto flex flex-col gap-[25px]">
			{/* 아이디 입력 */}
			<div className="w-full flex flex-col gap-[10px]">
				<label
					htmlFor="username"
					className="text-[16px] font-medium text-black-700"
				>
					아이디
				</label>
				<InputField
					type="text"
					placeholder="아이디를 입력해주세요"
					value={username}
					onChange={(e) => setUsername(e.target.value)}
					hasError={!!usernameError}
				/>
				{usernameError && (
					<span className="text-red-500 text-[13px]">{usernameError}</span>
				)}
			</div>
			{/* 이름 입력 */}
			<div className="w-full flex flex-col gap-[10px]">
				<label
					htmlFor="name"
					className="text-[16px] font-medium text-black-700"
				>
					이름
				</label>
				<InputField
					type="text"
					placeholder="이름을 입력해주세요"
					value={name}
					onChange={(e) => setName(e.target.value)}
					hasError={!!nameError}
				/>
				{nameError && (
					<span className="text-red-500 text-[13px]">{nameError}</span>
				)}
			</div>
			{/* 휴대폰 입력 */}
			<div className="w-full flex flex-col gap-[10px]">
				<label
					htmlFor="phone"
					className="text-[16px] font-medium text-black-700"
				>
					휴대폰 번호
				</label>
				<div className="flex items-center gap-[12px]">
					<div className="flex items-center h-[50px] px-5 border border-gray-400 rounded-[5px] flex-1 relative">
						<input
							type="text"
							placeholder="휴대폰 번호를 -없이 입력해주세요"
							value={phoneNumber}
							onChange={(e) => setPhoneNumber(e.target.value)}
							className="w-full outline-none text-[14px] font-medium placeholder-gray-400"
						/>
					</div>
					<button
						onClick={handleSendCode}
						className={`h-[50px] px-5 rounded-[5px] text-[15px] font-medium ${
							phoneNumber.length > 0
								? "bg-blue-500 text-white-100 hover:bg-blue-400"
								: "bg-blue-250 text-white-100"
						}`}
					>
						인증하기
					</button>
				</div>
				{/* 인증번호 입력 */}
				{isCodeSent && !isCodeConfirmed && (
					<div className="flex items-center gap-[12px] mt-[10px]">
						<div className="flex items-center h-[50px] px-5 border border-gray-400 rounded-[5px] flex-1 relative">
							<input
								type="text"
								placeholder="인증번호를 입력해주세요"
								value={verificationCode}
								onChange={(e) => setVerificationCode(e.target.value)}
								className="w-full outline-none text-[14px] font-medium placeholder-gray-400"
							/>
							<span className="text-red-500 text-[14px] absolute right-[15px]">
								{`${Math.floor(timer / 60)}:${String(timer % 60).padStart(2, "0")}`}
							</span>
						</div>
						<button
							onClick={handleVerifyCode}
							disabled={verificationCode.length !== 6}
							className={`h-[50px] px-5 rounded-[5px] text-[15px] font-medium ${
								verificationCode.length === 6
									? "bg-blue-500 text-white-100 hover:bg-blue-400"
									: "bg-blue-250 text-white-100"
							}`}
						>
							확인하기
						</button>
					</div>
				)}
				{isCodeConfirmed && (
					<span className="text-[15px] text-green-500 mt-[10px]">
						인증이 완료되었습니다.
					</span>
				)}
			</div>
			<button
				onClick={handleNextStep}
				className="blueButton w-[350px] fixed bottom-[115px] h-[51px]"
			>
				변경하기
			</button>
		</div>
	);
};

export default FindPasswordForm;
