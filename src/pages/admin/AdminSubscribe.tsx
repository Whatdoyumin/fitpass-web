import { useEffect, useState } from "react";
import Modal from "../../components/Modal";
import { ManagementInput } from "../../components/adminCommon/ManagementInput";
import { useGetSubInfo, usePutAdminSubscribe } from "../../hooks/useGetAdminSubsribe";
import { TAdminPlanType, TAdminSubsribe } from "../../types/adminSubsribe";

const plans: TAdminPlanType[] = ["BASIC", "STANDARD", "PRO"];

function AdminSubscription() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [subscriptions, setSubscriptions] = useState<TAdminSubsribe[]>(
    plans.map((planType) => ({
      planType,
      price: "",
      coinQuantity: "",
      coinAddition: "",
      expirationPeriod: "",
    }))
  );

  const { data } = useGetSubInfo();
  const { mutate } = usePutAdminSubscribe();

  useEffect(() => {
    if (data?.result) {
      const updatedSubscriptions = data.result.map((item: TAdminSubsribe) => ({
        planType: item.planType as TAdminPlanType,
        price: item.price.toString(),
        coinQuantity: item.coinQuantity.toString(),
        coinAddition: item.coinAddition.toString(),
        expirationPeriod: item.expirationPeriod.toString(),
      }));
      setSubscriptions(updatedSubscriptions);
    }
  }, [data]);

  const handleChange = (index: number, field: keyof TAdminSubsribe, value: string) => {
    setSubscriptions((prev) =>
      prev.map((sub, i) => (i === index ? { ...sub, [field]: value } : sub))
    );
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleEditSubsribes = () => {
    mutate(subscriptions, {
      onSuccess: () => {
        alert("저장되었습니다.");
        setIsModalOpen(false);
      },
      onError: (error) => {
        console.log(error.message);
        alert("에러가 발생했습니다. 다시 시도해주세요!");
      },
    });
  };

  return (
    <div className="w-full h-full overflow-y-auto p-5 relative">
      <h1 className="adminTitle mb-6">결제 → 구독 상품 관리</h1>
      <table className="w-full text-left border border-gray-300">
        <thead className="h-[50px] text-13px text-black-700 bg-blue-100 font-light">
          <tr>
            <th className="text-center w-16">순번</th>
            <th className="text-center w-28">플랜</th>
            <th className="w-44">월 가격</th>
            <th className="w-60">지급 코인</th>
            <th className="w-60">추가 지급 코인</th>
            <th className="w-60">코인 유효 기간</th>
          </tr>
        </thead>
        <tbody>
          {subscriptions.map(
            ({ planType, price, coinQuantity, coinAddition, expirationPeriod }, index: number) => (
              <tr key={index} className="h-[50px] border-t text-12px border-gray-300">
                <td className="text-center">{index + 1}</td>
                <td className="text-center">
                  {planType == "BASIC" ? "베이직" : planType == "PRO" ? "프로" : "스탠다드"}
                </td>
                <td>
                  <div className="flex gap-2 items-center">
                    <ManagementInput
                      value={price}
                      onChange={(e) => handleChange(index, "price", e.target.value)}
                    />
                    <p>원</p>
                  </div>
                </td>
                <td>
                  <div className="flex gap-2 items-center">
                    <ManagementInput
                      value={coinQuantity}
                      onChange={(e) => handleChange(index, "coinQuantity", e.target.value)}
                    />
                    <p>코인</p>
                  </div>
                </td>
                <td>
                  <div className="flex gap-2 items-center">
                    <ManagementInput
                      value={coinAddition}
                      onChange={(e) => handleChange(index, "coinAddition", e.target.value)}
                    />
                    <p>코인</p>
                  </div>
                </td>
                <td>
                  <div className="flex gap-2 items-center">
                    <ManagementInput
                      value={expirationPeriod}
                      onChange={(e) => handleChange(index, "expirationPeriod", e.target.value)}
                    />
                    <p>일</p>
                  </div>
                </td>
              </tr>
            )
          )}
        </tbody>
      </table>
      <button
        className="fixed bottom-5 right-5 bg-blue-500 text-white px-6 py-2 rounded-md text-white-100"
        onClick={() => setIsModalOpen(true)}
      >
        저장하기
      </button>
      {isModalOpen && (
        <Modal
          isOpen={isModalOpen}
          onClose={handleCloseModal}
          onSuccess={handleEditSubsribes}
          title={"저장하시겠습니까?"}
          btn1Text={"아니요"}
          btn2Text={"네"}
        />
      )}
    </div>
  );
}

export default AdminSubscription;
