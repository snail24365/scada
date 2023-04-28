import { BBox } from '@/types/type';
import { EditableText } from '@blueprintjs/core';
import React from 'react';

export type BasicTextProps = React.SVGProps<SVGTextElement> &
  BBox & {
    text?: string;
    // placeholder?: string;
  };

const BasicText = (props: BasicTextProps) => {
  const { x, y, width, height } = props;
  const text = props.text || 'Text';
  return (
    <svg x={x} y={y} width={width} height={height} viewBox={`0 0 ${width} ${height}`} z={100}>
      <g transform={'scale(1)'}>
        <foreignObject x="0" y="0" width="100" height="400">
          <EditableText multiline={true} minLines={3} maxLines={12} placeholder={'Type here'} />
        </foreignObject>
      </g>
    </svg>
  );
};

export default BasicText;
