import { IcRightArrow } from "../../../assets/svg";
import { useNavigate } from "react-router-dom";
import {
  useGetOwnerDashboardNotices,
  useGetOwnerDashboardSettlements,
  useGetOwnerDashboardUsages,
} from "../../../hooks/useGetOwnerDashboardQueries";
import { LoadingSpinner } from "../../../components/LoadingSpinner";
import NotFound from "../../NotFound";
import { formatDate } from "../../../utils/formatDate";

function OwnerDashboard() {
  const navigate = useNavigate();
  const fitnessId = "1"; // TODO: replace with actual ID from context/store

  const [noticesRes, settlementRes, usagesRes] = [
    useGetOwnerDashboardNotices(),
    useGetOwnerDashboardSettlements(fitnessId),
    useGetOwnerDashboardUsages(fitnessId),
  ];

  const isLoading = noticesRes.isLoading || settlementRes.isLoading || usagesRes.isLoading;
  const isError = noticesRes.isError || settlementRes.isError || usagesRes.isError;

  if (isLoading) return <LoadingSpinner />;
  if (isError) return <NotFound />;

  const notices = noticesRes.data?.content || [];
  const settlement = settlementRes.data?.revenueHistoryDetailDTOS || [];
  const usages = usagesRes.data?.fitnessUsageDetailDTOS || [];

  return (
    <div className="w-full max-w-content flex flex-col items-center gap-[22px] relative px-5 pt-[29px] pb-[40px] bg-white-200">
      {/* 공지사항 */}
      <Section title="공지사항" onClick={() => navigate("/owner/notices")}>
        {notices.length ? (
          notices.map(({ id, category, title }) => (
            <div key={id} className="flex text-[16px]">
              <p className={category === "공지사항" ? "text-blue-500" : "text-red-500"}>[{category}]&nbsp;</p>
              <p>{title}</p>
            </div>
          ))
        ) : (
          <p className="text-gray-400">공지사항이 없습니다.</p>
        )}
      </Section>

      {/* 정산 내역 */}
      <Section title="전체 정산 내역 보기" onClick={() => navigate("/owner/settlement-history")}>
        {settlement.length ? (
          <p className="text-[20px] leading-[28px]">
            3월 현재까지 정산 금액은<br />
            <span className="font-bold">{settlement[0].totalPrice.toLocaleString()}원</span>입니다
          </p>
        ) : (
          <p className="text-gray-400">이번 달 정산 내역이 없습니다.</p>
        )}
      </Section>

      {/* 이용 내역 */}
      <Section title="전체 이용 내역 보기" onClick={() => navigate("/owner/usage-history")}>
        {usages.length ? (
          usages.map(({ loginId, activeTime, totalFee }, idx) => (
            <div key={idx} className="flex justify-between items-center">
              <div className="flex flex-col gap-[3px]">
                <p>{loginId}</p>
                <p className="text-[12px]">{formatDate(activeTime)}</p>
              </div>
              <p>{totalFee.toLocaleString()}코인</p>
            </div>
          ))
        ) : (
          <p className="text-gray-400">최근 이용 내역이 없습니다.</p>
        )}
      </Section>

      <button
        className="mt-[14px] w-full h-[50px] bg-blue-500 rounded-5 text-[15px] text-white-100"
        onClick={() => navigate("/owner/facilities")}
      >
        시설 관리
      </button>
    </div>
  );
}

const Section = ({ title, children, onClick }: { title: string; children: React.ReactNode; onClick: () => void }) => (
  <div className="w-full flex flex-col relative gap-[15px] bg-white-100 rounded-[7px] pb-[20px]">
    <div
      className="w-full flex items-center justify-end gap-[14px] px-[20px] pt-[15px] cursor-pointer"
      onClick={onClick}
    >
      <p className="text-[16px] text-gray-400">{title}</p>
      <IcRightArrow className="h-[13px]" />
    </div>
    <div className="w-full border-t border-gray-300" />
    <div className="flex flex-col gap-[15px] px-[20px]">{children}</div>
  </div>
);

export default OwnerDashboard;
