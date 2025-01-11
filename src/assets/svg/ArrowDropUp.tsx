import * as React from "react";
import type { SVGProps } from "react";
const SvgArrowDropUp = (props: SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20" {...props}>
    <mask
      id="arrow_drop_up_svg__a"
      width={20}
      height={20}
      x={0}
      y={0}
      maskUnits="userSpaceOnUse"
      style={{
        maskType: "alpha",
      }}
    >
      <path fill="#D9D9D9" d="M0 0h20v20H0z" />
    </mask>
    <g mask="url(#arrow_drop_up_svg__a)">
      <path fill="#333" d="M10 7l5 5H5l5-5z" />
    </g>
  </svg>
);
export default SvgArrowDropUp;
