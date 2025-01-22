import { ShareIcon } from "../../assets/svg";

const Share = () => {
  return(
    <>
      <button className="bg-white-100 w-[29px] h-[29px] rounded-full shadow-md flex justify-center items-center">
        <ShareIcon className="w-[13px] h-[13px] " />
      </button>
    </>
  );
}

export default Share;