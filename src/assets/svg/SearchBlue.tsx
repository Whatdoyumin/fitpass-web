import * as React from "react";
import type { SVGProps } from "react";
const SvgSearchBlue = (props: SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 26 26" {...props}>
    <mask
      id="search_blue_svg__a"
      width={26}
      height={26}
      x={0}
      y={0}
      maskUnits="userSpaceOnUse"
      style={{
        maskType: "alpha",
      }}
    >
      <path fill="#D9D9D9" d="M0 0h26v26H0z" />
    </mask>
    <g stroke="#2196F3" strokeWidth={2} mask="url(#search_blue_svg__a)">
      <path d="M19.125 10.426c0 3.935-3.275 7.166-7.367 7.166s-7.367-3.231-7.367-7.166c0-3.934 3.275-7.165 7.367-7.165s7.367 3.23 7.367 7.165Z" />
      <path strokeLinecap="round" d="m16.926 15.95 6.398 6.244" />
    </g>
  </svg>
);
export default SvgSearchBlue;
