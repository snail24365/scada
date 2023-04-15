import React from 'react';
import { fromEvent, takeUntil } from 'rxjs';

const useDragMove = <Target extends Element, Container extends Element>(
  container: Container | null,
  moveCallback?: (moveX: number, moveY: number) => void,
  onMouseDown?: (e: React.MouseEvent<Target>) => boolean,
  onMouseMove?: (e: React.MouseEvent<Container>) => boolean,
  onMouseUp?: (e: React.MouseEvent<Container>) => boolean,
) => {
  let downX = 0;
  let downY = 0;
  if (!container) return undefined;

  const onMouseDownListener = (e: React.MouseEvent<Target>) => {
    onMouseDown?.(e);
    downX = e.clientX;
    downY = e.clientY;
    const mouseup$ = fromEvent<React.MouseEvent<Container>>(container, 'mouseup');
    const moveSub = fromEvent<React.MouseEvent<Container>>(container, 'mousemove')
      .pipe(takeUntil(mouseup$))
      .subscribe((e) => {
        const a = onMouseMove?.(e);
        if (a === false) return;

        const moveX = e.clientX - downX;
        const moveY = e.clientY - downY;
        moveCallback?.(moveX, moveY);
      });
    const upSub = fromEvent<React.MouseEvent<Container>>(container, 'mouseup').subscribe((e) => {
      onMouseUp?.(e);
      moveSub.unsubscribe();
      upSub.unsubscribe();
    });
  };
  return onMouseDownListener;
};

export default useDragMove;
