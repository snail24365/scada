import { useAppSelector } from '@/store/hooks';
import { LineEntityProps } from '@/type';
import React, { ComponentType } from 'react';
import { isSelectedSelector } from '../editSceneSlice';
import EdgeControlPoint from './EdgeControlPoint';
import InnerControlWrapper from './InnerControlWrapper';

function withLineEdit<T extends LineEntityProps>(WrappedComponent: ComponentType<T>) {
  const WithEdit: React.FC<T> = (props) => {
    const lineUUID = props.uuid;
    const isSelected = useAppSelector(isSelectedSelector(lineUUID));
    const pointRadius = 4;
    return (
      <g>
        <WrappedComponent {...props} />
        <InnerControlWrapper points={props.points} uuid={lineUUID} pointRadius={pointRadius} />
        {isSelected && (
          <>
            <EdgeControlPoint
              points={props.points}
              uuid={props.uuid}
              radius={pointRadius}
              edge="start"
            />
            <EdgeControlPoint
              points={props.points}
              uuid={props.uuid}
              radius={pointRadius}
              edge="end"
            />
          </>
        )}
      </g>
    );
  };

  return WithEdit;
}

export default withLineEdit;
