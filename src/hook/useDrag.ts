import React from 'react';
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
};

const useDrag = <Target extends Element, Container extends Element>(container: Container | null, option: DragOption) => {
  if (!container) return undefined;
  const { onMouseDown, onMouseMove, onMouseUp } = option;
  const mouseButton = option.mouseButton ?? MouseButton.LEFT;
  let needTerminate: boolean | undefined | void = false;
  const onMouseDownListener = (e: React.MouseEvent<Target>) => {
    if (e.button !== mouseButton) return;
    needTerminate = onMouseDown?.(e);
    if (needTerminate) return;

    const mouseup$ = fromEvent<React.MouseEvent<Container>>(container, 'mouseup');

    let isMouseLeave = false;
    const leaveSub = fromEvent<React.MouseEvent<Container>>(container, 'mouseleave').subscribe(() => {
      isMouseLeave = true;
    });

    const moveSub = fromEvent<React.MouseEvent<Container>>(container, 'mousemove')
      .pipe(takeUntil(mouseup$))
      .subscribe((e) => {
        if (isMouseLeave) return;
        needTerminate = onMouseMove?.(e);
        if (needTerminate) return;
      });
    const upSub = fromEvent<React.MouseEvent<Container>>(container, 'mouseup').subscribe((e) => {
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
