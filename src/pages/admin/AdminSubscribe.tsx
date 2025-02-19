import { useEffect, useState } from "react";
import Modal from "../../components/Modal";
import { ManagementInput } from "../../components/adminCommon/ManagementInput";
import { useGetAdminSubsribe } from "../../hooks/useGetAdminSubsribe";

interface ISubscription {
  id: number;
  plan: string;
  price: string;
  coinQuantity: string;
  coinAddition: string;
  expirationPeriod: string;
}

const plans = ["베이직", "스탠다드", "프로"];

function AdminSubscription() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [subscriptions, setSubscriptions] = useState<ISubscription[]>(
    plans.map((plan, index) => ({
      id: index + 1,
      plan,
      price: "",
      coinQuantity: "",
      coinAddition: "",
      expirationPeriod: "",
    }))
  );

  const { data } = useGetAdminSubsribe();

  useEffect(() => {
    if (data?.result) {
      const updatedSubscriptions = data.result.map((item: ISubscription, index: number) => ({
        id: index + 1,
        plan: plans[index],
        price: item.price.toString(),
        coinQuantity: item.coinQuantity.toString(),
        coinAddition: item.coinAddition.toString(),
        expirationPeriod: item.expirationPeriod.toString(),
      }));
      setSubscriptions(updatedSubscriptions);
    }
  }, [data]);

  const handleChange = (id: number, field: keyof ISubscription, value: string) => {
    setSubscriptions((prev) =>
      prev.map((sub) => (sub.id === id ? { ...sub, [field]: value } : sub))
    );
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
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
            ({ id, plan, price, coinQuantity, coinAddition, expirationPeriod }) => (
              <tr key={id} className="h-[50px] border-t text-12px border-gray-300">
                <td className="text-center">{id}</td>
                <td className="text-center">{plan}</td>
                <td>
                  <div className="flex gap-2 items-center">
                    <ManagementInput
                      value={price}
                      onChange={(e) => handleChange(id, "price", e.target.value)}
                    />
                    <p>원</p>
                  </div>
                </td>
                <td>
                  <div className="flex gap-2 items-center">
                    <ManagementInput
                      value={coinQuantity}
                      onChange={(e) => handleChange(id, "coinQuantity", e.target.value)}
                    />
                    <p>코인</p>
                  </div>
                </td>
                <td>
                  <div className="flex gap-2 items-center">
                    <ManagementInput
                      value={coinAddition}
                      onChange={(e) => handleChange(id, "coinAddition", e.target.value)}
                    />
                    <p>코인</p>
                  </div>
                </td>
                <td>
                  <div className="flex gap-2 items-center">
                    <ManagementInput
                      value={expirationPeriod}
                      onChange={(e) => handleChange(id, "expirationPeriod", e.target.value)}
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
          onSuccess={handleCloseModal}
          title={"저장하시겠습니까?"}
          btn1Text={"아니요"}
          btn2Text={"네"}
        />
      )}
    </div>
  );
}

export default AdminSubscription;
