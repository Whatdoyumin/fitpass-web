import { useState } from "react";
import MainImgUpload from "./MainImgUpload";
import SelectCategory from "./SelectCategory";
import SubImgUpload from "./SubImgUpload";
import SelectStatus from "./SelectStatus";
import SetLocationModal from "./SetLocationModal";
import TimeInput from "./TimeInput";
import Modal from "../../../components/Modal";

function AdminFitnessUpload() {

  const category: string[] = ["헬스", "필라테스", "요가", "기타"];
  const status: string[] = ["구매 가능", "구매 불가"];

  const [selectedCategory, setSelectedCategory] = useState<string[]>([]);
  const [selectedStatus, setSelectedStatus] = useState<string>("");
  const [fitnessName, setFitnessName] = useState<string>("");
  const [address, setAddress] = useState<string>("");
  const [fee, setFee] = useState<string>("");
  const [phoneNumber, setPhoneNumber] = useState<string>("");
  const [totalFee, setTotalFee] = useState<string>("");
  const [notice, setNotice] = useState<string>("");
  const [howToUse, setHowToUse] = useState<string>("");
  const [etc, setEtc] = useState<string>("");
  const [mainImg, setMainImg] = useState<string>("");
  const [subImg, setSubImg] = useState<string[]>([]);
  const [time, setTime] = useState<{ [key: string]: string }>({});

  const [addressModal, setAddressModal] = useState(false);
  const [submitModal, setSubmitModal] = useState(false);
  
  const submitForm = () => {
    console.log({
      fitnessName,
      address,
      fee,
      phoneNumber,
      totalFee,
      selectedCategory,
      selectedStatus,
      notice,
      howToUse,
      etc,
      mainImg,
      subImg,
      time,
    });
    setSubmitModal(false);
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitModal(true);
  };

  // 주소 검색 모달
  const handleAddressModalOpen = () => { 
    setAddressModal(!addressModal);
  };

  const handleAddressModalClose = () => {
    setAddressModal(false);
  };

  // 등록 모달
  const handleSubmitModalOpen = () => {
    setSubmitModal(!submitModal);
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

        {/* textarea */}
        <textarea 
          className="w-full h-[270px] resize-none border border-gray-450 rounded-[3px] pl-2 pt-2
            placeholder:text-[12px] placeholder:font-medium placeholder-black-700 focus:outline-none" 
          placeholder="시설 소개 내용을 적어주세요"
          value={notice}
          onChange={(e) => setNotice(e.target.value)}
        />

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

      {addressModal && (
        <SetLocationModal onClose={handleAddressModalClose} />
      )}
      {submitModal && (
        <Modal
          isOpen={submitModal}
          onClose={handleSubmitModalClose}
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
