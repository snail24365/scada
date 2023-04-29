import { primaryBlue } from '@/assets/color';
import { BoxState } from '@/types/type';
import React, { useContext } from 'react';
import { WithBoxEditContext } from './WithBoxEditContext';

const Frame = ({ width, height, x, y, uuid }: BoxState) => {
  const { isBoxEditing: isEditing } = useContext(WithBoxEditContext);
  const strokeDasharray = isEditing ? '0 0' : '4 4';
  const stroke = isEditing ? primaryBlue : '#888';
  const strokeWidth = isEditing ? 2 : 1;
  return (
    <rect
      strokeDasharray={strokeDasharray}
      x={x}
      y={y}
      width={width}
      height={height}
      fill="transparent"
      stroke={stroke}
      strokeWidth={strokeWidth}
    />
  );
};

export default Frame;
