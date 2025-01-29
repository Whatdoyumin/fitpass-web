import { useState } from "react";
import AvailableList from "./AvailableList";
import CompletedList from "./CompletedList";
import IcNoUsePass from "../../assets/svg/IcNoUsePass";

function UsePass() {
  const [hasAvailablePass] = useState(true);  // true로 설정하면 패스 있음
  const [hasCompletedPass] = useState(true); // false로 설정하면 완료된 패스 없음

  return (
    <div className="bg-gray-300 min-h-[629px]">
      {hasAvailablePass || hasCompletedPass ? (
        <>
          {hasAvailablePass && <AvailableList />}
          {hasCompletedPass && <CompletedList />}
        </>
      ) : (
        <div className="flex justify-center items-center h-full">
          <IcNoUsePass width="158px" />
        </div>
      )}
    </div>
  );
}

export default UsePass;
