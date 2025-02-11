import { useState } from "react";
import Button from "../../EditProfile/common/Button";
import MainImgUpload from "./MainImgUpload";
import SelectCategory from "./SelectCategory";
import SubImgUpload from "./SubImgUpload";
import SelectStatus from "./SelectStatus";
import SetLocationModal from "./SetLocationModal";
import TimeInput from "./TimeInput";

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

  const [isModal, setIsModal] = useState(false);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
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
      subImg
    });
  };

  const handleModalOpen = () => { 
    setIsModal(!isModal);
  };

  const handleModalClose = () => {
    setIsModal(false);
  };

  return (
    <div className="w-full h-full overflow-y-auto">
      <h1 className="adminTitle">피트니스 센터 → 시설 등록</h1>
      <form onSubmit={handleSubmit}>
        <div className="flex gap-6 mb-3">

          {/* 왼쪽 */}
          <div className="flex flex-col gap-4 w-[300px] ">
            <label htmlFor="fitnessName">
              업체명
              <input 
                type="text" 
                id="fitnessName" 
                value={fitnessName}
                onChange={(e) => setFitnessName(e.target.value)}
                className="w-[300px] h-[30px] border border-gray-450 rounded-[3px] "
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
                  className="w-[240px] h-[30px] border border-gray-450 rounded-[3px] "
                  readOnly
                />
                <button
                  type="button" 
                  onClick={handleModalOpen}
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
                className="w-[300px] h-[30px] border border-gray-450 rounded-[3px] "
                onInput={(e: React.FormEvent<HTMLInputElement>) => {
                  const input = e.currentTarget;
                  input.value = input.value.replace(/[^0-9.]/g, "").replace(/(\..*)\./g, "$1");
                }}
              />
            </label>
          </div>

          {/* 중간 */}
          <div className="flex flex-col gap-4 w-[300px]">
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
                className="w-[300px] h-[30px] border border-gray-450 rounded-[3px] "
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
                className="w-[300px] h-[30px] border border-gray-450 rounded-[3px] "
                onInput={(e: React.FormEvent<HTMLInputElement>) => {
                  const input = e.currentTarget;
                  input.value = input.value.replace(/[^0-9.]/g, "").replace(/(\..*)\./g, "$1");
                }}
              />
            </label>
          </div>

          {/* 오른쪽 */}
          <div className="flex flex-col gap-4 w-[300px]">
            <SubImgUpload subImg={subImg} setSubImg={setSubImg} />
            <SelectCategory category={category} onCategoryChange={setSelectedCategory} />
            <SelectStatus status={status} onStatusChange={setSelectedStatus} />
          </div>
        </div>

        {/* textarea */}
        <textarea 
          className="w-full h-[270px] resize-none border border-gray-450 rounded-[3px] pl-2 pt-2
            placeholder:text-[12px] placeholder:font-medium placeholder-black-700" 
          placeholder="시설 소개 내용을 적어주세요"
          value={notice}
          onChange={(e) => setNotice(e.target.value)}
        />

        <div className="flex flex-col mb-3 w-full">
          <label htmlFor="time">이용시간</label>
          <TimeInput />
          <label htmlFor="howToUse">
            이용 방법 안내
            <input 
              type="text" 
              id="howToUse" 
              value={howToUse}
              onChange={(e) => setHowToUse(e.target.value)}
              className="w-full h-[30px] border border-gray-450 rounded-[3px] pl-2
                placeholder:text-[12px] placeholder:font-medium placeholder-gray-600"
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
                placeholder:text-[12px] placeholder:font-medium placeholder-gray-600"
              placeholder="주차 불가능, 옷 대여 가능"
            />
          </label>
        </div>
        <div className="flex justify-end">
          <Button
            type="submit"
            disabled={false}
            text="등록하기" 
            className="w-[150px] "
          />
        </div>
      </form>

      {isModal && (
        <SetLocationModal onClose={handleModalClose} />
      ) }
    </div>
  );
}

export default AdminFitnessUpload;
