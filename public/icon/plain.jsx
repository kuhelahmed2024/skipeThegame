import * as React from "react"
const SvgComponent = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={20}
    height={20}
    viewBox="0 0 14 14"
    {...props}
  >
    <path
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M3.33 10.67H1.88a1.45 1.45 0 0 1 0-2.89h2.3L5.66 6.3 1.6 3.8a1.45 1.45 0 0 1-.52-1.91 1.47 1.47 0 0 1 2-.77l5.3 2.45L10.94.98a1.47 1.47 0 1 1 2.08 2.08l-2.59 2.56 2.45 5.35a1.458 1.458 0 0 1-.77 1.95 1.45 1.45 0 0 1-1.91-.52L7.7 8.34 6.22 9.82v2.3a1.45 1.45 0 0 1-2.89 0z"
    />
  </svg>
)
export default SvgComponent
