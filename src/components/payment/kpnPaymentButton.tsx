import { useAuth } from "../../context/AuthContext";
import { useKpnBillingKey } from "../../hooks/useKpnPayment";

interface IKpnPaymentProps {
  selectedOption: string | null;
  myOption: string;
  onClick: () => void;
}

const KpnPaymentButton = ({ selectedOption, myOption, onClick }: IKpnPaymentProps) => {
  const { mutate: billingMutate } = useKpnBillingKey();
  const { userId } = useAuth();

  const handleRegistCard = () => {
    onClick();

    if (userId === null) {
      return;
    }

    billingMutate(
      {
        customerId: userId.toString(),
        fullName: "사용자",
      },
      {
        onSuccess: (data) => {
          console.log("카드 등록 성공", data);
        },
        onError: (error) => {
          console.error("카드 등록 실패", error);
        },
      }
    );
  };

  return (
    <button
      className={`payOptionButton ${
        selectedOption === myOption ? "selectedPayOption" : "unSelectedPayOption"
      }`}
      onClick={handleRegistCard}
    >
      신용/체크카드 등록
    </button>
  );
};

export { KpnPaymentButton };
