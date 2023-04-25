import { useAppDispatch } from '@/store/hooks';
import { BoxEntityProps } from '@/type';
import onDragCallback from '@/util/onDragCallback';
import { useContext, useRef, useState } from 'react';
import { useRecoilValue } from 'recoil';
import { scadaEditUtil } from '@/features/scada/atom/scadaAtom';
import { translateEntity } from '../editSceneSlice';
import { exclusiveSelect } from '../editViewportSlice';
import { WithBoxEditContext } from './WithBoxEditContext';

const MouseEventHandler = ({ width, height, x, y, uuid }: BoxEntityProps) => {
  const ref = useRef<SVGRectElement>(null);
  const [cursor, setCursor] = useState('pointer');
  const { containerRef, viewbox, viewport, clamp } = useRecoilValue(scadaEditUtil);
  const { setIsBoxEditing: setIsEditing } = useContext(WithBoxEditContext);

  const dispatch = useAppDispatch();

  let downClientX = 0;
  let downClientY = 0;
  let downX = 0;
  let downY = 0;

  const onDrag = onDragCallback({
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
        translateEntity({
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
    onMouseLeave: (e) => {
      setCursor('pointer');
    },
    moveTarget: containerRef,
    leaveTarget: containerRef,
    isTerminateOnMouseLeave: false,
  });

  return (
    <rect
      ref={ref}
      onMouseDown={onDrag}
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
