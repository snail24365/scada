import React, { RefObject } from 'react';
import { fromEvent, takeUntil } from 'rxjs';

export enum MouseButton {
  LEFT = 0,
  MIDDLE = 1,
  RIGHT = 2,
  BACK = 3,
  FORWARD = 4,
}

type DragOption = {
  onMouseDown?: (e: React.MouseEvent) => boolean | void;
  onMouseMove?: (e: React.MouseEvent) => boolean | void;
  onMouseUp?: (e: React.MouseEvent) => void;
  mouseButton?: MouseButton;
  moveElementRef?: React.RefObject<Element>;
  leaveElementRef?: React.RefObject<Element>;
};

const useDrag = <T extends Element>(target: React.RefObject<T>, option: DragOption) => {
  const targetElement = target.current;
  if (!targetElement) return;

  const { onMouseDown, onMouseMove, onMouseUp } = option;
  const mouseButton = option.mouseButton ?? MouseButton.LEFT;
  let needTerminate: boolean | undefined | void = false;
  const onMouseDownListener = (e: React.MouseEvent<Element>) => {
    if (e.button !== mouseButton) return;
    needTerminate = onMouseDown?.(e);
    if (needTerminate) return;

    const mouseup$ = fromEvent<React.MouseEvent<Element>>(targetElement, 'mouseup');

    let isMouseLeave = false;

    let dragLeaveElement = option.leaveElementRef?.current ?? targetElement;

    const leaveSub = fromEvent<React.MouseEvent<Element>>(dragLeaveElement, 'mouseleave').subscribe(() => {
      isMouseLeave = true;
    });

    let moveElement = option.moveElementRef?.current ?? targetElement;
    const moveSub = fromEvent<React.MouseEvent<Element>>(moveElement, 'mousemove')
      .pipe(takeUntil(mouseup$))
      .subscribe((e) => {
        if (isMouseLeave) return;
        needTerminate = onMouseMove?.(e);
        if (needTerminate) return;
      });
    const upSub = fromEvent<React.MouseEvent<Element>>(targetElement, 'mouseup').subscribe((e) => {
      if (e.button !== mouseButton) return;
      moveSub.unsubscribe();
      upSub.unsubscribe();
      leaveSub.unsubscribe();
      needTerminate = onMouseUp?.(e);
      if (needTerminate) return;
    });
  };
  return onMouseDownListener;
};

export default useDrag;
