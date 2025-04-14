import SvgIcLeftPage from "../assets/svg/IcLeftPage";
import SvgIcRightPage from "../assets/svg/IcRightPage";

interface PaginationProps {
  totalPages: number;
  currentPage: number;
  onPageChange: (page: number) => void;
}

const Pagination = ({ totalPages, currentPage, onPageChange }: PaginationProps) => {
  return (
    <div className="w-full flex justify-center items-center pt-[25px] gap-[10px]">
      <button
        onClick={() => currentPage > 0 && onPageChange(currentPage - 1)}
        disabled={currentPage === 0}
        className="text-gray-350 focus:outline-none"
      >
        <SvgIcLeftPage width={5} />
      </button>

      {Array.from({ length: totalPages }, (_, index) => (
        <button
          key={index}
          onClick={() => onPageChange(index)}
          className={`text-sm ${
            currentPage === index ? "text-gray-600" : "text-gray-350"
          } focus:outline-none`}
        >
          {index + 1}
        </button>
      ))}

      <button
        onClick={() => currentPage < totalPages - 1 && onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages - 1}
        className="text-gray-350 focus:outline-none"
      >
        <SvgIcRightPage width={5} />
      </button>
    </div>
  );
};

export { Pagination };
