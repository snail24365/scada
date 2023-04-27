import { MouseEventHandler, RefObject, useRef, useState } from "react";
import useRefObjectSync from "./useRefObjectSync";

export enum MouseButton {
  LEFT = 0,
  MIDDLE = 1,
  RIGHT = 2,
  BACK = 3,
  FORWARD = 4,
}

type UseDragProps = {
  onMouseMove?: (e: React.MouseEvent) => void | boolean;
  onMouseUp?: (e: React.MouseEvent) => void | boolean;
  onMouseDown?: (e: React.MouseEvent) => void | boolean;
  containerRef: RefObject<Element>;
  upElementRef?: RefObject<Element>;
  mouseButton?: MouseButton;
};

const useDrag = ({
  mouseButton,
  upElementRef,
  containerRef,
  onMouseMove,
  onMouseUp,
  onMouseDown,
}: UseDragProps) => {
  mouseButton = mouseButton ?? MouseButton.LEFT;
  upElementRef = upElementRef ?? containerRef;

  const [dragState, setDragState] = useState({
    isMousePressed: false,
    isDragging: false,
  });
  const dragStateRef = useRef(dragState);
  useRefObjectSync(dragStateRef, dragState);

  const onDragMouseMove = (e: React.MouseEvent) => {
    console.log("move");
    if (!dragStateRef.current.isMousePressed) return;
    if (onMouseMove?.(e) ?? false) return;
    setDragState((prev) => ({ ...prev, isDragging: true }));
  };

  const onDragMouseUp = (e: React.MouseEvent) => {
    if (e.button !== mouseButton) return;
    if (onMouseUp?.(e) ?? false) return;
    setDragState({ isMousePressed: false, isDragging: false });
    const container = containerRef.current;

    // TODO : remove any type cast
    const upElement = upElementRef?.current;
    if (upElement) {
      upElement.removeEventListener("mouseup", onDragMouseUp as any);
    }
    container?.removeEventListener("mousemove", onDragMouseMove as any);
  };

  const onDragMouseDown = (e: React.MouseEvent) => {
    if (e.button !== mouseButton) return;
    if (onMouseDown?.(e) ?? false) return;
    setDragState({ isMousePressed: true, isDragging: false });
    const container = containerRef.current;

    // TODO : remove any type cast
    const upElement = upElementRef?.current;
    if (upElement) {
      upElement.addEventListener("mouseup", onDragMouseUp as any);
    }
    container?.addEventListener("mousemove", onDragMouseMove as any);
  };

  return onDragMouseDown;
};

export default useDrag;
