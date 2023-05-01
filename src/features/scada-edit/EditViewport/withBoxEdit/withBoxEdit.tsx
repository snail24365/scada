import { useAppSelector } from '@/store/hooks';
import { BoxEntity } from '@/types/type';
import React, { useState } from 'react';
import Frame from './Frame';
import LinkArrow from './LinkArrow';
import MouseEventHandler from './MouseEventHandler';
import ScalePoints from './ScalePoints/ScalePoints';
import { WithBoxEditContext } from './WithBoxEditContext';

function withBoxEdit<T extends BoxEntity>(WrappedComponent: React.ComponentType<T>) {
  const WithEdit: React.FC<T> = (props) => {
    const [showArrow, setShowArrow] = useState(false);
    const [isBoxEditing, setIsBoxEditing] = useState(false);

    const isSelected = useAppSelector((state) => state.editViewport.selectionLookup[props.uuid]) ?? false;

    const componentProp = { ...props } as T;
    return (
      <WithBoxEditContext.Provider value={{ showArrow, setShowArrow, isBoxEditing, setIsBoxEditing, isSelected }}>
        <g
          onMouseEnter={() => {
            setShowArrow(true);
          }}
          onMouseLeave={() => {
            setShowArrow(false);
          }}
        >
          <WrappedComponent {...componentProp} />
          {isSelected && (
            <>
              <LinkArrow {...props} />
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
