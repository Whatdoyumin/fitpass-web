import * as React from "react";
import type { SVGProps } from "react";
const SvgMaskGroup = (props: SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 33 32" {...props}>
    <mask
      id="Mask_group_svg__a"
      width={33}
      height={32}
      x={0}
      y={0}
      maskUnits="userSpaceOnUse"
      style={{
        maskType: "alpha",
      }}
    >
      <path fill="#D9D9D9" d="M.5 0h32v32H.5z" />
    </mask>
    <g mask="url(#Mask_group_svg__a)">
      <path
        stroke="#2196F3"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M1.5 16.429h1.667M29.834 16.429H31.5"
      />
      <rect width={3.333} height={12} x={4} y={10.429} fill="#2196F3" rx={1.667} />
      <rect width={3.333} height={12} x={25.666} y={10.429} fill="#2196F3" rx={1.667} />
      <rect width={5.833} height={18} x={8.166} y={7} fill="#2196F3" rx={2.917} />
      <rect width={5.833} height={18} x={19} y={7} fill="#2196F3" rx={2.917} />
      <path stroke="#2196F3" strokeLinejoin="round" strokeWidth={2} d="M14 16.429h5" />
    </g>
  </svg>
);
export default SvgMaskGroup;
