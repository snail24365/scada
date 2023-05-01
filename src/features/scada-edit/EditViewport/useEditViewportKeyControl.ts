import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { deleteEntities } from '../slice/scadaEditSceneSlice';
import { getSelectedUUIDs } from '../slice/scadaEditSelectionSlice';

export const useEditViewportKeyControl = () => {
  const selectedEntitiesUUIDs = useAppSelector(getSelectedUUIDs);

  const dispatch = useAppDispatch();

  const onKeyDown: React.KeyboardEventHandler = (e) => {
    if (e.key === 'Delete' || e.key === 'Backspace') {
      dispatch(deleteEntities(selectedEntitiesUUIDs));
    }
  };

  return { onKeyDown };
};
