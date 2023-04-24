import React, { CSSProperties } from 'react';
import { BBox } from '@/type';

export type RectangleProps = { fill?: string } & BBox;

const Rectangle = ({ width, height, x, y, fill }: RectangleProps) => {
  return <rect x={x} y={y} width={width} height={height} fill={fill} />;
};

export default Rectangle;
