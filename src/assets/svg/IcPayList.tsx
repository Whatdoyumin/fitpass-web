import * as React from "react";
import type { SVGProps } from "react";
const SvgIcPayList = (props: SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" {...props}>
    <rect width={20} height={20} x={2} y={2} fill="#9F9F9F" rx={2} />
    <path stroke="#fff" strokeLinecap="round" d="M6 7h2M11 7h7M6 11h2M11 11h7M6 15h2M11 15h7" />
  </svg>
);
export default SvgIcPayList;
