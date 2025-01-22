import type { SVGProps } from "react";
const SvgArrowUp = (props: SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 10" {...props}>
    <path stroke="#BABABA" strokeLinecap="round" strokeWidth={2} d="m1 9 7.5-7L16 9" />
  </svg>
);
export default SvgArrowUp;
