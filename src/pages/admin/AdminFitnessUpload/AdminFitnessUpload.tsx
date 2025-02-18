import { useRef, useState } from "react";
import MainImgUpload from "./MainImgUpload";
import SelectCategory from "./SelectCategory";
import SubImgUpload from "./SubImgUpload";
import SelectStatus from "./SelectStatus";
import SetLocationModal from "./SetLocationModal";
import TimeInput from "./TimeInput";
import Modal from "../../../components/Modal";
import { IcFontBold, IcFontUnderline } from "../../../assets/svg"
import { useAdminFitnessUpload } from "../../../apis/postAdminFitness/quries/useAdminFitnessUpload";

function AdminFitnessUpload() {

  const category: string[] = ["헬스", "필라테스", "요가", "기타"];
  const status: boolean = true;
  // const status: string[] = ["구매 가능", "구매 불가"];

  const [selectedCategory, setSelectedCategory] = useState<string[]>([]);
  const [selectedStatus, setSelectedStatus] = useState(true);
  const [fitnessName, setFitnessName] = useState<string>("");
  const [address, setAddress] = useState<string>("");
  const [fee, setFee] = useState<string>("");
  const [phoneNumber, setPhoneNumber] = useState<string>("");
  const [totalFee, setTotalFee] = useState<string>("");
  const [notice, setNotice] = useState<string>("");
  const [howToUse, setHowToUse] = useState<string>("패스 구매 전 전화 후 패스 구매하기. 시설에 방문하여 이용 가능 패스 사용 내역 보여주기");
  const [etc, setEtc] = useState<string>("");
  const [mainImg, setMainImg] = useState<File | null>(null);
  const [subImg, setSubImg] = useState<File[]>([]);
  const [time, setTime] = useState<{ [key: string]: string }>({});

  // 모달 state
  const [addressModal, setAddressModal] = useState(false);
  const [submitModal, setSubmitModal] = useState(false);

  const contentRef = useRef<HTMLDivElement>(null);

  // api 연결
  const { mutate: uploadFitness } = useAdminFitnessUpload();

  // 볼드, 언더라인
  const toggleTextStyle = (style: string) => {
    document.execCommand(style, false, undefined);
  };

  // useEffect(() => {
  //   const contentElement = document.querySelector("[contenteditable]");
  //   if (contentElement && !notice) {
  //     contentElement.innerHTML = ""; // contentEditable 요소의 초기값 설정
  //   }
  // }, [notice])

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitModal(false);
  };

  const submitForm = () => {
    if (contentRef.current) {
      const content = contentRef.current.innerHTML.trim();
      if (content !== "") {
        setNotice(content);
      } else {
        setNotice(""); // 내용이 없으면 빈 문자열로 설정
      }
    }
    if (!fitnessName || !mainImg || !fee || !phoneNumber || !totalFee || !etc || !howToUse) {
      // if (!fitnessName || !mainImg || !address || !fee || !phoneNumber || !totalFee || !notice || !etc || !howToUse || !time || !selectedCategory.length) {
        alert("모든 필수 항목을 입력해주세요.");
        setSubmitModal(false);
        return;
      }

    const formData = new FormData();
    // if (mainImg) {
    //   const reader = new FileReader();
    //   reader.onloadend = () => {
    //     const base64Image = reader.result as string;
    //     formData.append("mainImage", base64Image);
    //   }
    
    //   // formData.append("mainImage", mainImg);
    // }
    // subImg.forEach((file, index) => {
    //   formData.append(`additionalImages[${index}]`, file);
    // });

    // formData.append("totalFee", totalFee);
    // formData.append("fee", fee);
    // formData.append("latitude", "0");
    // formData.append("longitude", "0");
    // formData.append("time", JSON.stringify(time));
    // formData.append("fitnessName", fitnessName);
    // formData.append("etc", etc);
    // formData.append("isPurchasable", String(selectedStatus));
    // formData.append("address", address);
    // formData.append("phoneNumber", phoneNumber);
    // formData.append("notice", notice);
    // formData.append("howToUse", howToUse);
    // formData.append("categoryList", JSON.stringify(selectedCategory));
    // formData.append("purchasable", String(selectedStatus));

    formData.append("mainImage", mainImg);  // mainImage는 이미지 파일
    subImg.forEach((file, index) => {
      formData.append(`additionalImages[${index}]`, file);
    });

    formData.append("request", JSON.stringify({
      totalFee: totalFee,
      fee: fee,
      latitude: 0,
      time: time,
      // time: JSON.stringify(time),
      longitude: 0,
      fitnessName: fitnessName,
      etc: etc,
      isPurchasable: String(selectedStatus),
      address: address,
      phoneNumber: phoneNumber,
      notice: notice,
      howToUse: howToUse,
      categoryList: selectedCategory,
      // categoryList: JSON.stringify(selectedCategory),
      purchasable: String(selectedStatus)
    }));

    uploadFitness(formData);

    console.log(formData);
  }

  // 주소 검색 모달
  const handleAddressModalOpen = () => { 
    setAddressModal(!addressModal);
  };

  const handleAddressModalClose = () => {
    setAddressModal(false);
  };

  // 등록 모달
  const handleSubmitModalOpen = () => {
    setSubmitModal(true);
  }

  const handleSubmitModalClose = () => {
    setSubmitModal(false);
  }

  return (
    <div className="w-full h-full overflow-y-auto">
      <h1 className="adminTitle">피트니스 센터 → 시설 등록</h1>
      <form onSubmit={handleSubmit} className="py-5 pl-[50px] pr-[100px] ">
        <div className="flex gap-10 mb-3">

          {/* 왼쪽 */}
          <div className="flex flex-col gap-4 flex-1 ">
          {/* <div className="flex flex-col gap-4 w-[450px] "> */}
            <label htmlFor="fitnessName">
              업체명
              <input 
                type="text" 
                id="fitnessName" 
                value={fitnessName}
                onChange={(e) => setFitnessName(e.target.value)}
                className="w-full h-[30px] border border-gray-450 rounded-[3px] focus:outline-none"
              />
            </label>
            <div className="flex flex-col">
              <label htmlFor="address">주소</label>
              <div className="flex gap-2">
                <input 
                  type="text" 
                  id="address" 
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  className="w-full h-[30px] border border-gray-450 rounded-[3px] focus:outline-none"
                  readOnly
                />
                <button
                  type="button" 
                  onClick={handleAddressModalOpen}
                  className="w-[53px] h-[30px] text-[14px] text-medium text-white-100 border bg-gray-400 rounded-[5px]"
                >검색
                </button>
              </div>
            </div>
            <label htmlFor="fee">
              정가
              <input 
                type="text" 
                id="fee" 
                value={fee}
                onChange={(e) => setFee(e.target.value)}
                className="w-full h-[30px] border border-gray-450 rounded-[3px] focus:outline-none"
                onInput={(e: React.FormEvent<HTMLInputElement>) => {
                  const input = e.currentTarget;
                  input.value = input.value.replace(/[^0-9.]/g, "").replace(/(\..*)\./g, "$1");
                }}
              />
            </label>
          </div>

          {/* 중간 */}
          <div className="flex flex-col gap-4 flex-1">
          {/* <div className="flex flex-col gap-4 w-[450px]"> */}
            {/* 이미지 업로드 */}
            <MainImgUpload mainImg={mainImg} setMainImg={setMainImg} />
            <label htmlFor="phoneNumber">
              전화번호
              <input 
                type="text" 
                id="phoneNumber" 
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                maxLength={11}
                className="w-full h-[30px] border border-gray-450 rounded-[3px] focus:outline-none"
                // className="w-[450px] h-[30px] border border-gray-450 rounded-[3px] focus:outline-none"
                onInput={(e: React.FormEvent<HTMLInputElement>) => {
                  const input = e.currentTarget;
                  input.value = input.value.replace(/[^0-9.]/g, "").replace(/(\..*)\./g, "$1");
                }}
              />
            </label>
            <label htmlFor="totalFee">
              판매가
              <input 
                type="text" 
                id="totalFee" 
                value={totalFee}
                onChange={(e) => setTotalFee(e.target.value)}
                className="w-full h-[30px] border border-gray-450 rounded-[3px] focus:outline-none"
                onInput={(e: React.FormEvent<HTMLInputElement>) => {
                  const input = e.currentTarget;
                  input.value = input.value.replace(/[^0-9.]/g, "").replace(/(\..*)\./g, "$1");
                }}
              />
            </label>
          </div>

          {/* 오른쪽 */}
          <div className="flex flex-col gap-4 flex-1">
          {/* <div className="flex flex-col gap-4 w-[450px]"> */}
            <SubImgUpload subImg={subImg} setSubImg={setSubImg} />
            <SelectCategory category={category} onCategoryChange={setSelectedCategory} />
            <SelectStatus status={status} onStatusChange={setSelectedStatus} />
          </div>
        </div>

        {/* 스타일 토글 버튼 */}
        <div className="flex h-[40px] gap-[51px] bg-blue-100 border-t border-x border-gray-450 ">
          <button onClick={() => toggleTextStyle("bold")} className="pl-[30px] focus:outline-none">
            <IcFontBold width={28} />
          </button>
          <button onClick={() => toggleTextStyle("underline")} className="focus:outline-none">
            <IcFontUnderline width={28} />
          </button>
        </div>
        {/* 내용 입력 */}
        <div className="mb-[35px]">
          <div
            ref={contentRef}
            contentEditable
            className="w-full h-[200px] resize-none border border-gray-450 rounded-[3px] pl-2 pt-2
            placeholder:text-[12px] placeholder:font-medium placeholder-black-700 focus:outline-none"
            dangerouslySetInnerHTML={{ __html: notice || "" }}
          />
        </div>

        <div className="flex flex-col gap-4 mb-3 flex-1">
          <label htmlFor="time">이용시간</label>
          <TimeInput setTime={setTime} />
          <label htmlFor="howToUse">
            이용 방법 안내
            <input 
              type="text" 
              id="howToUse" 
              value={howToUse}
              onChange={(e) => setHowToUse(e.target.value)}
              className="w-full h-[30px] border border-gray-450 rounded-[3px] pl-2
                placeholder:text-[12px] placeholder:font-medium placeholder-gray-600 focus:outline-none"
              placeholder="패스 구매 전 전화 후 패스 구매하기. 시설에 방문하여 이용 가능 패스 사용 내역 보여주기"
            />
          </label>
          <label htmlFor="etc">
            기타 사항
            <input 
              type="text" 
              id="etc" 
              value={etc}
              onChange={(e) => setEtc(e.target.value)}
              className="w-full h-[30px] border border-gray-450 rounded-[3px] pl-2
                placeholder:text-[12px] placeholder:font-medium placeholder-gray-600 focus:outline-none"
              placeholder="주차 불가능, 옷 대여 가능"
            />
          </label>
        </div>
        <div className="flex justify-end">
          <button
            type="button"
            onClick={handleSubmitModalOpen}
            className="w-[150px] h-[51px] bg-blue-500 text-white-100 rounded-lg text-[15px] font-bold"
          >등록하기</button>
        </div>
      </form>
      {/* 주소 등록 모달 */}
      {addressModal && 
        <SetLocationModal onClose={handleAddressModalClose} />}

      {/* 등록하기 모달 */}
      {submitModal &&
        <Modal
          isOpen={submitModal}
          onClose={handleSubmitModalClose}
          onSuccess={submitForm}
          title="등록하시겠습니까?"
          btn1Text="아니요"
          btn2Text="네"
        />}
    </div>
  );
}

export default AdminFitnessUpload;
