import ListItem from "./ListItem";

interface SectionProps {
  title: string;
  items: { icon: string, name: string, path: string }[];
}

const SectionComponent = ({ title, items }: SectionProps) => {
  return (
    <div className="w-full bg-white px-[25px] py-[26px] mt-4">
      <h2 className="text-18px font-bold mb-4">{title}</h2>
      {items.map((item) => (
        <ListItem
          key={item.name}
          icon={item.icon}
          name={`${item.name}`} 
          path={item.path}
        />
      ))}
    </div>
  );
};

export default SectionComponent;
