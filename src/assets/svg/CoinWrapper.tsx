import type { SVGProps } from "react";
const SvgCoinWrapper = (props: SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 54 21" {...props}>
    <path
      fill="#3BA8FF"
      fillRule="evenodd"
      d="M9.75 0H5a5 5 0 0 0-5 5v16h9.75v-1.05a.25.25 0 1 1 .5 0V21H50a4 4 0 0 0 4-4V0H10.25v1.05a.25.25 0 1 1-.5 0zm.5 3.15a.25.25 0 1 0-.5 0v2.1a.25.25 0 0 0 .5 0zm0 4.2a.25.25 0 1 0-.5 0v2.1a.25.25 0 0 0 .5 0zm0 4.2a.25.25 0 1 0-.5 0v2.1a.25.25 0 1 0 .5 0zm0 4.2a.25.25 0 1 0-.5 0v2.1a.25.25 0 1 0 .5 0z"
      clipRule="evenodd"
    />
  </svg>
);
export default SvgCoinWrapper;
