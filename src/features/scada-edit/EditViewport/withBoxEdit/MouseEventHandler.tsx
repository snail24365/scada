import { scadaEditUtil } from '@/features/scada/atom/scadaAtom';
import useDrag from '@/hooks/useDrag';
import { useAppDispatch } from '@/store/hooks';
import { BoxEntityProps } from '@/types/type';
import { useContext, useRef, useState } from 'react';
import { useRecoilValue } from 'recoil';
import { exclusiveSelect } from '../../scadaEditSlice';
import { translateBoxEntity } from '../editSceneSlice';
import { EditViewportContext } from '../EditViewportContext';
import { WithBoxEditContext } from './WithBoxEditContext';
import { EditSectionContext } from '../../EditSectionContext';
import { Vector2 } from 'three';
import { mapVector2, toXY } from '@/util/util';

const MouseEventHandler = ({ width, height, x, y, uuid }: BoxEntityProps) => {
  const ref = useRef<SVGRectElement>(null);
  const [cursor, setCursor] = useState('pointer');
  const { rootSvgRef: containerRef } = useContext(EditSectionContext);

  const { clamp, getXY } = useRecoilValue(scadaEditUtil);
  const { setIsBoxEditing: setIsEditing } = useContext(WithBoxEditContext);

  const dispatch = useAppDispatch();

  const downXY = new Vector2(x, y);

  let downPoint = new Vector2();
  const onMouseDownDrag = useDrag({
    onMouseDown: (e) => {
      const container = containerRef.current;
      if (!container) return;
      downPoint = getXY(e);
      dispatch(exclusiveSelect({ uuid }));
      setIsEditing(true);
    },
    onMouseMove: (e) => {
      const container = containerRef.current;
      if (!container) return;
      setCursor('move');
      const movePoint = getXY(e);
      const delta = movePoint.sub(downPoint);
      const newXY = toXY(mapVector2(delta.add(downXY), clamp));

      dispatch(
        translateBoxEntity({
          ...newXY,
          uuid
        })
      );
    },
    onMouseUp: (e) => {
      setCursor('pointer');
      setIsEditing(false);
    },
    moveElementRef: containerRef
  });

  return (
    <rect
      ref={ref}
      onMouseDown={onMouseDownDrag}
      cursor={cursor}
      x={x}
      y={y}
      width={width}
      height={height}
      fill="transparent"
    />
  );
};

export default MouseEventHandler;
