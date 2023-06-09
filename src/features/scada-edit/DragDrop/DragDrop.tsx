import { scadaEditUtil } from '@/features/scada/atom/scadaAtom';
import useDrag from '@/hooks/useDrag';
import { useAppDispatch } from '@/store/hooks';
import { flexCenter } from '@/style/style';
import { Entity, Size } from '@/types/type';
import React, { useContext, useRef, useState } from 'react';
import { useRecoilValue } from 'recoil';
import { v4 as uuidv4 } from 'uuid';
import { EditSectionContext } from '../EditSectionContext';
import { addEntity } from '../slice/scadaEditSceneSlice';
import DragDropSticker from './DragDropSticker';
import { ScadaComponents, scadaPropertySchema } from '@/features/scada/components/scadaComponents';

export type DragDropProp = {
  component: React.ReactElement<Size & Omit<Entity, 'uuid'>>;
  stickerSize: number;
  type: ScadaComponents;
  dropIgnoreElements?: React.RefObject<Element>[];
};

const DragDrop = ({ component, stickerSize, type, dropIgnoreElements }: DragDropProp) => {
  const bodyRef = useRef<HTMLElement>(document.body);
  const [cursor, setCursor] = useState({ left: 0, top: 0 });
  const [stickerSizeState, setStickerSizeState] = useState({
    width: 0,
    height: 0
  });

  const stickerOffsetX = 10;
  const stickerOffsetY = 10;
  const zeroSize = { width: 0, height: 0 };

  const dispatch = useAppDispatch();
  const { getXY, reducedScale } = useRecoilValue(scadaEditUtil);
  const { rootSvgRef } = useContext(EditSectionContext);
  const updateCursor = (e: React.MouseEvent) => {
    setCursor({
      left: e.clientX + stickerOffsetX,
      top: e.clientY + stickerOffsetY
    });
  };

  const onDragMouseUp = (e: MouseEvent) => {
    if (dropIgnoreElements) {
      const isInIgnored = dropIgnoreElements.some((element) => element.current === e.target);
      if (isInIgnored) {
        setStickerSizeState(zeroSize);
        return;
      }
    }
    const clientX = e.clientX + stickerOffsetX;
    const clientY = e.clientY + stickerOffsetY;
    const { x, y } = getXY({
      clientX,
      clientY
    });

    const width = stickerSize * reducedScale.x;
    const height = stickerSize * (component.props.height / component.props.width) * reducedScale.y;

    const propertySchema = scadaPropertySchema[type];
    const defaultProperty: Record<string, any> = {};

    type propertyName = keyof typeof propertySchema;
    for (const key in propertySchema) {
      defaultProperty[key] = (propertySchema[key as propertyName] as any).default;
    }

    dispatch(
      addEntity({
        ...defaultProperty,
        ...component.props,
        uuid: uuidv4(),
        type,
        width,
        height,
        x,
        y
      })
    );
  };

  const onMouseDownDrag = useDrag({
    moveElementRef: bodyRef,
    onMouseDown: (e) => {
      updateCursor(e);

      const rootSvg = rootSvgRef.current;
      if (!rootSvg) return;

      rootSvg.addEventListener('mouseup', onDragMouseUp);
    },
    onMouseMove: (e) => {
      setStickerSizeState({
        width: stickerSize,
        height: stickerSize * (component.props.height / component.props.width)
      });
      updateCursor(e);
    },
    onMouseUp: (e) => {
      setStickerSizeState(zeroSize);
      const rootSvg = rootSvgRef.current;
      if (!rootSvg) return;
      rootSvg.removeEventListener('mouseup', onDragMouseUp);
    }
  });

  const stickerElement = React.cloneElement(component, {
    ...component.props,
    width: stickerSizeState.width,
    height: stickerSizeState.height
  });

  return (
    <div css={[flexCenter, { boxSizing: 'content-box' }]} onMouseDown={onMouseDownDrag}>
      {component}
      <DragDropSticker left={cursor.left} top={cursor.top} sticker={stickerElement} />
    </div>
  );
};

export default DragDrop;
