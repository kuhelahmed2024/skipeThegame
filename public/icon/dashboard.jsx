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
      fill="currentColor"
      d="M13.5 9V4H20v5h-6.5ZM4 12V4h6.5v8H4Zm9.5 8v-8H20v8h-6.5ZM4 20v-5h6.5v5H4Zm1-9h4.5V5H5v6Zm9.5 8H19v-6h-4.5v6Zm0-11H19V5h-4.5v3ZM5 19h4.5v-3H5v3Zm4.5-8Zm5-3Zm0 5Zm-5 3Z"
    />
  </svg>
)
export default SvgComponent
