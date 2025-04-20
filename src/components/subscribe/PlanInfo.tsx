import { useNavigate } from "react-router-dom";
import { IcEmptyDollarGray } from "../../assets/svg";
import { usePostPlanSidStatus } from "../../hooks/usePostPlan";
import { useGetSubInfo } from "../../hooks/useGetAdminSubsribe";
import { TSubscribe } from "../../types/payment";

const PLAN_UI = [
  {
    option_en: "Basic",
    comment: "가볍게 시작하기",
    recommendTarget: "1주일에 한 번 운동하는 사람",
    benefit: "X",
  },
  {
    option_en: "Standard",
    comment: "인기있는 요금제",
    recommendTarget: "1주일에 2-3번 운동하는 사람",
    benefit: "추가 코인 제공",
  },
  {
    option_en: "Pro",
    comment: "최대 혜택 플랜",
    recommendTarget: "1주일에 3-4번 운동하는 사람",
    benefit: "추가 코인 제공",
  },
] as const;

type UIData = (typeof PLAN_UI)[number];

type MergedPlan = TSubscribe &
  UIData & {
    option_en: string;
  };

const PlanInfo = () => {
  const navigate = useNavigate();
  const { data: subInfoData } = useGetSubInfo();
  const { mutate } = usePostPlanSidStatus();

  const handleClickSubsribe = () => {
    mutate(undefined, {
      onSuccess: (response) => {
        localStorage.setItem("isSubscribing", response?.result.available);
        localStorage.setItem("itemName", response?.result.itemName);
        navigate("payment");
      },
      onError: (error) => {
        console.log(error.message);
        alert("다시 시도해주세요.");
      },
    });
  };

  const mergedPlanInfo: MergedPlan[] | undefined = subInfoData?.result?.map((item: TSubscribe) => {
    const matchUI = PLAN_UI.find((ui) => ui.option_en.toUpperCase() === item.planType);
    return {
      ...item,
      ...matchUI,
      option_en: matchUI?.option_en || item.planType,
    } as MergedPlan;
  });

  return (
    <div className="w-full h-[calc(100vh-165px)] bg-white-200 overflow-y-auto py-4">
      <div className="w-full h-full flex flex-col gap-10 items-center">
        {/* 나에게 딱 맞는 플랜 찾기 */}
        <div className="flex flex-col items-center gap-4">
          <h2 className="text-18px text-black-700 font-bold">나에게 딱 맞는 플랜 찾기</h2>
          <div className="overflow-x-auto">
            <table
              className="w-[340px] text-left border border-gray-300 rounded-7 border-separate"
              style={{ borderSpacing: "0px" }}
            >
              <thead className="bg-gray-200 text-black-700">
                <tr>
                  <th className="w-[85px] h-[53px] text-11px px-8 py-2 border-b border-r border-gray-300">
                    혜택
                  </th>
                  {mergedPlanInfo?.map((option, i) => (
                    <th
                      key={i}
                      className="w-[85px] px-2 py-2 text-center border-b border-r border-gray-300"
                    >
                      {option.option_en}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                <tr className="bg-white-100 text-11px h-[51px]">
                  <td className="px-5 py-2 border-b border-r border-gray-300">지급 코인</td>
                  {mergedPlanInfo?.map((option, i) => (
                    <td key={i} className="px-2 py-2 text-center border-b border-r border-gray-300">
                      <p>{option.coinQuantity}</p>
                      {option.coinAddition > 0 && (
                        <p className="text-blue-500">+ 추가 {option.coinAddition}코인</p>
                      )}
                    </td>
                  ))}
                </tr>
                <tr className="bg-white-100 text-11px h-[51px]">
                  <td className="text-11px px-5 py-2 border-b border-r border-gray-300">
                    추천 대상
                  </td>
                  {mergedPlanInfo?.map((option, i) => (
                    <td key={i} className="px-2 py-1 text-center border-b border-r border-gray-300">
                      {option.recommendTarget}
                    </td>
                  ))}
                </tr>
                <tr className="bg-white-100 text-11px h-[51px]">
                  <td className="text-11px px-5 py-2 border-r border-gray-300">추가 혜택</td>
                  {mergedPlanInfo?.map((option, i) => (
                    <td key={i} className="px-4 py-2 text-center border-r border-gray-300">
                      {option.benefit}
                    </td>
                  ))}
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* 지금 시작하세요! 요금제 비교 */}
        <div className="w-[340px] flex flex-col gap-4 items-center">
          <h2 className="text-18px text-black-700 font-bold">지금 시작하세요! 요금제 비교</h2>
          <div className="w-full h-40 flex flex-row gap-4 justify-center">
            {mergedPlanInfo?.map((option, i) => (
              <div key={i} className="flex flex-col gap-2 items-center">
                <span
                  className={`mt-2 px-2 py-1 border-2 rounded-full text-10px font-bold ${
                    option.option_en === "Pro"
                      ? "bg-transparent border-blue-500 text-blue-500"
                      : option.option_en === "Standard"
                      ? "bg-transparent border-blue-350 text-blue-350"
                      : "bg-transparent border-gray-450 text-gray-450"
                  }`}
                >
                  {option.comment}
                </span>
                <div className="w-[106px] border rounded-7 shadow-sm overflow-hidden flex flex-col items-center bg-white-100">
                  <div
                    className={`w-full h-7 pt-1 text-white-100 flex justify-center ${
                      option.option_en === "Pro"
                        ? "bg-blue-500"
                        : option.option_en === "Standard"
                        ? "bg-blue-350"
                        : "bg-gray-450"
                    }`}
                  >
                    <h3 className="text-16px font-bold">{option.option_en}</h3>
                  </div>
                  <div className="w-full flex flex-col items-center justify-center py-2 border-b-[1px] border-dashed border-gray-275">
                    <p className="text-13px text-gray-500">월 금액</p>
                    <p className="text-13px text-gray-500 font-bold">
                      {option.price.toLocaleString()}원
                    </p>
                  </div>
                  <div className="flex gap-2 p-2">
                    <IcEmptyDollarGray width={"14px"} />
                    <p className="text-13px text-gray-500">
                      {option.coinQuantity + option.coinAddition} 코인
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 구독하러 가기 버튼 */}
        <button className="w-[340px] blueButton py-3" onClick={handleClickSubsribe}>
          구독하러 가기
        </button>
      </div>
    </div>
  );
};

export default PlanInfo;
