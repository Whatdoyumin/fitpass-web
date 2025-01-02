import * as React from "react";
import type { SVGProps } from "react";
const SvgPass = (props: SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 28 16" {...props}>
    <path fill="#F5F5F5" d="M0 0h28v16H0z" />
    <path
      fill="#D3D3D3"
      d="M-877-979a2 2 0 0 1 2-2h2658c1.1 0 2 .895 2 2V270c0 1.105-.9 2-2 2H-875a2 2 0 0 1-2-2z"
    />
    <path
      fill="#000"
      fillOpacity={0.1}
      d="M-875-980h2658v-2H-875zm2659 1V270h2V-979zm-1 1250H-875v2h2658zm-2659-1V-979h-2V270zm1 1a1 1 0 0 1-1-1h-2a3 3 0 0 0 3 3zm2659-1c0 .552-.45 1-1 1v2c1.66 0 3-1.343 3-3zm-1-1250c.55 0 1 .448 1 1h2c0-1.657-1.34-3-3-3zm-2658-2a3 3 0 0 0-3 3h2a1 1 0 0 1 1-1z"
    />
    <g clipPath="url(#pass_svg__a)">
      <path fill="#fff" d="M-227-813h390V71h-390z" />
      <path
        fill="#F7F7F7"
        d="M-227-461c0-8.284 6.716-15 15-15h360c8.284 0 15 6.716 15 15V71h-390z"
      />
      <path fill="#fff" d="M-227-15h390v86h-390z" />
      <path fill="#fff" d="M-227-15h390v86h-390z" />
      <path
        fill="#BABABA"
        fillRule="evenodd"
        d="M27.5 0H.5v5.333c1.316 0 2.382 1.194 2.382 2.667S1.816 10.667.5 10.667V16h27v-5.333c-1.316 0-2.382-1.194-2.382-2.667s1.066-2.667 2.382-2.667zM8.516 1.684a.421.421 0 1 0 0-.843.421.421 0 0 0 0 .843m.421 1.263a.421.421 0 1 1-.842 0 .421.421 0 0 1 .842 0m-.421 2.106a.421.421 0 1 0 0-.843.421.421 0 0 0 0 .843m.421 1.263a.421.421 0 1 1-.842-.001.421.421 0 0 1 .842 0M8.516 8.42a.421.421 0 1 0 0-.843.421.421 0 0 0 0 .843m.421 1.263a.421.421 0 1 1-.842 0 .421.421 0 0 1 .842 0m-.421 2.106a.421.421 0 1 0 0-.843.421.421 0 0 0 0 .843m.421 1.263a.421.421 0 1 1-.842-.001.421.421 0 0 1 .842 0m-.421 2.105a.421.421 0 1 0 0-.843.421.421 0 0 0 0 .843"
        clipRule="evenodd"
      />
    </g>
    <defs>
      <clipPath id="pass_svg__a">
        <path fill="#fff" d="M-227-813h390V71h-390z" />
      </clipPath>
    </defs>
  </svg>
);
export default SvgPass;
