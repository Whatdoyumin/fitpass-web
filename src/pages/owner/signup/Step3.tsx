import { useState } from "react";
import InputField from "../../../components/InputField";
import { useLocation, useNavigate } from "react-router-dom";
import { MoreTerms } from "../../../assets/svg";
import FileUploadField from "../../../components/FileUploadField";
import { getBusinessRegistrationPresignedUrl, getBankCopyPresignedUrl, uploadToS3 } from "../../../apis/owner/upload";
import { ownerSignUp } from "../../../apis/owner/signup/signup";

interface Agreements {
  all: boolean;
  terms: boolean;
  privacy: boolean;
  thirdParty: boolean;
  marketing: boolean;
}

function OwnerSignupStep3() {
  const navigate = useNavigate();
  const location = useLocation();
  const { id, password, name, phoneNumber } = location.state || {};

  const inputFields: { label: string; placeholder: string; key: keyof typeof formData }[] = [
    { label: "상호 (법인명)", placeholder: "상호를 입력해주세요", key: "companyName" },
    { label: "사업자등록번호", placeholder: "000-00-00000", key: "registrationNumber" },
    { label: "은행명", placeholder: "은행명을 입력해주세요", key: "bankName" },
    { label: "예금주명", placeholder: "예금주 명과 사업자 명이 동일해야 합니다", key: "accountHolder" },
    { label: "사업자계좌번호", placeholder: "000-00-00000", key: "accountNumber" },
  ];

  const [formData, setFormData] = useState({
    companyName: "",
    registrationNumber: "",
    bankName: "",
    accountHolder: "",
    accountNumber: "",
  });

  const [businessFile, setBusinessFile] = useState<File | null>(null);
  const [bankbookFile, setBankbookFile] = useState<File | null>(null);

  const [agreements, setAgreements] = useState<Agreements>({
    all: false,
    terms: false,
    privacy: false,
    thirdParty: false,
    marketing: false,
  });

  const handleAllAgreement = () => {
    const newState = !agreements.all;
    setAgreements({
      all: newState,
      terms: newState,
      privacy: newState,
      thirdParty: newState,
      marketing: newState,
    });
  };

  const handleAgreementChange = (key: keyof Agreements) => {
    setAgreements((prev) => {
      const updated = { ...prev, [key]: !prev[key] };
      updated.all = Object.values(updated).every(Boolean);
      return updated;
    });
  };

  const isFormValid =
    inputFields.every((field) => formData[field.key].trim() !== "") &&
    agreements.terms &&
    agreements.privacy &&
    agreements.thirdParty &&
    businessFile &&
    bankbookFile;

  const handleNextStep = async () => {
    if (!isFormValid || !businessFile || !bankbookFile) return;

    try { 
      // 사업자등록증 파일 업로드
      const { preSignedUrl: businessUrl, key: businessKey } = await getBusinessRegistrationPresignedUrl(businessFile.name);
      await uploadToS3(businessUrl, businessFile);

      // 통장 사본
      const { preSignedUrl: bankUrl, key: bankKey } = await getBankCopyPresignedUrl(bankbookFile.name);
      await uploadToS3(bankUrl, bankbookFile);
      
      // 회원가입 API
      await ownerSignUp({
        name,
        id,
        password,
        phoneNumber,
        corporation: formData.companyName,
        businessRegistrationNumber: formData.registrationNumber,
        bankName: formData.bankName,
        depositAccountName: formData.accountHolder,
        depositAccountNumber: formData.accountNumber,
        businessRegistrationUrl: businessKey,
        bankCopyUrl: bankKey,
        agreements,
        agree: agreements.all,
      });

      navigate("/signin");
    } catch (error) {
      alert(error instanceof Error ? error.message : "회원가입에 실패했습니다.");
    }
  };

  return (
    <div className="w-full max-w-content flex flex-col items-center relative px-5 pt-[29px] pb-[80px]">
      <div className="flex-grow w-full overflow-auto flex flex-col gap-[20px]">
        {inputFields.map((field) => (
          <div key={field.key} className="w-full flex flex-col gap-[10px]">
            <label className="text-[16px] font-medium text-black-700">{field.label}</label>
            <InputField
              type="etc"
              placeholder={field.placeholder}
              value={formData[field.key]}
              onChange={(e) => setFormData((prev) => ({ ...prev, [field.key]: e.target.value }))}
            />
          </div>
        ))}

        <FileUploadField label="사업자 등록증을 업로드해주세요" file={businessFile} onChange={setBusinessFile} />
        <FileUploadField label="사업자 통장 사본을 업로드해주세요" file={bankbookFile} onChange={setBankbookFile} />
      </div>

      <div className="w-full max-w-content flex flex-col items-center justify-center mx-auto mt-[46px] mb-[36px]">
        <div className="w-[350px] flex items-center gap-[17px] px-[25px] py-[10px]">
          <input
            type="checkbox"
            checked={agreements.all}
            onChange={handleAllAgreement}
            className="w-[15px] h-[15px]"
          />
          <span className="text-[14px] text-gray-500 font-normal">전체 약관에 동의합니다</span>
        </div>

        <div className="flex flex-col items-start w-[350px] px-[25px] py-[10px] gap-[14px] border border-gray-400 rounded-[5px] text-[14px] text-gray-500">
          {[{ agreementKey: "terms", pathKey: "terms", label: "[필수] 이용 약관 동의" },
            { agreementKey: "privacy", pathKey: "privacy", label: "[필수] 개인정보 수집 및 이용 동의" },
            { agreementKey: "thirdParty", pathKey: "third-party", label: "[필수] 제3자 정보 제공 동의" },
            { agreementKey: "marketing", pathKey: "marketing-policy", label: "[선택] 마케팅 정보 제공 동의" },
          ].map((item) => (
            <label key={item.pathKey} className="flex items-center justify-between w-full">
              <div className="flex items-center gap-[17px]">
                <input
                  type="checkbox"
                  checked={agreements[item.agreementKey as keyof Agreements]}
                  onChange={() => handleAgreementChange(item.agreementKey as keyof Agreements)}
                  className="w-[15px] h-[15px]"
                />
                {item.label}
              </div>
              <MoreTerms className="h-[11px] pl-[10px] cursor-pointer" onClick={() => navigate(`/${item.pathKey}`)} />
            </label>
          ))}
        </div>
      </div>

      <button
        onClick={handleNextStep}
        disabled={!isFormValid}
        className={`z-50 fixed bottom-0 w-full max-w-content h-[86px] text-[20px] font-medium text-white-100 ${
          isFormValid ? "bg-blue-500 hover:bg-blue-400" : "bg-gray-400"
        }`}
        style={{ paddingTop: "17px", paddingBottom: "39px" }}
      >
        동의하고 가입하기
      </button>
    </div>
  );
}

export default OwnerSignupStep3;
