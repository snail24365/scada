import { MouseEventHandler, RefObject, useRef, useState } from 'react';
import useRefObjectSync from './useRefObjectSync';
import { MouseButton } from './useDrag';

type UseDragProps = {
  onMouseMove?: (e: React.MouseEvent) => void | boolean;
  onMouseUp?: (e: React.MouseEvent) => void | boolean;
  onMouseDown?: (e: React.MouseEvent) => void | boolean;
  moveElementRef: RefObject<Element>;
  upElementRef?: RefObject<Element>;
  mouseButton?: MouseButton;
};

const useDrag = ({ mouseButton, upElementRef, moveElementRef, onMouseMove, onMouseUp, onMouseDown }: UseDragProps) => {
  mouseButton = mouseButton ?? MouseButton.LEFT;
  upElementRef = upElementRef ?? moveElementRef;

  const [dragState, setDragState] = useState({
    isMousePressed: false,
    isDragging: false
  });
  const dragStateRef = useRef(dragState);
  useRefObjectSync(dragStateRef, dragState);

  const leaveElementRef = moveElementRef;
  const onDragMouseLeave = (e: React.MouseEvent) => {};

  const onDragMouseMove = (e: React.MouseEvent) => {
    if (!dragStateRef.current.isMousePressed) return;
    if (onMouseMove?.(e) ?? false) return;
    setDragState((prev) => ({ ...prev, isDragging: true }));
  };

  const onDragMouseUp = (e: React.MouseEvent) => {
    const upElement = upElementRef?.current;
    const leaveElement = leaveElementRef.current;

    if (e.button !== mouseButton) return;
    if (onMouseUp?.(e) ?? false) return;
    if (!(upElement && leaveElement)) return;
    dragStateRef.current.isDragging = false;
    dragStateRef.current.isMousePressed = false;

    const moveElement = moveElementRef.current;
    upElement.removeEventListener('mouseup', onDragMouseUp as any);
    moveElement?.removeEventListener('mousemove', onDragMouseMove as any);
    leaveElement.removeEventListener('mouseleave', onDragMouseLeave as any);
  };

  const onDragMouseDown = (e: React.MouseEvent) => {
    const upElement = upElementRef?.current;
    const leaveElement = leaveElementRef.current;

    if (e.button !== mouseButton) return;
    if (onMouseDown?.(e) ?? false) return;
    if (!(upElement && leaveElement)) return;

    setDragState({ isMousePressed: true, isDragging: false });
    const moveElement = moveElementRef.current;
    upElement.addEventListener('mouseup', onDragMouseUp as any);
    moveElement?.addEventListener('mousemove', onDragMouseMove as any);
    leaveElement.addEventListener('mouseleave', onDragMouseLeave as any);
  };

  return onDragMouseDown;
};

export default useDrag;
