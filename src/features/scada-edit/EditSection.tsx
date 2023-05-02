import EditMenu from '@/features/scada-edit/Menu/EditMenu';
import { restSerivce } from '@/service/api';
import { useAppDispatch } from '@/store/hooks';
import { flexHorizontalCenter } from '@/style/style';
import { ScadaSceneState } from '@/types/type';
import { useEffect } from 'react';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { currentScadaPageIdState, isEquipmentPanelOpenState } from '../scada/atom/scadaAtom';
import { EditSectionContext } from './EditSectionContext';
import EditViewport from './EditViewport/EditViewport';
import { updateEditScene } from './slice/scadaEditSceneSlice';
import { darkBlue } from '@/assets/color';
import { Paper } from '@mui/material';
import PropertyWindow from './PropertyWindow';

type Props = {};

const EditSection = (props: Props) => {
  // const currentPageId = useRecoilValue(currentScadaPageIdState);
  const setIsEquipmentPanelOpen = useSetRecoilState(isEquipmentPanelOpenState);
  // const dispatch = useAppDispatch();

  useEffect(() => {
    // (async () => {
    //   const scene = (await restSerivce({ method: 'get', url: `/scene/${currentPageId}` })).data;
    //   dispatch(updateEditScene(scene as ScadaSceneState));
    // })();
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
        <div css={[flexHorizontalCenter, { position: 'relative', minHeight: 0, height: '100%', gap: 12 }]}>
          <EditViewport />
          <PropertyWindow />
        </div>
      </div>
      {/* <PropertyModal /> */}
    </EditSectionContext.Provider>
  );
};

export default EditSection;
