import type { SVGProps } from "react";
const SvgIfacilities = (props: SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 80 80" {...props}>
    <rect width={72} height={72} x={4} y={4} fill="#D5D5D5" rx={36} />
    <path
      fill="#F7F7F7"
      d="M22.3 36h35.4c1.269 0 2.3-1.031 2.3-2.3a2.3 2.3 0 0 0-.388-1.275l-4.719-7.087A2.99 2.99 0 0 0 52.399 24H27.607c-1 0-1.937.5-2.494 1.337l-4.725 7.082A2.303 2.303 0 0 0 22.3 36m1.7 2v15c0 1.656 1.345 3 3.001 3h14.002c1.657 0 3-1.344 3-3V38h-4v10H28.001V38zm28.005 0v16c0 1.106.894 2 2 2 1.107 0 2-.894 2-2V38z"
    />
  </svg>
);
export default SvgIfacilities;
