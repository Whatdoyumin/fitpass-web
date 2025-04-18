import { useEffect, useState } from "react";

interface TimeInputProps {
  setTime: React.Dispatch<React.SetStateAction<{ [key: string]: string }>>;
  initialTime: { [key: string]: string };
}

function TimeInput({ setTime, initialTime }: TimeInputProps) {
  const days = ["월", "화", "수", "목", "금", "토", "일"];

  const [localTime, setLocalTime] = useState<{ [key: string]: string }>(
    Object.fromEntries(days.map((day) => [day, ""]))
  );
  const [holidayDays, setHolidayDays] = useState<{ [key: string]: boolean }>(
    Object.fromEntries(days.map((day) => [day, false]))
  );

  useEffect(() => {
    setLocalTime(initialTime);
    const updatedHoliday: { [key: string]: boolean } = {};
    days.forEach((day) => {
      updatedHoliday[day] = initialTime[day] === "휴무";
    });
    setHolidayDays(updatedHoliday);
  }, [initialTime]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>, day: string) => {
    let digits = e.target.value.replace(/\D/g, ""); // 숫자만 추출
    let formatted = "";

    if (digits.length <= 2) {
      formatted = digits;
    } else if (digits.length === 3) {
      formatted = digits.replace(/(\d{2})(\d{1})/, "$1:$2");
    } else if (digits.length === 4) {
      formatted = digits.replace(/(\d{2})(\d{2})/, "$1:$2 ~ ");
    } else if (digits.length === 5) {
      formatted = digits.replace(/(\d{2})(\d{2})(\d{1})/, "$1:$2 ~ $3");
    } else if (digits.length === 6) {
      formatted = digits.replace(/(\d{2})(\d{2})(\d{2})/, "$1:$2 ~ $3:");
    } else if (digits.length >= 7 && digits.length <= 8) {
      digits = digits.slice(0, 8);
      formatted = digits.replace(/(\d{2})(\d{2})(\d{2})(\d{1,2})/, "$1:$2 ~ $3:$4");
    }

    setLocalTime((prev) => ({ ...prev, [day]: formatted }));
    setTime((prev) => ({ ...prev, [day]: formatted }));
  };

  const toggleHoliday = (day: string) => {
    setHolidayDays((prev) => {
      const isHoliday = !prev[day];

      const newHolidayState = { ...prev, [day]: isHoliday };
      setLocalTime((prevTime) => ({
        ...prevTime,
        [day]: isHoliday ? "휴무" : "",
      }));
      setTime((prev) => ({
        ...prev,
        [day]: isHoliday ? "휴무" : "",
      }));

      return newHolidayState;
    });
  };

  return (
    <div className="flex flex-wrap gap-[10px] mt-[-10px]">
      {days.map((day) => (
        <div key={day} className="flex flex-col items-center">
          <div className="w-full flex items-center justify-between">
            <label className="mb-[4px] font-medium text-[14px]">{day}</label>
            <label className="text-[12px] mt-1">
              <input
                type="checkbox"
                checked={holidayDays[day]}
                onChange={() => toggleHoliday(day)}
                className="mr-1"
              />
              휴무
            </label>
          </div>
          <input
            type="text"
            maxLength={13}
            value={localTime[day] ?? ""}
            placeholder="09:00 ~ 21:00"
            onChange={(e) => handleInputChange(e, day)}
            disabled={holidayDays[day]}
            className={`w-[120px] h-[30px] border rounded-[3px] text-center focus:outline-none ${
              holidayDays[day] ? "bg-gray-200 text-gray-400" : "border-gray-450"
            }`}
          />
        </div>
      ))}
    </div>
  );
}

export default TimeInput;
