import * as React from "react";
import type { SVGProps } from "react";
const SvgIcCloseBtn = (props: SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 15" {...props}>
    <path
      stroke="#838383"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="m1 13.5 12-12m-12 0 12 12"
    />
  </svg>
);
export default SvgIcCloseBtn;
