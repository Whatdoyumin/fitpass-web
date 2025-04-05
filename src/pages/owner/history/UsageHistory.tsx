function UsageHistory() {
  const usageData = [
    { name: "아이디", date: "2025.01.02 22:30", coin: "10 코인" },
    { name: "회원명(아이디)", date: "2024.12.02 22:30", coin: "10 코인" },
    { name: "이*성(lss1***)", date: "2024.11.02 22:30", coin: "10 코인" },
  ];

  return (
    <div className="bg-white-200 flex flex-col items-center min-h-[calc(100vh-165px)] overflow-y-auto px-[25px] pt-[24px]">
      <div className="w-[340px] h-[617px] bg-white-100 rounded-7 flex flex-col divide-y divide-white-200">
        {usageData.map((item, idx) => (
          <div key={idx} className="flex justify-between items-center p-4 text-[16px]">
            <div className="flex flex-col gap-[3px]">
              <p>{item.name}</p>
              <p className="text-[12px]">{item.date}</p>
            </div>
            <p>{item.coin}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default UsageHistory;
