import React, { RefObject } from 'react';
import { fromEvent, takeUntil } from 'rxjs';
import { Getter } from '../type';

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
  onMouseLeave?: (e: React.MouseEvent) => void;
  mouseButton?: MouseButton;
  moveElementRef?: React.RefObject<Element>;
  leaveElementRef?: React.RefObject<Element>;
  upElementRef?: React.RefObject<Element>;
};

type targetType<T extends Element> = Getter<T | null> | null | T | React.RefObject<T>;

const onDragCallback = <T extends Element>(target: targetType<T>, option: DragOption) => {
  let needTerminate: boolean | undefined | void = false;
  const { onMouseDown, onMouseMove, onMouseUp, onMouseLeave } = option;
  const mouseButton = option.mouseButton ?? MouseButton.LEFT;

  const onMouseDownListener = (e: React.MouseEvent<Element>) => {
    let targetElement = null;
    if (!target) {
      return;
    } else if (typeof target === 'function') {
      targetElement = target();
    } else if ('current' in target) {
      targetElement = target.current;
    }

    if (targetElement === null) {
      return;
    }

    if (!targetElement) return;

    if (e.button !== mouseButton) return;

    needTerminate = onMouseDown?.(e);
    if (needTerminate) return;

    const mouseup$ = fromEvent<React.MouseEvent<Element>>(targetElement, 'mouseup');

    let isMouseLeave = false;

    let dragLeaveElement = option.leaveElementRef?.current ?? targetElement;

    const leaveSub = fromEvent<React.MouseEvent<Element>>(dragLeaveElement, 'mouseleave').subscribe(() => {
      isMouseLeave = true;
      onMouseLeave?.(e);
    });

    let moveElement = option.moveElementRef?.current ?? targetElement;

    const moveSub = fromEvent<React.MouseEvent<Element>>(moveElement, 'mousemove')
      .pipe(takeUntil(mouseup$))
      .subscribe((e) => {
        if (isMouseLeave) return;
        needTerminate = onMouseMove?.(e);
        if (needTerminate) return;
      });

    let upElement = option.upElementRef?.current ?? targetElement;
    const upSub = fromEvent<React.MouseEvent<Element>>(upElement, 'mouseup').subscribe((e) => {
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

export default onDragCallback;
