import { useGetPassInfo } from "../../apis/usepass/quries/useUsepassApi";
import AvailableList from "./AvailableList";
import CompletedList from "./CompletedList";
import IcNoUsePass from "../../assets/svg/IcNoUsePass";
import { TFitness } from "../../types/fitnessCard";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

type PassData = {
  none: TFitness[];
  progress: TFitness[];
  done: TFitness[];
  reviewed: TFitness[];
};

function UsePass() {
  const { data, isLoading, isError } = useGetPassInfo();

  const [hasAvailablePass, setHasAvailablePass] = useState(false);
  const [hasCompletedPass, setHasCompletedPass] = useState(false);
  const [passData, setPassData] = useState<PassData>({
    none: [],
    progress: [],
    done: [],
    reviewed: [],
  });
  const navigate = useNavigate();

  useEffect(() => {
    const authToken = sessionStorage.getItem("accessToken");
    if (!authToken) {
      navigate("/signin");
    }
  }, [navigate]);

  useEffect(() => {
    if (data?.isSuccess) {
      setPassData(data.result);
    } else {
      setPassData({ none: [], progress: [], done: [], reviewed: [] });
    }
  }, [data]);

  useEffect(() => {
    if (passData) {
      const availablePasses = [
        ...passData.none.filter((pass) => pass.status === "NONE"),
        ...passData.progress.filter((pass) => pass.status === "PROGRESS"),
      ];

      setHasAvailablePass(availablePasses.length > 0);
      setHasCompletedPass(passData.done.length > 0 || passData.reviewed.length > 0);
    }
  }, [passData]);

  if (isLoading) return <div></div>;

  if (isError) return <div>오류 : {isError}</div>;

  // passData가 없으면 빈 배열을 기본값으로 설정
  const availablePasses = [
    ...(passData?.none.filter((pass) => pass.status === "NONE") || []),
    ...(passData?.progress.filter((pass) => pass.status === "PROGRESS") || []),
  ];
  const completedPasses = [
    ...(passData?.done.filter((pass) => pass.status === "DONE") || []),
    ...(passData?.reviewed.filter((pass) => pass.status === "REVIEWED") || []),
  ];

  const updatePassStatus = (passId: number | undefined, newStatus: string) => {
    setPassData((prevPassData) => {
      const updatedPassData = { ...prevPassData };
      const allPasses = [
        ...updatedPassData.none,
        ...updatedPassData.progress,
        ...updatedPassData.done,
        ...updatedPassData.reviewed,
      ];
      const updatedPasses = allPasses.map((pass) =>
        pass.id === passId ? { ...pass, status: newStatus } : pass
      );

      updatedPassData.none = updatedPasses.filter((pass) => pass.status === "NONE");
      updatedPassData.progress = updatedPasses.filter((pass) => pass.status === "PROGRESS");
      updatedPassData.done = updatedPasses.filter((pass) => pass.status === "DONE");
      updatedPassData.reviewed = updatedPasses.filter((pass) => pass.status === "REVIEWED");

      return updatedPassData;
    });
  };

  return (
    <div className="bg-gray-300 min-h-[calc(100vh-165px)] item-center">
      {hasAvailablePass || hasCompletedPass ? (
        <>
          <AvailableList passes={availablePasses} updatePassStatus={updatePassStatus} />
          {hasCompletedPass && completedPasses.length > 0 && (
            <CompletedList passes={completedPasses} />
          )}
        </>
      ) : (
        <div className="flex justify-center items-center  min-h-[calc(100vh-165px)]">
          <IcNoUsePass width="158px" height="calc(100vh - 165px)" />
        </div>
      )}
    </div>
  );
}

export default UsePass;
