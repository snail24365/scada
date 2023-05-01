import { darkBlue2 } from '@/assets/color';
import { useAppSelector } from '@/store/hooks';
import ReactDOM from 'react-dom';
import { useDispatch } from 'react-redux';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { deleteEntities } from '../slice/scadaEditSceneSlice';
import { editContextMenuState, propertyModalState } from '../atom/scadaEditSectionAtom';
import EditContextMenuItem from './EditContextMenuItem';
import { getSelectedUUIDs } from '../slice/scadaEditSelectionSlice';

type Props = {};

const EditContextMenu = ({}: Props) => {
  const editContextMenu = useRecoilValue(editContextMenuState);
  const setProperyModal = useSetRecoilState(propertyModalState);

  const { left, top, isOpen } = editContextMenu;
  const dispatch = useDispatch();
  const selectedUUIDs = useAppSelector(getSelectedUUIDs);
  const isSingleItem = selectedUUIDs.length === 1;

  const deleteSelected = () => {
    dispatch(deleteEntities(selectedUUIDs));
  };

  const openPropertyModal = () => {
    setProperyModal({ isOpen: true });
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
        backgroundColor: darkBlue2
      }}
    >
      {isSingleItem && <EditContextMenuItem onClick={openPropertyModal} contents="Property Edit" />}
      <EditContextMenuItem onClick={deleteSelected} contents="Delete" />
    </ul>
  ) : (
    <></>
  );
  return ReactDOM.createPortal(contextMenu, document.getElementById('context-menu-layer') as HTMLElement);
};

export default EditContextMenu;
