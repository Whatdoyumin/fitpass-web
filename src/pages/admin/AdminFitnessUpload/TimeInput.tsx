import { useState } from "react";

function TimeInput() {

  const days: string[] = ["월", "화", "수", "목", "금", "토", "일"];
  const [time, setTime] = useState<{ [key: string]: string | "휴무" }>(
    Object.fromEntries(days.map((day) => [day, ": ~ :"]))
  );

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>, day: string) => {
    let value = e.target.value;

    if (value === "휴무") {
      setTime((prev) => ({ ...prev, [day]: "휴무" }));
      return;
    }

    if (value.length <= 2) {
      value = value.replace(/(\d{2})/, "$1:"); // 2자리 숫자 뒤에 : 붙임
    } else if (value.length <= 4) {
      value = value.replace(/(\d{2})(\d{2})/, "$1:$2"); // 4자리 숫자 형식
    } else if (value.length <= 6) {
      value = value.replace(/(\d{2})(\d{2})(\d{2})/, "$1:$2 ~ $3"); // 6자리 숫자 형식
    } else {
      value = value.replace(/(\d{2})(\d{2})(\d{2})(\d{2})/, "$1:$2 ~ $3:$4"); // 8자리 숫자 형식
    }

    setTime((prev) => ({...prev, [day]: value}) );

    console.log(time);
  }

  return(
    <div className="flex gap-[10px]">
      {days.map((day) => (
        <div key={day} className="flex flex-col ">
          <label>{day}</label>
          <input
            type="text"
            maxLength={13}
            value={time[day]}
            placeholder="09:00 ~ 21:00"
            onChange={(e) => handleInputChange(e, day)}
            className="w-[130px] h-[30px] border border-gray-450 rounded-[3px] text-center"
            />
        </div>
      ))}
    </div>
  );
}

export default TimeInput;