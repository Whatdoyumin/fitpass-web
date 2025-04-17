import { CloseIcon, UploadImg } from "../../assets/svg";

interface ImageUploaderProps {
  images: File[] | File | null;
  setImages: (images: File[] | File | null) => void;
  multiple?: boolean;
  label: string;
  subLabel?: string;
}

function ImageUploader({
  images,
  setImages,
  multiple = false,
  label,
  subLabel,
}: ImageUploaderProps) {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;

    const fileArray = Array.from(files);

    if (multiple) {
      const currentImages = (images as File[]) || [];
      setImages([...currentImages, ...fileArray]);
    } else {
      setImages(fileArray[0]);
    }

    e.target.value = ""; // 같은 파일 다시 선택 가능하게 초기화
  };

  const handleRemove = (index: number) => {
    if (!multiple) {
      setImages(null);
    } else {
      const updated = [...(images as File[])];
      updated.splice(index, 1);
      setImages(updated);
    }
  };

  const renderPreview = () => {
    if (!images || (multiple && (images as File[]).length === 0)) return null;

    if (!multiple) {
      return (
        <div className="relative w-[92px] h-[92px]">
          <img
            src={URL.createObjectURL(images as File)}
            alt="업로드된 이미지"
            className="w-full h-full object-cover rounded-md border border-gray-300"
          />
          <button
            type="button"
            onClick={() => handleRemove(0)}
            className="absolute top-0 right-0 bg-black bg-opacity-50 text-white text-xs px-1 py-1 rounded-bl-md"
          >
            <CloseIcon width={"10px"} />
          </button>
        </div>
      );
    }

    return (images as File[]).map((file, index) => (
      <div key={index} className="relative w-[92px] h-[92px]">
        <img
          src={URL.createObjectURL(file)}
          alt={`이미지 ${index + 1}`}
          className="w-full h-full object-cover rounded-md border border-gray-300"
        />
        <button
          type="button"
          onClick={() => handleRemove(index)}
          className="absolute top-0 right-0 bg-black bg-opacity-50 text-white text-xs px-1 py-0.5 rounded-bl-md"
        >
          <CloseIcon width={"10px"} />
        </button>
      </div>
    ));
  };

  const shouldShowUploader = multiple || (!multiple && !images); // 한 개만 업로드할 경우에는 아직 이미지가 없을 때만 보여줌

  return (
    <div className="w-full flex flex-col gap-[6px]">
      <p className="text-16px font-medium text-black-700">{label}</p>
      {subLabel && <p className="text-[12px] text-gray-400">{subLabel}</p>}

      <div className="flex gap-2 flex-wrap">
        {renderPreview()}

        {shouldShowUploader && (
          <label className="w-[92px] h-[92px] flex flex-col gap-2 items-center justify-center border border-gray-300 rounded-md cursor-pointer overflow-hidden">
            <UploadImg width={"20px"} />
            <span className="text-sm text-gray-400">사진 등록</span>
            <input
              type="file"
              accept="image/jpeg, image/png"
              className="hidden"
              multiple={multiple}
              onChange={handleChange}
            />
          </label>
        )}
      </div>
    </div>
  );
}

export default ImageUploader;
