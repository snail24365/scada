import { BoxEntityProps } from '@/type';
import React, { useContext } from 'react';
import { WithBoxEditContext } from './WithBoxEditContext';

const Frame = ({ width, height, x, y, uuid }: BoxEntityProps) => {
  const { isBoxEditing: isEditing } = useContext(WithBoxEditContext);
  const strokeDasharray = isEditing ? '0 0' : '4 4';
  const stroke = isEditing ? 'red' : 'blue';
  return (
    <rect
      strokeDasharray={strokeDasharray}
      x={x}
      y={y}
      width={width}
      height={height}
      fill="transparent"
      stroke={stroke}
      strokeWidth={1}
    />
  );
};

export default Frame;
