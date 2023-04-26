import { flexCenter } from '@/style/style';
import { BBox } from '@/type';
import React, { MouseEventHandler, useContext } from 'react';
import { fromEvent, takeUntil } from 'rxjs';
import { EditViewportContext } from '../EditViewport/EditViewportContext';

const EntityDragDropItem = ({ children }: { children: React.ReactElement<BBox> }) => {
  const onMouseDown: MouseEventHandler<HTMLDivElement> = (e) => {
    const moveElement = document.body;
    const upElement = document.body;

    const stickyElement = React.cloneElement(children, { x: 0, y: 0, width: 50, height: 50 });

    const mouseup$ = fromEvent<React.MouseEvent<Element>>(upElement, 'mouseup');
    const moveSub = fromEvent<React.MouseEvent<Element>>(moveElement, 'mousemove')
      .pipe(takeUntil(mouseup$))
      .subscribe((e) => {
        // move
      });
    const upSub = fromEvent<React.MouseEvent<Element>>(upElement, 'mouseup').subscribe((e) => {
      moveSub.unsubscribe();
      upSub.unsubscribe();
      //up
    });
  };
  return (
    <div css={[flexCenter]} onMouseDown={onMouseDown}>
      {children}
    </div>
  );
};

export default EntityDragDropItem;
