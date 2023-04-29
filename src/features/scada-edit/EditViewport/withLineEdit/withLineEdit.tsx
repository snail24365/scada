import { LineState } from '@/types/type';
import React, { ComponentType } from 'react';
import EdgeControlPoint from './EdgeControlPoint';
import InnerControlWrapper from './InnerControlWrapper';

function withLineEdit<T extends LineState>(WrappedComponent: ComponentType<T>) {
  const WithEdit: React.FC<T> = (props) => {
    const { uuid: lineUUID, points } = props;
    const pointRadius = 4;
    return (
      <g>
        <WrappedComponent {...props} />
        <InnerControlWrapper points={points} uuid={lineUUID} pointRadius={pointRadius} />
        <EdgeControlPoint points={points} uuid={lineUUID} radius={pointRadius} edge="start" />
        <EdgeControlPoint points={points} uuid={lineUUID} radius={pointRadius} edge="end" />
      </g>
    );
  };

  return WithEdit;
}

export default withLineEdit;
