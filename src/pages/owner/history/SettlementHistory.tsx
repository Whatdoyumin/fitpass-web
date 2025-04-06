function SettlementHistory() {
  const data = [
    { month: "12월 정산", date: "2024.12.02 22:30", amount: "200,000원" },
    { month: "11월 정산", date: "2024.11.02 22:30", amount: "200,000원" },
    { month: "10월 정산", date: "2024.10.02 22:30", amount: "200,000원" },
  ];

  return (
    <div className="bg-white-200 flex flex-col items-center min-h-[calc(100vh-165px)] overflow-y-auto px-[25px] pt-[24px]">
      <div className="w-[340px] h-[617px] bg-white-100 rounded-7 flex flex-col divide-y divide-white-200">
        {data.map((item, idx) => (
          <div key={idx} className="flex justify-between items-center p-4 text-[16px]">
            <div className="flex flex-col gap-[3px]">
              <p>{item.month}</p>
              <p className="text-[12px]">{item.date}</p>
            </div>
            <p>{item.amount}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default SettlementHistory;
