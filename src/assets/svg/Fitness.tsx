import type { SVGProps } from "react";
const SvgFitness = (props: SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 31 18" {...props}>
    <path
      stroke="#BABABA"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M.5 9.429h1.667M28.834 9.429H30.5"
    />
    <rect width={3.333} height={12} x={3} y={3.429} fill="#BABABA" rx={1.667} />
    <rect width={3.333} height={12} x={24.666} y={3.429} fill="#BABABA" rx={1.667} />
    <rect width={5.833} height={18} x={7.167} fill="#BABABA" rx={2.917} />
    <rect width={5.833} height={18} x={18} fill="#BABABA" rx={2.917} />
    <path stroke="#BABABA" strokeLinejoin="round" strokeWidth={2} d="M13 9.429h5" />
  </svg>
);
export default SvgFitness;
