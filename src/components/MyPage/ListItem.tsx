import { Link } from "react-router-dom";

interface ListItemProps {
  icon: string;
  name: string;
  path: string;
}

const ListItem = ({ icon, name, path }: ListItemProps) => {
  return (
    <div className="flex items-center py-[14px]">
      <Link to={path} className="flex justify-between items-center w-full">
        <div className="flex items-center">
          <img src={icon} alt={''} className="w-[24px] h-[24px] mr-[15px]" />
          <span className="text-16px">{name}</span>
        </div>
        <span className="ml-auto">{'>'}</span>
      </Link>
    </div>
  );
};

export default ListItem;
