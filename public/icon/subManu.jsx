import * as React from "react"
const SvgComponent = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={20}
    height={20}
    viewBox="0 0 24 24"
    {...props}
  >
    <path
      fill="none"
      stroke="currentColor"
      strokeLinejoin="round"
      d="m12 3 3 3-3 3-3-3 3-3Zm0 12 3 3-3 3-3-3 3-3Zm6-6 3 3-3 3-3-3 3-3ZM6 9l3 3-3 3-3-3 3-3Z"
    />
  </svg>
)
export default SvgComponent
