import FitnessCard from "../../components/fitnessCard/FitnessCard";
import { TFitness } from "../../type/fitnessCard";

interface CompletedListProps {
  passes: TFitness[];
}

function CompletedList({ passes }: CompletedListProps) {
  return (
    <div className="bg-gray-300 px-[25px] pt-[23px] pb-[117px] z-10">
      <h1 className="text-[18px] font-bold pb-[11px]">이용 완료 패스</h1>
      <div className="flex flex-col items-center gap-[13px]">
        {passes.map((fitness) => (
          <FitnessCard key={fitness.id} fitness={[fitness]} /> 
        ))}
      </div>
    </div>
  );
}

export default CompletedList;
