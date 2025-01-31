interface IPaymentCard {
  bgColor?: string;
  color?: string;
  title: React.ReactNode;
  content: string;
}

const PaymentCard = ({ bgColor, color, title, content }: IPaymentCard) => {
  return (
    <div
      className={`w-full h-[70px] rounded-[5px] relative shadow-sm ${
        color === "blue"
          ? "bg-blue-500 text-white-100 "
          : color === "skyBlue"
          ? "bg-blue-100 text-blue-500"
          : "bg-white-100 text-blue-500"
      }`}
    >
      <div className="w-full h-full flex relative">
        <div
          className={`relative w-[110px] h-full border-r-2 border-dotted flex justify-center items-center text-[16px] ${
            bgColor === "white" ? "border-r-white-100" : "border-r-white-200"
          }`}
        >
          {title}
          <div
            className={`absolute -top-[4px] left-[101%] -translate-x-1/2 w-2 h-2 rounded-full ${
              bgColor === "gray" ? "bg-white-100" : "bg-white-200"
            }`}
          ></div>
          <div
            className={`absolute -bottom-[4px] left-[101%] -translate-x-1/2 w-2 h-2 rounded-full ${
              bgColor === "gray" ? "bg-white-100" : "bg-white-200"
            }`}
          ></div>
        </div>

        <div className="w-full h-full flex justify-end items-center px-4">
          <p className="text-[15px]">{content}</p>
        </div>
      </div>
    </div>
  );
};

export { PaymentCard };
