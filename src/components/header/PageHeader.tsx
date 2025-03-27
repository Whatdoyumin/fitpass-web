import { BackIcon } from "../../assets/svg";

interface PageHeaderProps {
  pageName?: string;
}

export const PageHeader = ({ pageName }: PageHeaderProps) => {
  return (
    <div className="w-full h-[27px] flex items-center justify-center relative border-b-2 border-gray-300 pb-8">
      <BackIcon
        width={"11px"}
        className="absolute left-0 cursor-pointer ml-3"
        onClick={() => window.history.back()}
      />
      <p className="text-18px text-black-700 font-bold">{pageName}</p>
    </div>
  );
};
