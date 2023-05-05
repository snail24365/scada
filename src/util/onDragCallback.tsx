import { Getter } from '@/types/type';
import React, { MouseEventHandler, RefObject } from 'react';
import { fromEvent, takeUntil } from 'rxjs';

export enum MouseButton {
  LEFT = 0,
  MIDDLE = 1,
  RIGHT = 2,
  BACK = 3,
  FORWARD = 4
}

export type TargetElement<T extends Element> = Getter<T | null> | RefObject<T> | null;

type DragOption<U extends Element, V extends Element, S extends Element> = {
  onMouseDown?: (e: React.MouseEvent) => boolean | void;
  onMouseMove?: (e: React.MouseEvent) => boolean | void;
  onMouseUp?: (e: React.MouseEvent) => void;
  onMouseLeave?: (e: React.MouseEvent) => void;
  mouseButton?: MouseButton;
  moveTarget: TargetElement<U>;
  upTarget?: TargetElement<S>;
  leaveTarget?: TargetElement<V>;
  isTerminateOnMouseLeave?: boolean;
};

/**
 *
 * @description this function can be used instead of useDrag for performance.
 *
 * @param option
 * @returns
 */
const onDragCallback = <U extends Element, V extends Element, S extends Element>(option: DragOption<U, V, S>) => {
  const { onMouseDown, onMouseMove, onMouseUp, onMouseLeave, moveTarget, upTarget, leaveTarget } = option;

  let mouseButton = option.mouseButton ?? MouseButton.LEFT;
  const onMouseDownListener: MouseEventHandler = (e) => {
    if (e.button !== mouseButton) return;

    const isTerminateOnMouseLeave = option.isTerminateOnMouseLeave ?? false;

    if (onMouseDown?.(e)) return;

    function unwrapTarget(target: TargetElement<Element> | undefined) {
      if (!target) return null;
      if (typeof target === 'function') return target();
      if ('current' in target) return target.current;
      return null;
    }

    const moveElement = unwrapTarget(moveTarget);
    if (!moveElement) {
      return;
    }

    const leaveElement = unwrapTarget(leaveTarget) ?? moveElement;
    const upElement = unwrapTarget(upTarget) ?? moveElement;

    const mouseup$ = fromEvent<React.MouseEvent<Element>>(upElement, 'mouseup');

    let isMouseLeave = false;
    const leaveSub = fromEvent<React.MouseEvent<Element>>(leaveElement, 'mouseleave').subscribe(() => {
      isMouseLeave = true;
      onMouseLeave?.(e);
    });

    const moveSub = fromEvent<React.MouseEvent<Element>>(moveElement, 'mousemove')
      .pipe(takeUntil(mouseup$))
      .subscribe((e) => {
        if (isMouseLeave && isTerminateOnMouseLeave) return;
        if (onMouseMove?.(e)) return;
      });

    const upSub = fromEvent<React.MouseEvent<Element>>(upElement, 'mouseup').subscribe((e) => {
      if (e.button !== mouseButton) return;
      moveSub.unsubscribe();
      upSub.unsubscribe();
      leaveSub.unsubscribe();
      if (onMouseUp?.(e)) return;
    });
  };
  return onMouseDownListener;
};

export default onDragCallback;
