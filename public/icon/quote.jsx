import * as React from "react"
const SvgComponent = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={15}
    height={15}
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
      <path d="M21.25 12a9.226 9.226 0 0 1-2.705 6.54A9.251 9.251 0 0 1 12 21.25a9.189 9.189 0 0 1-3.795-.81l-3.867.572a1.195 1.195 0 0 1-1.361-1.43l.537-3.923A8.943 8.943 0 0 1 2.75 12a9.228 9.228 0 0 1 2.705-6.54A9.25 9.25 0 0 1 12 2.75a9.26 9.26 0 0 1 6.545 2.71A9.236 9.236 0 0 1 21.25 12" />
      <path d="m7.88 11.887 2.319 2.32a.875.875 0 0 0 1.248 0l4.673-4.674" />
    </g>
  </svg>
)
export default SvgComponent
