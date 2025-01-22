import type { SVGProps } from "react";
const SvgCloseIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 16 16" {...props}>
    <path
      stroke="#838383"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M1 15 15 1M1 1l14 14"
    />
  </svg>
);
export default SvgCloseIcon;
