import type { SVGProps } from "react";
const SvgFitnessFilled = (props: SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 31 18" {...props}>
    <path
      stroke="#2196F3"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M.5 9.429h1.667M28.834 9.429H30.5"
    />
    <rect width={3.333} height={12} x={3} y={3.429} fill="#2196F3" rx={1.667} />
    <rect width={3.333} height={12} x={24.666} y={3.429} fill="#2196F3" rx={1.667} />
    <rect width={5.833} height={18} x={7.167} fill="#2196F3" rx={2.917} />
    <rect width={5.833} height={18} x={18} fill="#2196F3" rx={2.917} />
    <path stroke="#2196F3" strokeLinejoin="round" strokeWidth={2} d="M13 9.429h5" />
  </svg>
);
export default SvgFitnessFilled;
