import { useEffect, useState } from "react";
import Modal from "../../components/Modal";
import { TAdminCoinName, TAdminCoins } from "../../types/adminCoint";
import { useGetCoinInfo, usePutAdminCoins } from "../../hooks/useGetAdminCoins";

const names: TAdminCoinName[] = [
  "1코인",
  "5코인",
  "10코인",
  "20코인",
  "30코인",
  "100코인",
  "300코인",
];

function AdminCoin() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [coins, setCoins] = useState<TAdminCoins[]>(
    names.map((name) => ({
      name,
      price: 0,
      coinQuantity: 0,
      coinAddition: 0,
      expirationPeriod: "",
    }))
  );

  const { data } = useGetCoinInfo();
  const { mutate } = usePutAdminCoins();

  useEffect(() => {
    if (data?.result) {
      const updatedCoins = data.result.map((item: TAdminCoins) => ({
        name: item.name as TAdminCoinName,
        price: item.price.toString(),
        coinQuantity: item.coinQuantity.toString(),
        coinAddition: item.coinAddition.toString(),
        expirationPeriod: item.expirationPeriod.toString(),
      }));
      setCoins(updatedCoins);
    }
  }, [data]);

  const handleChange = (index: number, field: keyof TAdminCoins, value: string) => {
    setCoins((prev) => prev.map((coin, i) => (i === index ? { ...coin, [field]: value } : coin)));
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleEditCoins = () => {
    mutate(coins, {
      onSuccess: () => {
        alert("저장되었습니다.");
        setIsModalOpen(false);
      },
      onError: (error) => {
        console.log(error.message);
      },
    });
  };

  return (
    <div className="w-full h-full overflow-y-auto p-5 relative">
      <h1 className="adminTitle mb-6">결제 → 코인 상품 관리</h1>
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
          {coins.map(({ name, price, coinQuantity, coinAddition, expirationPeriod }, index) => (
            <tr key={index} className="h-[50px] border-t text-12px border-gray-300">
              <td className="text-center">{index + 1}</td>
              <td className="text-center">{name}</td>
              <td>
                <div className="flex gap-2 items-center">
                  <input
                    type="number"
                    value={price}
                    onChange={(e) => handleChange(index, "price", e.target.value)}
                    className="border border-gray-450 rounded-5 p-1 w-32"
                  />
                  <p>원</p>
                </div>
              </td>
              <td>
                <div className="flex gap-2 items-center">
                  <input
                    type="number"
                    value={coinQuantity}
                    onChange={(e) => handleChange(index, "coinQuantity", e.target.value)}
                    className="border border-gray-450 rounded-5 p-1 w-32"
                  />
                  <p>코인</p>
                </div>
              </td>
              <td>
                <div className="flex gap-2 items-center">
                  <input
                    type="number"
                    value={coinAddition}
                    onChange={(e) => handleChange(index, "coinAddition", e.target.value)}
                    className="border border-gray-450 rounded-5 p-1 w-32"
                  />
                  <p>코인</p>
                </div>
              </td>
              <td>
                <div className="flex gap-2 items-center">
                  <input
                    type="number"
                    value={expirationPeriod}
                    onChange={(e) => handleChange(index, "expirationPeriod", e.target.value)}
                    className="border border-gray-450 rounded-5 p-1 w-32"
                  />
                  <p>일</p>
                </div>
              </td>
            </tr>
          ))}
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
          onSuccess={handleEditCoins}
          title={"저장하시겠습니까?"}
          btn1Text={"아니요"}
          btn2Text={"네"}
        />
      )}
    </div>
  );
}

export default AdminCoin;
