import ListItem from "./ListItem";

interface SectionProps {
  title: string;
  items: {
    icon: (props: React.SVGProps<SVGSVGElement>) => JSX.Element;
    name: string;
    path: string;
    onClick?: () => void;
  }[];
}

const SectionComponent = ({ title, items }: SectionProps) => {
  return (
    <div className="w-full bg-white-100 px-[25px] py-[26px] mt-2">
      <h2 className="text-18px font-bold mb-[11px] text-black-700">{title}</h2>
      {items.map((item) => (
        <ListItem
          key={item.name}
          icon={item.icon}
          name={item.name}
          path={item.path}
          onClick={item.onClick} 
        />
      ))}
    </div>
  );
};

export default SectionComponent;
