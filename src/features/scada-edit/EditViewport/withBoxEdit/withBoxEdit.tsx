import { useAppSelector } from '@/store/hooks';
import { BoxEntityProps } from '@/type';
import React, { useState } from 'react';
import Frame from './Frame';
import LinkArrow from './LinkArrow';
import MouseEventHandler from './MouseEventHandler';
import ScalePoints from './ScalePoints/ScalePoints';
import { WithBoxEditContext } from './WithBoxEditContext';

function withBoxEdit<T extends BoxEntityProps>(WrappedComponent: React.ComponentType<any>) {
  const WithEdit: React.FC<T> = (props) => {
    const [showArrow, setShowArrow] = useState(false);
    const [isEditing, setIsEditing] = useState(false);

    const isSelected =
      useAppSelector((state) => state.editViewport.selectionLookup[props.uuid]) ?? false;

    const componentProp = { ...props } as T;
    return (
      <WithBoxEditContext.Provider
        value={{ showArrow, setShowArrow, isBoxEditing: isEditing, setIsBoxEditing: setIsEditing }}>
        <g
          onMouseEnter={() => {
            setShowArrow(true);
          }}
          onMouseLeave={() => {
            setShowArrow(false);
          }}>
          <WrappedComponent {...componentProp} />
          <LinkArrow {...props} />
          {isSelected && (
            <>
              <Frame {...props} />
              <ScalePoints {...props} />
            </>
          )}
          <MouseEventHandler {...props} />
        </g>
      </WithBoxEditContext.Provider>
    );
  };

  return WithEdit;
}

export default withBoxEdit;
