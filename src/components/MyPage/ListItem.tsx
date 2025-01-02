import { Link } from "react-router-dom";

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
          <Icon className="w-[24px] h-[24px] mr-[15px]" /> {/* 아이콘 컴포넌트를 직접 렌더링 */}
          <span className="text-16px">{name}</span>
        </div>
        <span className="ml-auto">{'>'}</span>
      </Link>
    </div>
  );
};

export default ListItem;
