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
      <path d="M4.5 9.5h-3a1 1 0 0 1-1-1v-7a1 1 0 0 1 1-1h10a1 1 0 0 1 1 1V5" />
      <path d="M.5 1.76 6.5 6l6-4.24M10 8.991c1.17-2.595 3.5-1.293 3.5.651 0 2.555-3.5 3.858-3.5 3.858s-3.5-1.303-3.5-3.908c0-1.944 2.33-3.246 3.5-.601" />
    </g>
  </svg>
)
export default SvgComponent
