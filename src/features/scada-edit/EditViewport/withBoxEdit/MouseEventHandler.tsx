import { scadaEditUtil } from '@/features/scada/atom/scadaAtom';
import useDrag from '@/hooks/useDrag';
import { useAppDispatch } from '@/store/hooks';
import { BoxEntityProps } from '@/type';
import { useContext, useRef, useState } from 'react';
import { useRecoilValue } from 'recoil';
import { exclusiveSelect } from '../../scadaEditSlice';
import { translateBoxEntity } from '../editSceneSlice';
import { EditViewportContext } from '../EditViewportContext';
import { WithBoxEditContext } from './WithBoxEditContext';

const MouseEventHandler = ({ width, height, x, y, uuid }: BoxEntityProps) => {
  const ref = useRef<SVGRectElement>(null);
  const [cursor, setCursor] = useState('pointer');
  const { rootSvgRef: containerRef } = useContext(EditViewportContext);

  const { viewbox, viewport, clamp, getXY } = useRecoilValue(scadaEditUtil);
  const { setIsBoxEditing: setIsEditing } = useContext(WithBoxEditContext);

  const dispatch = useAppDispatch();

  let downClientX = 0;
  let downClientY = 0;
  let downX = 0;
  let downY = 0;

  const onMouseDownDrag = useDrag({
    onMouseDown: (e) => {
      const container = containerRef.current;
      if (!container) return;
      downClientX = e.clientX;
      downClientY = e.clientY;
      downX = x;
      downY = y;
      dispatch(exclusiveSelect({ uuid }));
      setIsEditing(true);
    },
    onMouseMove: (e) => {
      const container = containerRef.current;
      if (!container) return;
      setCursor('move');

      const dx = (e.clientX - downClientX) * (viewbox.width / viewport.resolutionX);
      const dy = (e.clientY - downClientY) * (viewbox.height / viewport.resolutionY);

      const newX = clamp(downX + dx);
      const newY = clamp(downY + dy);

      dispatch(
        translateBoxEntity({
          x: newX,
          y: newY,
          uuid,
        }),
      );
    },
    onMouseUp: (e) => {
      setCursor('pointer');
      setIsEditing(false);
    },
    containerRef,
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
