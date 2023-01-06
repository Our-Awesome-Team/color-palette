import React from 'react'

const Locked = (props:any) => {
  return (

      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 48 48"
        width="48px"
        height="48px"
        baseProfile="basic"
      >
        <path d="M43,17H5v22c0,1.657,1.343,3,3,3h32c1.657,0,3-1.343,3-3V17z" />
        <path
          fill="#fff"
          d="M40,39H8c-1.105,0-2-0.895-2-2V16h36v21C42,38.105,41.105,39,40,39z"
        />
        <path d="M40,40H8c-1.654,0-3-1.346-3-3V16c0-0.552,0.448-1,1-1h36c0.552,0,1,0.448,1,1v21C43,38.654,41.654,40,40,40z M7,17v20	c0,0.551,0.449,1,1,1h32c0.551,0,1-0.449,1-1V17H7z" />
        <path d="M24,0c-6.065,0-11,4.935-11,11v5h2v-5c0-4.962,4.038-9,9-9s9,4.038,9,9v5h2v-5C35,4.935,30.065,0,24,0z" />
        <rect width="3" height="6" x="22" y="27" />
        <circle cx="23.5" cy="26.5" r="3.5" />
      </svg>
    
  );
}

export default Locked