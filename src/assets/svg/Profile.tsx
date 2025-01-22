import type { SVGProps } from "react";
const SvgProfile = (props: SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 75 75" {...props}>
    <mask
      id="profile_svg__a"
      width={75}
      height={75}
      x={0}
      y={0}
      maskUnits="userSpaceOnUse"
      style={{
        maskType: "alpha",
      }}
    >
      <circle cx={37.5} cy={37.5} r={37.5} fill="#D9D9D9" />
    </mask>
    <g mask="url(#profile_svg__a)">
      <mask
        id="profile_svg__b"
        width={79}
        height={79}
        x={-2}
        y={-2}
        maskUnits="userSpaceOnUse"
        style={{
          maskType: "alpha",
        }}
      >
        <circle cx={37.5} cy={37.5} r={38.793} fill="#D9D9D9" />
      </mask>
      <g mask="url(#profile_svg__b)">
        <path fill="#D5D5D5" d="M-6.97-5.077h88.94v88.94H-6.97z" />
        <circle cx={37.499} cy={24.254} r={14.193} fill="#fff" />
      </g>
      <circle cx={37.5} cy={76.293} r={33.621} fill="#fff" />
    </g>
    <circle cx={37.5} cy={37.5} r={37} stroke="#D5D5D5" />
  </svg>
);
export default SvgProfile;
