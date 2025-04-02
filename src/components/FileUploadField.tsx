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
          {/* 숨겨진 input */}
          <input
            type="file"
            accept=".pdf,.jpeg,.jpg,.png"
            onChange={(e) => onChange(e.target.files?.[0] || null)}
            className="hidden"
            id={label}
          />
    
            <div
                className={`
                    flex items-center h-[50px] flex-1 px-[20px] py-[13px] text-[14px]
                    border rounded-[5px] bg-white overflow-hidden
                    ${file ? "border-gray-500 text-gray-500" : "border-gray-400 text-gray-400"}
                `}
            >
            {file ? file.name : "파일을 업로드하세요"}
            </div>

          {/* 파일 선택 버튼 */}
          <label
            htmlFor={label}
            className="blueButton h-[50px] px-5 text-[15px] cursor-pointer"
          >
            파일 선택
          </label>
        </div>
        <p className="text-[11px] text-gray-400 mt-[5px]">
          10MB 미만의 파일만 업로드 가능합니다. (PDF, JPEG, PNG)
        </p>
      </div>
    );
  };
  
  export default FileUploadField;
  