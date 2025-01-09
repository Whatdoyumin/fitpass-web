import { Link } from "react-router-dom";

interface EditProfileCommonProps {
  text: string;
  linkTo: string;
}

const EditProfileCommon = ({ text, linkTo }: EditProfileCommonProps) => {
  return (
    <div className="flex flex-col">
      <p className="text-gray-800 text-[16px] font-medium" style={{ lineHeight: '19px' }}>
        {text}
      </p>
      <div className="h-[15px]" />
      <Link to={linkTo}>
        <button className="w-[320px] h-[51px] bg-blue-500 text-white-100 rounded-lg text-[15px] font-bold">
          {text} 하기
        </button>
      </Link>
    </div>
  );
};

export default EditProfileCommon;
