import { BBox, TextComponent } from '@/types/type';
import React, { useState } from 'react';

export type TextProps = TextComponent;

const Text = ({ x, y, width, height, text }: TextProps) => {
  text = text || '';

  const [textState, setTextState] = useState(text);

  return (
    <svg x={x} y={y} width={width} height={height} pointerEvents={'none'}>
      <foreignObject width="100%" height="100%" css={{ border: '1px dashed silver' }}>
        <div style={{ pointerEvents: 'all', width, height }}>
          <p>{textState}</p>
        </div>
      </foreignObject>
    </svg>
  );
};

export default Text;
