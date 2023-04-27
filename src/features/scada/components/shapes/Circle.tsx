import { XY } from '@/types/type';
import React from 'react';

export type CircleProps = React.SVGProps<SVGCircleElement>;

const Circle = (props: CircleProps & { width: number; height: number } & XY) => {
  const { width, height, fill, x, y } = props;
  const cx = width / 2 + x;
  const cy = height / 2 + y;
  const r = Math.min(width / 2, height / 2);

  return (
    <g width={width} height={height} viewBox={`${cx-r} ${cy-r} ${cx+r} ${cy+4}`}>
      <circle {...props} cx={cx} cy={cy} r={r} fill={fill}  />
    </g>
  );
};

export default Circle;
