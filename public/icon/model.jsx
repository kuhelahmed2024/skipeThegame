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
      d="M28.447 16.105 23 13.383V7a1 1 0 0 0-.553-.894l-6-3a1 1 0 0 0-.894 0l-6 3A1 1 0 0 0 9 7v6.382l-5.447 2.723A1 1 0 0 0 3 17v7a1 1 0 0 0 .553.894l6 3a1.001 1.001 0 0 0 .894 0L16 25.119l5.553 2.777a1.001 1.001 0 0 0 .894 0l6-3A1 1 0 0 0 29 24v-7a1 1 0 0 0-.553-.895ZM21 13.383l-4 2v-4.764l4-2Zm-5-8.264L19.764 7 16 8.882 12.236 7Zm-5 3.5 4 2v4.764l-4-2ZM9 25.382l-4-2v-4.764l4 2Zm1-6.5L6.236 17 10 15.118 13.764 17Zm1 1.736 4-2v4.764l-4 2Zm10 4.764-4-2v-4.764l4 2Zm1-6.5L18.236 17 22 15.118 25.764 17Zm5 4.5-4 2v-4.764l4-2Z"
    />
  </svg>
)
export default SvgComponent
