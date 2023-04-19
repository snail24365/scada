import React, { CSSProperties } from 'react';
import { ClientRect } from '../../type';

export type RectangleProps = { fill?: string } & ClientRect;

const Rectangle = ({ width, height, x, y, fill }: RectangleProps) => {
  return <rect x={x} y={y} width={width} height={height} fill={fill} />;
};

export default Rectangle;
