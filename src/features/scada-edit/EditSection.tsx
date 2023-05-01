import EditMenu from '@/features/scada-edit/Menu/EditMenu';
import { useEffect } from 'react';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { currentScadaPageIdState, isEquipmentPanelOpenState } from '../scada/atom/scadaAtom';
import { EditSectionContext } from './EditSectionContext';
import EditViewport from './EditViewport/EditViewport';
import PropertyModal from './PropertyModal/PropertyModal';
import { getService } from '@/service/api';
import { useAppDispatch } from '@/store/hooks';
import { updateEditScene } from './slice/scadaEditSceneSlice';
import { ScadaSceneState } from '@/types/type';

type Props = {};

const EditSection = (props: Props) => {
  const currentPageId = useRecoilValue(currentScadaPageIdState);
  const setIsEquipmentPanelOpen = useSetRecoilState(isEquipmentPanelOpenState);
  const dispatch = useAppDispatch();

  useEffect(() => {
    (async () => {
      const scene = (await getService(`/scene/${currentPageId}`)).data;
      dispatch(updateEditScene(scene as ScadaSceneState));
    })();
    setIsEquipmentPanelOpen(false);
  }, []);

  const initialContextValue = {
    rootSvgRef: { current: null },
    rootDivRef: { current: null }
  };
  return (
    <EditSectionContext.Provider value={initialContextValue}>
      <div style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
        <EditMenu />
        <EditViewport />
      </div>
      <PropertyModal />
    </EditSectionContext.Provider>
  );
};

export default EditSection;
