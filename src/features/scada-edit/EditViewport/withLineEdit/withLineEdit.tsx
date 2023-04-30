import { LineState } from '@/types/type';
import React, { ComponentType } from 'react';
import EdgeControlPoint from './EdgeControlPoint';
import InnerControlWrapper from './InnerControlWrapper';
import useContextMenuRightClick from '../../hook/useContextMenuRightClick';

function withLineEdit<T extends LineState>(WrappedComponent: ComponentType<T>) {
  const WithEdit: React.FC<T> = (props) => {
    const { uuid, points } = props;
    const pointRadius = 4;

    const onMouseRightClick = useContextMenuRightClick(uuid);
    return (
      <g>
        <WrappedComponent {...props} />
        <g onMouseDown={onMouseRightClick}>
          <InnerControlWrapper points={points} uuid={uuid} pointRadius={pointRadius} />
          <EdgeControlPoint points={points} uuid={uuid} radius={pointRadius} edge="start" />
          <EdgeControlPoint points={points} uuid={uuid} radius={pointRadius} edge="end" />
        </g>
      </g>
    );
  };

  return WithEdit;
}

export default withLineEdit;
