import { MouseButton } from '@/hooks/useDrag';
import { UUID } from '@/types/type';
import React from 'react';
import { useDispatch } from 'react-redux';
import { useSetRecoilState } from 'recoil';
import { editContextMenuState } from '../atom/scadaEditSectionAtom';
import { exclusiveSelect } from '../slice/scadaEditSelectionSlice';

const useContextMenuRightClick = (uuid: UUID) => {
  const setEditContextMenu = useSetRecoilState(editContextMenuState);

  const dispatch = useDispatch();

  const onMouseRightClick: React.MouseEventHandler = (e) => {
    if (e.button !== MouseButton.RIGHT) return;
    dispatch(exclusiveSelect({ uuid }));
    setEditContextMenu({
      left: e.clientX,
      top: e.clientY,
      isOpen: true
    });
    return;
  };

  return onMouseRightClick;
};

export default useContextMenuRightClick;
