import React from 'react';

export type RectangleProps = React.SVGProps<SVGRectElement>;

const Rectangle = (props: RectangleProps) => {
  return (
    <svg x={props.x} y={props.y} width={props.width} height={props.height}>
      <rect {...props} preserveAspectRatio="none" x={0} y={0} />
    </svg>
  );
};

export default Rectangle;
