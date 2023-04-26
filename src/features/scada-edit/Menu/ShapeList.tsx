import React from 'react';

type Props = {};

const ShapeList = (props: Props) => {
  return (
    <>
      <svg
        fill="#fff"
        stroke="#000"
        strokeWidth={2}
        width={70}
        height={70}
        onMouseDown={(e) => {
          console.log(e.clientX, e.clientY);
        }}>
        <rect x={0} y={0} width={70} height={70}></rect>
      </svg>
      <svg fill="#fff" stroke="#000" strokeWidth={2} width={70} height={70}>
        <circle cx={35} cy={35} r={35}></circle>
      </svg>
      <svg width={50} height={50} fill="#fff" stroke="#000" strokeWidth={2}>
        <path d="M0 50 l 50 0 l -25 -50z"></path>
      </svg>
      <svg width={50} height={50} stroke="#fff" strokeWidth={2}>
        <path d="M50 0 L 0 50"></path>
      </svg>
      <svg width={50} height={50} stroke="#fff" strokeWidth={2} strokeDasharray="5, 5">
        <path d="M50 0 L 0 50"></path>
      </svg>
      <svg width={50} height={50} stroke="#fff" strokeWidth={2}>
        <path d="M50 0 L 0 50 l 5 -10 M 0 50 l 10 -5"></path>
      </svg>
      <svg width={50} height={50} stroke="#fff" strokeWidth={2} strokeDasharray="5, 5">
        <path d="M50 0 L 0 50 l 5 -10 M 0 50 l 10 -5"></path>
      </svg>
    </>
  );
};

export default ShapeList;
