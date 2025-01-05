import { Link } from "react-router-dom";
import IcRightArrow from "../../assets/svg/IcRightArrow";

interface ListItemProps {
  icon: (props: React.SVGProps<SVGSVGElement>) => JSX.Element;
  name: string;
  path: string;
}

const ListItem = ({ icon: Icon, name, path }: ListItemProps) => {
  return (
    <div className="flex items-center py-[14px]">
      <Link to={path} className="flex justify-between items-center w-full">
        <div className="flex items-center">
          <Icon className="w-[24px] h-[24px] mr-[15px]" />
          <span className="text-16px">{name}</span>
        </div>
        <IcRightArrow className="ml-auto w-[16px] h-[16px]" />
      </Link>
    </div>
  );
};

export default ListItem;
