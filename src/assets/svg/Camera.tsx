import type { SVGProps } from "react";
const SvgCamera = (props: SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 19 19" {...props}>
    <circle cx={9.5} cy={9.5} r={9} fill="#9F9F9F" stroke="#fff" />
    <rect width={12.294} height={7.824} x={3.293} y={6.402} fill="#fff" rx={1} />
    <rect width={7} height={3} x={5.941} y={4.813} fill="#fff" rx={1} />
    <circle cx={9.44} cy={10.313} r={1.676} fill="#9F9F9F" />
  </svg>
);
export default SvgCamera;
