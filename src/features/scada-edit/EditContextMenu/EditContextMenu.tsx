import { darkBlue1 } from '@/assets/color';
import { useAppSelector } from '@/store/hooks';
import ReactDOM from 'react-dom';
import { useDispatch } from 'react-redux';
import { useRecoilValue } from 'recoil';
import { editContextMenuState } from '../atom/scadaEditSectionAtom';
import { deleteEntities } from '../slice/scadaEditSceneSlice';
import { getSelectedUUIDs } from '../slice/scadaEditSelectionSlice';
import EditContextMenuItem from './EditContextMenuItem';

type Props = {};

const EditContextMenu = ({}: Props) => {
  const editContextMenu = useRecoilValue(editContextMenuState);

  const { left, top, isOpen } = editContextMenu;
  const dispatch = useDispatch();
  const selectedUUIDs = useAppSelector(getSelectedUUIDs);

  const deleteSelected = () => {
    dispatch(deleteEntities(selectedUUIDs));
  };

  const contextMenu = isOpen ? (
    <ul
      css={{
        left,
        top,
        position: 'absolute',
        minWidth: 300,
        maxWidth: 500,
        overflow: 'hidden',
        padding: '8px 5px',
        backgroundColor: darkBlue1
      }}
    >
      <EditContextMenuItem onClick={deleteSelected} contents="Delete" />
    </ul>
  ) : (
    <></>
  );
  return ReactDOM.createPortal(contextMenu, document.getElementById('context-menu-layer') as HTMLElement);
};

export default EditContextMenu;
