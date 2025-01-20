import type { SVGProps } from "react";
const SvgIcNotice = (props: SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" {...props}>
    <mask
      id="ic_notice_svg__a"
      width={24}
      height={24}
      x={0}
      y={0}
      maskUnits="userSpaceOnUse"
      style={{
        maskType: "alpha",
      }}
    >
      <path fill="#D9D9D9" d="M0 0h24v24H0z" />
    </mask>
    <g mask="url(#ic_notice_svg__a)">
      <path
        stroke="#9F9F9F"
        strokeLinecap="round"
        d="m17.209 16.627 3.41 3.53M17.209 7.046l3.41-3.53M17.209 12.089h4.385"
      />
      <mask id="ic_notice_svg__b" fill="#fff">
        <path
          fillRule="evenodd"
          d="M9.04 15.773a.5.5 0 0 0-.362-.154H3.094a.5.5 0 0 1-.5-.5v-6.06a.5.5 0 0 1 .5-.5h5.584a.5.5 0 0 0 .362-.155l4.384-4.585a.5.5 0 0 1 .862.345v15.85a.5.5 0 0 1-.862.345z"
          clipRule="evenodd"
        />
      </mask>
      <path
        fill="#9F9F9F"
        fillRule="evenodd"
        d="M9.04 15.773a.5.5 0 0 0-.362-.154H3.094a.5.5 0 0 1-.5-.5v-6.06a.5.5 0 0 1 .5-.5h5.584a.5.5 0 0 0 .362-.155l4.384-4.585a.5.5 0 0 1 .862.345v15.85a.5.5 0 0 1-.862.345z"
        clipRule="evenodd"
      />
      <path
        fill="#9F9F9F"
        d="M14.286 20.014h1zm-.862.345.723-.69zm.862-16.195h1zM9.04 15.774l.722-.692zm-.362-1.155H3.094v2h5.584zm-5.084.5v-6.06h-2v6.06zm-.5-5.56h5.584v-2H3.094zm6.668-.463 4.385-4.586-1.445-1.383-4.385 4.586zm3.524-4.932v15.85h2V4.164zm.861 15.504-4.385-4.586-1.445 1.383 4.385 4.585zm-.861.346a.5.5 0 0 1 .861-.346l-1.445 1.382c.934.978 2.584.316 2.584-1.036zm.861-15.504a.5.5 0 0 1-.861-.346h2c0-1.353-1.65-2.014-2.584-1.037zM8.678 9.559a1.5 1.5 0 0 0 1.084-.463L8.317 7.713a.5.5 0 0 1 .361-.154zm-5.084-.5a.5.5 0 0 1-.5.5v-2a1.5 1.5 0 0 0-1.5 1.5zm-.5 5.56a.5.5 0 0 1 .5.5h-2a1.5 1.5 0 0 0 1.5 1.5zm5.584 2a.5.5 0 0 1-.361-.154l1.445-1.383a1.5 1.5 0 0 0-1.084-.463z"
        mask="url(#ic_notice_svg__b)"
      />
    </g>
  </svg>
);
export default SvgIcNotice;
