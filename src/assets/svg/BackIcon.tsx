import * as React from "react";
import type { SVGProps } from "react";
const SvgBackIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 13 20" {...props}>
    <path
      stroke="#838383"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M12 1 1 10l11 9"
    />
  </svg>
);
export default SvgBackIcon;
