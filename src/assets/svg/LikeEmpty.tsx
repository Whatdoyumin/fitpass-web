import type { SVGProps } from "react";
const SvgLikeEmpty = (props: SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 16 15" {...props}>
    <path
      stroke="#3BA8FF"
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M8 2.874s.328-.488.536-.707a3.655 3.655 0 0 1 5.355 0c1.479 1.556 1.479 4.079 0 5.635L8 14 2.11 7.802C.63 6.246.63 3.723 2.11 2.167a3.655 3.655 0 0 1 5.354 0c.208.219.536.707.536.707"
    />
  </svg>
);
export default SvgLikeEmpty;
