import { useAuth } from "../../context/AuthContext";
import { useKpnBillingKey } from "../../hooks/useKpnPayment";

interface IKpnPaymentProps {
  selectedOption: string | null;
  myOption: string;
  onClick: () => void;
  onRegisterSuccess: () => void;
}

const KpnPaymentButton = ({
  selectedOption,
  myOption,
  onClick,
  onRegisterSuccess,
}: IKpnPaymentProps) => {
  const { mutate: billingMutate } = useKpnBillingKey();
  const { memberId } = useAuth();

  const handleRegistCard = () => {
    onClick();

    if (memberId === null) {
      return;
    }

    billingMutate(
      {
        customerId: memberId.toString(),
        fullName: "사용자",
      },
      {
        onSuccess: (data) => {
          console.log("카드 등록 성공", data);
          onRegisterSuccess();
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
