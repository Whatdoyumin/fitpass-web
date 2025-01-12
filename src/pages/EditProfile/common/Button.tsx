
interface ButtonProps {
  onClick: () => void;
  type: 'button' | 'submit';
  text: string;
  disabled?: boolean;
  className?: string;
}

const Button = ({ onClick, type, text, disabled = false, className = '' }: ButtonProps) => {
  return (
    <button
      onClick={onClick}
      type={type}
      disabled={disabled}
      className={`w-full max-w-[350px] h-[51px] bg-blue-500 text-white-100 rounded-lg text-[15px] font-bold ${className}`}
    >
      {text}
    </button>
  );
};

export default Button;
