import { ShapeProperty } from '@/types/schema';
import { BBox, XY } from '@/types/type';
import React from 'react';

export type TriangleProps = ShapeProperty & BBox;
const Triangle = (props: TriangleProps & BBox) => {
  const { x, y, width, height } = props;
  const p1 = { x: width / 2, y: 0 };
  const p2 = { x: width, y: height };
  const p3 = { x: 0, y: height };
  const d = `M${p1.x} ${p1.y} L${p2.x} ${p2.y} L${p3.x} ${p3.y} Z`;
  return (
    <svg x={x} y={y} width={width} height={height}>
      <path {...props} d={d} />
    </svg>
  );
};

export default Triangle;
