import { useGetPassInfo } from "../../apis/usepass/quries/useUsepassApi";
import AvailableList from "./AvailableList";
import CompletedList from "./CompletedList";
import IcNoUsePass from "../../assets/svg/IcNoUsePass";
import { TFitness } from "../../type/fitnessCard";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

type PassData = {
  none: TFitness[];
  progress: TFitness[];
  done: TFitness[];
};

function UsePass() {
  const { data, isLoading, isError } = useGetPassInfo();

  const [hasAvailablePass, setHasAvailablePass] = useState(false);
  const [hasCompletedPass, setHasCompletedPass] = useState(false);
  const [passData, setPassData] = useState<PassData>({ none: [], progress: [], done: [] });
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
      setPassData({ none: [], progress: [], done: [] });
    }
  }, [data]);

  useEffect(() => {
    if (passData) {
      const availablePasses = [
        ...passData.none.filter((pass) => pass.status === "NONE"),
        ...passData.progress.filter((pass) => pass.status === "PROGRESS"),
      ];

      setHasAvailablePass(availablePasses.length > 0);
      setHasCompletedPass(passData.done.length > 0);
    }
  }, [passData]);

  if (isLoading) return <div></div>;

  if (isError) return <div>오류 : {isError}</div>;

  // passData가 없으면 빈 배열을 기본값으로 설정
  const availablePasses = [
    ...passData?.none.filter((pass) => pass.status === "NONE") || [],
    ...passData?.progress.filter((pass) => pass.status === "PROGRESS") || [],
  ];

  const updatePassStatus = (passId: number|undefined, newStatus: string) => {
    setPassData((prevPassData) => {
      const updatedPassData = { ...prevPassData };
      const allPasses = [...updatedPassData.none, ...updatedPassData.progress, ...updatedPassData.done];
      const updatedPasses = allPasses.map((pass) => 
        pass.id === passId ? { ...pass, status: newStatus } : pass
      );
      
      updatedPassData.none = updatedPasses.filter((pass) => pass.status === "NONE");
      updatedPassData.progress = updatedPasses.filter((pass) => pass.status === "PROGRESS");
      updatedPassData.done = updatedPasses.filter((pass) => pass.status === "DONE");
      
      return updatedPassData;
    });
  };

  return (
    <div className="bg-gray-300 min-h-screen item-center">
      {hasAvailablePass || hasCompletedPass ? (
        <>
          {hasAvailablePass && availablePasses.length > 0 && (
            <AvailableList passes={availablePasses} updatePassStatus={updatePassStatus} />
          )}
          {hasCompletedPass && passData?.done.length > 0 && (
            <CompletedList passes={passData.done} />
          )}
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
