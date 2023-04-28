import { Size } from '@/types/type';
import React from 'react';
import ReactDOM from 'react-dom';
type Props<T extends Size> = {
  left: number;
  top: number;
  sticker: React.ReactElement<T>;
};

const EntityDragDropSticker = <T extends Size>({ left, top, sticker }: Props<T>) => {
  return ReactDOM.createPortal(
    <div
      css={{
        position: 'absolute',
        left,
        top
      }}
    >
      {sticker}
    </div>,
    document.getElementById('drag-drop-layer') as HTMLElement
  );
};

export default EntityDragDropSticker;
