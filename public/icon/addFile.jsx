import * as React from "react"
const SvgComponent = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={20}
    height={20}
    viewBox="0 0 14 14"
    {...props}
  >
    <g
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m13.5 8.5-4.71 4.71-2.13.29.3-2.13 4.7-4.71zm-9.219 5H1.8a1.3 1.3 0 0 1-1.3-1.3V1.8A1.3 1.3 0 0 1 1.8.5h10.4a1.3 1.3 0 0 1 1.3 1.3v2.95" />
      <path d="M9.014 4.795a1.25 1.25 0 1 0 0-2.5 1.25 1.25 0 0 0 0 2.5M.5 7.164a10.29 10.29 0 0 1 6.5.961" />
    </g>
  </svg>
)
export default SvgComponent
