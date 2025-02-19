interface IManagementInput {
  value: string;
  onChange: React.ChangeEventHandler<HTMLInputElement>;
}

const ManagementInput = ({ value, onChange }: IManagementInput) => {
  return (
    <input
      type="number"
      value={value}
      onChange={onChange}
      className="border border-gray-450 rounded-5 p-1 w-32"
    />
  );
};

export { ManagementInput };
