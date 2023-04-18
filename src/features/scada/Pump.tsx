import React, { useEffect } from 'react';
import gsap from 'gsap';
import { ClientRect } from '../../type';
type Props = {} & ClientRect;

const Pump = ({ width, height, x, y }: Props) => {
  const viewboxW = 300;
  const viewboxH = 200;
  return (
    <svg width={width} height={height} x={x} y={y} viewBox={`0 0 ${viewboxW} ${viewboxH}`}>
      <defs>
        <linearGradient id="margin-gradient">
          <stop offset="0%" stopColor="#666666" />
          <stop offset="50%" stopColor="#ffffff" />
          <stop offset="100%" stopColor="#7d7d7d" />
        </linearGradient>
      </defs>
      <g>
        <rect x="0" y="0" width={viewboxW} height="20" fill="url(#margin-gradient)" />
        <rect x="20" y="20" width="260" height="180" fill="#ceeaff" stroke="silver" strokeWidth={5} />
        <rect x="0" y="200" width={viewboxW} height="20" fill="url(#margin-gradient)" />
        <text dx="-30%" x="50%" y="50%" fill="white" fontSize={100}>
          SVG
        </text>
      </g>
    </svg>
  );
};

export default Pump;
