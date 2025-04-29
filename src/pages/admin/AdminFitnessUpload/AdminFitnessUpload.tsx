import { useRef, useState } from "react";
import MainImgUpload from "./MainImgUpload";
import SelectCategory from "./SelectCategory";
import SubImgUpload from "./SubImgUpload";
import SelectStatus from "./SelectStatus";
import SetLocationModal from "./SetLocationModal";
import TimeInput from "../../../components/common/TimeInput";
import Modal from "../../../components/Modal";
import { IcFontBold, IcFontUnderline } from "../../../assets/svg";
import { useAdminFitnessUpload } from "../../../hooks/useAdminFitnessUpload";
import { IAdminFitnessUpload } from "../../../types/adminFitnessUpload";
import { useNavigate } from "react-router-dom";

function AdminFitnessUpload() {
  const category = ["헬스", "필라테스", "요가", "기타"];
  const navigate = useNavigate();

  const [formState, setFormState] = useState<IAdminFitnessUpload>({
    totalFee: "",
    detailAddress: "",
    loginId: "",
    fee: "",
    latitude: 0,
    time: {},
    longitude: 0,
    fitnessName: "",
    isPurchasable: true,
    address: "",
    phoneNumber: "",
    notice: "",
    howToUse:
      "패스 구매 전 전화 후 패스 구매하기. 시설에 방문하여 이용 가능 패스 사용 내역 보여주기",
    categoryList: [],
    purchasable: false,
  });

  const [mainImg, setMainImg] = useState<File | null>(null);
  const [subImg, setSubImg] = useState<File[]>([]);
  const [addressModal, setAddressModal] = useState(false);
  const [submitModal, setSubmitModal] = useState(false);

  const contentRef = useRef<HTMLDivElement>(null);
  const { mutate: uploadFitness } = useAdminFitnessUpload();

  const handleChange = <K extends keyof IAdminFitnessUpload>(
    key: K,
    value: IAdminFitnessUpload[K]
  ) => {
    setFormState((prev) => ({ ...prev, [key]: value }));
  };

  const handleLocation = (add: string, lat: number, lng: number) => {
    setFormState((prev) => ({
      ...prev,
      address: add,
      latitude: lat,
      longitude: lng,
    }));
  };

  const handleNotice = () => {
    if (contentRef.current) {
      const content = contentRef.current.innerHTML.trim();
      setFormState((prev) => ({
        ...prev,
        notice: content || "",
      }));
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitModal(false);
  };

  const submitForm = () => {
    if (!mainImg || subImg.length === 0) {
      alert("이미지를 등록해주세요.");
      return;
    }

    const formData = new FormData();
    formData.append("mainImage", mainImg);
    subImg.forEach((file) => {
      formData.append("additionalImages", file);
    });
    formData.append("request", JSON.stringify(formState));

    uploadFitness(formData, {
      onSuccess: () => {
        alert("시설이 등록되었습니다.");
        navigate("/admin/fitness/list");
      },
      onError: () => {
        alert("시설 등록에 실패했습니다.");
        setSubmitModal(false);
      },
    });
  };

  return (
    <div className="w-full h-full overflow-y-auto">
      <h1 className="adminTitle">피트니스 센터 → 시설 등록</h1>
      <form onSubmit={handleSubmit} className="py-5 pl-[50px] pr-[100px] ">
        <div className="flex flex-wrap gap-10 mb-3">
          {/* 왼쪽 */}
          <div className="flex flex-col gap-4 flex-1">
            {/* 업체명 */}
            <label htmlFor="fitnessName">업체명</label>
            <input
              id="fitnessName"
              value={formState.fitnessName}
              onChange={(e) => handleChange("fitnessName", e.target.value)}
              className="w-full h-[30px] border border-gray-450 rounded-[3px] pl-1"
            />

            {/* 아이디 */}
            <label htmlFor="loginId">아이디</label>
            <input
              id="loginId"
              value={formState.loginId}
              onChange={(e) => handleChange("loginId", e.target.value)}
              className="w-full h-[30px] border border-gray-450 rounded-[3px] pl-1"
            />

            {/* 주소 */}
            <div className="flex flex-col gap-4">
              <label htmlFor="address">주소</label>
              <div className="flex gap-2">
                <input
                  id="address"
                  value={formState.address}
                  readOnly
                  className="w-full h-[30px] border border-gray-450 rounded-[3px] pl-1"
                />
                <button
                  type="button"
                  onClick={() => setAddressModal(true)}
                  className="w-[53px] h-[30px] text-[14px] bg-gray-400 text-white-100 rounded-[5px]"
                >
                  검색
                </button>
              </div>
            </div>

            {/* 상세 주소 */}
            <label htmlFor="detailAddress">상세 주소</label>
            <input
              id="detailAddress"
              type="text"
              value={formState.detailAddress}
              onChange={(e) => handleChange("detailAddress", e.target.value)}
              className="w-full h-[30px] border border-gray-450 rounded-[3px] pl-1"
            />
          </div>

          {/* 중간 */}
          <div className="flex flex-col gap-4 flex-1">
            {/* 대표 이미지 */}
            <MainImgUpload mainImg={mainImg} setMainImg={setMainImg} />

            {/* 대표 제외 업체 사진 */}
            <SubImgUpload subImg={subImg} setSubImg={setSubImg} />

            {/* 정가 */}
            <label htmlFor="fee">정가</label>
            <input
              id="fee"
              type="number"
              value={formState.fee}
              onChange={(e) => {
                const value = e.target.value;
                handleChange("fee", value === "" ? "" : Number(value));
              }}
              className="w-full h-[30px] border border-gray-450 rounded-[3px] pl-1"
            />

            {/* 판매가 */}
            <label htmlFor="totalFee">판매가</label>
            <input
              id="totalFee"
              type="number"
              value={formState.totalFee}
              onChange={(e) => {
                const value = e.target.value;
                handleChange("totalFee", value === "" ? "" : Number(value));
              }}
              className="w-full h-[30px] border border-gray-450 rounded-[3px] pl-1"
            />
          </div>

          {/* 오른쪽 */}
          <div className="flex flex-col gap-4 flex-1">
            {/* 시설 전화번호 */}
            <label htmlFor="phoneNumber">시설 전화번호</label>
            <input
              id="phoneNumber"
              value={formState.phoneNumber}
              onChange={(e) => handleChange("phoneNumber", e.target.value)}
              className="w-full h-[30px] border border-gray-450 rounded-[3px] pl-1"
            />

            {/* 카테고리 */}
            <SelectCategory
              category={category}
              onCategoryChange={(list) => handleChange("categoryList", list)}
            />

            {/* 판매 상태 */}
            <SelectStatus
              status={formState.isPurchasable}
              onStatusChange={(bool) => handleChange("isPurchasable", bool)}
            />
          </div>
        </div>

        {/* 에디터 */}
        <div className="flex gap-[51px] h-[40px] bg-blue-100 border-t border-x border-gray-450">
          <button
            onMouseDown={(e) => e.preventDefault()}
            onClick={() => document.execCommand("bold")}
          >
            <IcFontBold width={28} />
          </button>
          <button
            onMouseDown={(e) => e.preventDefault()}
            onClick={() => document.execCommand("underline")}
          >
            <IcFontUnderline width={28} />
          </button>
        </div>

        <div className="mb-[35px]">
          <div
            ref={contentRef}
            onBlur={handleNotice}
            contentEditable
            className="w-full h-[200px] border border-gray-450 rounded-[3px] pl-2 pt-2"
            dangerouslySetInnerHTML={{ __html: formState.notice }}
          />
        </div>

        {/* 기타 입력 */}
        <div className="flex flex-col gap-4 mb-3">
          <label htmlFor="time">영업 시간</label>
          <TimeInput
            setTime={(updater) => {
              setFormState((prev) => ({
                ...prev,
                time: typeof updater === "function" ? updater(prev.time || {}) : updater,
              }));
            }}
            initialTime={formState.time || {}}
          />

          <label htmlFor="hㅊowToUse">이용 방법 안내</label>
          <input
            id="howToUse"
            value={formState.howToUse}
            onChange={(e) => handleChange("howToUse", e.target.value)}
            className="w-full h-[30px] border border-gray-450 rounded-[3px] pl-2"
          />
        </div>

        {/* 등록 버튼 */}
        <div className="flex justify-end">
          <button
            type="button"
            onClick={() => setSubmitModal(true)}
            className="w-[150px] h-[51px] bg-blue-500 text-white-100 rounded-lg text-[15px] font-bold"
          >
            등록하기
          </button>
        </div>
      </form>

      {/* 주소 모달 */}
      {addressModal && (
        <SetLocationModal onClose={() => setAddressModal(false)} onSetLocation={handleLocation} />
      )}

      {/* 등록 모달 */}
      {submitModal && (
        <Modal
          isOpen={submitModal}
          onClose={() => setSubmitModal(false)}
          onSuccess={submitForm}
          title="등록하시겠습니까?"
          btn1Text="아니요"
          btn2Text="네"
        />
      )}
    </div>
  );
}

export default AdminFitnessUpload;
