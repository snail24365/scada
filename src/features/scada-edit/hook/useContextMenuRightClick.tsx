import { MouseButton } from '@/hooks/useDrag';
import { useAppSelector } from '@/store/hooks';
import React from 'react';
import { exclusiveSelect, getSelectedUUIDs } from '../slice/scadaEditSelectionSlice';
import { useDispatch } from 'react-redux';
import { UUID } from '@/types/type';
import { useSetRecoilState } from 'recoil';
import { editContextMenuState } from '../atom/scadaEditSectionAtom';

const useContextMenuRightClick = (uuid: UUID) => {
  const selectedUUIDs = useAppSelector(getSelectedUUIDs);
  const setEditContextMenu = useSetRecoilState(editContextMenuState);

  const dispatch = useDispatch();

  const onMouseRightClick: React.MouseEventHandler = (e) => {
    if (e.button !== MouseButton.RIGHT) return;
    if (selectedUUIDs.length === 0) {
      dispatch(exclusiveSelect({ uuid }));
    }
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
