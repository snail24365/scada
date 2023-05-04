import { TextProperty } from '@/types/schema';
import { BBox } from '@/types/type';
import React, { useState } from 'react';

export type TextProps = TextProperty & BBox;

const Text = (props: TextProps) => {
  const { x, y, width, height } = props;
  const text = props.text || '';

  const [textState, setTextState] = useState(text);

  return (
    <svg x={x} y={y} width={width} height={height} pointerEvents={'none'}>
      <foreignObject width="100%" height="100%">
        <div style={{ pointerEvents: 'all', width, height }}>
          <p css={{ ...props }}>{textState}</p>
        </div>
      </foreignObject>
    </svg>
  );
};

export default Text;
