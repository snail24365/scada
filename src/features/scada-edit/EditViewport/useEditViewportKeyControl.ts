import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { deleteEntities, selectEditBoxes, selectEditLines } from './editSceneSlice';
import { selectSelectedEntitiesUUID } from '../scadaEditSlice';

export const useEditViewportKeyControl = () => {
  const selectedEntitiesUUIDs = useAppSelector(selectSelectedEntitiesUUID);

  const dispatch = useAppDispatch();

  const onKeyDown: React.KeyboardEventHandler = (e) => {
    if (e.key === 'Delete' || e.key === 'Backspace') {
      dispatch(deleteEntities(selectedEntitiesUUIDs));
    }
  };

  return { onKeyDown };
};
