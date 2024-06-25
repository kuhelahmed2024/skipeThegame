import * as React from "react"
const SvgComponent = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={20}
    height={20}
    viewBox="0 0 24 24"
    {...props}
  >
    <g
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.5}
    >
      <path d="M3 13c3.6-8 14.4-8 18 0" />
      <path d="M12 17a3 3 0 1 1 0-6 3 3 0 0 1 0 6Z" />
    </g>
  </svg>
)
export default SvgComponent
