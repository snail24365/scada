import { XY } from '@/types/type';
import React from 'react';

export type CircleProps = React.SVGProps<SVGCircleElement>;

const Circle = (props: CircleProps & { width: number; height: number } & XY & { strokeWidth?: number }) => {
  const { width, height, fill, x, y } = props;
  const strokeWidth = props.strokeWidth ?? 0;
  const cx = width / 2;
  const cy = height / 2;
  const r = Math.max(Math.min(width / 2, height / 2) - strokeWidth, 0);

  return (
    <svg x={props.x} y={props.y} width={props.width} height={props.height}>
      <circle {...props} cx={cx} cy={cy} r={r} fill={fill} />
    </svg>
  );
};

export default Circle;
