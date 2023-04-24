import { BBox, BoxEntityProps, StateSetter } from '@/type';
import React, { ComponentType, useContext, useEffect, useRef, useState } from 'react';
import { WithBoxEditContext } from './WithBoxEditContext';
import LinkArrow from './LinkArrow';
import MouseEventHandler from './MouseEventHandler';
import ScalePoints from './ScalePoints';
import Frame from './Frame';
import { EditViewportContext } from '../EditViewportContext';
import { useAppSelector } from '@/store/hooks';
import { selectSelectionLookup } from '../editViewportSlice';

function withBoxEdit<T extends BoxEntityProps>(WrappedComponent: (...args: any) => JSX.Element) {
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
