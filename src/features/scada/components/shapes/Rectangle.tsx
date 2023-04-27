import React from 'react';

export type RectangleProps = React.SVGProps<SVGRectElement>;

const Rectangle = (props: RectangleProps) => {
  console.log(props);
  return <rect {...props} />;
};

export default Rectangle;
