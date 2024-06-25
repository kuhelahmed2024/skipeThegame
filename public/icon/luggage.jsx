import * as React from "react"
const SvgComponent = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={20}
    height={20}
    viewBox="0 0 32 32"
    {...props}
  >
    <path
      fill="currentColor"
      d="M10 12a1 1 0 0 1 1-1h10a1 1 0 1 1 0 2H11a1 1 0 0 1-1-1Zm1-11a1 1 0 1 0 0 2h1v2H9.5A4.5 4.5 0 0 0 5 9.5v15a4.5 4.5 0 0 0 4 4.473V30a1 1 0 1 0 2 0v-1h10v1a1 1 0 1 0 2 0v-1.027a4.5 4.5 0 0 0 4-4.473v-15A4.5 4.5 0 0 0 22.5 5h-2V3h.5a1 1 0 1 0 0-2H11Zm11.5 26h-13A2.5 2.5 0 0 1 7 24.5v-15A2.5 2.5 0 0 1 9.5 7h13A2.5 2.5 0 0 1 25 9.5v15a2.5 2.5 0 0 1-2.5 2.5Zm-4-24v2H14V3h4.5Z"
    />
  </svg>
)
export default SvgComponent
