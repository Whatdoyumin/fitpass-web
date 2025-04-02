interface FileUploadFieldProps {
    label: string;
    file: File | null;
    onChange: (file: File | null) => void;
  }
  
  const FileUploadField = ({ label, file, onChange }: FileUploadFieldProps) => {
    return (
      <div className="w-full flex flex-col gap-[10px]">
        <label className="text-[16px] font-medium text-black-700">{label}</label>
        <div className="flex items-center gap-3">
          <input
            type="file"
            accept=".pdf,.jpeg,.jpg,.png"
            onChange={(e) => onChange(e.target.files?.[0] || null)}
            className="hidden"
            id={label}
          />
          <span className="text-[14px] text-gray-500">
            {file ? file.name : "파일을 업로드하세요."}
          </span>
          <label htmlFor={label} className="blueButton h-[40px] px-4 cursor-pointer">
            파일 선택
          </label>
        </div>
        <p className="text-[12px] text-gray-400">10MB 미만의 파일만 업로드 가능합니다. (PDF, JPEG, PNG)</p>
      </div>
    );
  };
  
  export default FileUploadField;
  