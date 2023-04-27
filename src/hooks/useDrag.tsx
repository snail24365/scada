import { MouseEventHandler, RefObject, useRef, useState } from 'react';
import useRefObjectSync from './useRefObjectSync';

type UseDragProps = {
  onMouseMove?: (e: React.MouseEvent) => void | boolean;
  onMouseUp?: (e: React.MouseEvent) => void | boolean;
  onMouseDown?: (e: React.MouseEvent) => void | boolean;
  containerRef: RefObject<Element>;
};

const useDrag = (props: UseDragProps) => {
  const [dragState, setDragState] = useState({
    isMousePressed: false,
    isDragging: false,
  });
  const dragStateRef = useRef(dragState);
  useRefObjectSync(dragStateRef, dragState);

  const onMouseMove = (e: React.MouseEvent) => {
    if (!dragStateRef.current.isMousePressed) return;
    if (props.onMouseMove?.(e) ?? false) return;
    setDragState((prev) => ({ ...prev, isDragging: true }));
  };

  const onMouseUp = (e: React.MouseEvent) => {
    if (props.onMouseUp?.(e) ?? false) return;
    setDragState({ isMousePressed: false, isDragging: false });
    const container = props.containerRef.current;
    // TODO : remove any type cast
    container?.removeEventListener('mouseup', onMouseUp as any);
    container?.removeEventListener('mousemove', onMouseMove as any);
  };

  const onMouseDown = (e: React.MouseEvent) => {
    if (props.onMouseDown?.(e) ?? false) return;
    setDragState({ isMousePressed: true, isDragging: false });
    const container = props.containerRef.current;
    // TODO : remove any type cast
    container?.addEventListener('mouseup', onMouseUp as any);
    container?.addEventListener('mousemove', onMouseMove as any);
  };

  return onMouseDown;
};

export default useDrag;
