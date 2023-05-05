import EditMenu from '@/features/scada-edit/Menu/EditMenu';
import { flexHorizontalCenter } from '@/style/style';
import { useEffect } from 'react';
import { useSetRecoilState } from 'recoil';
import { isEquipmentPanelOpenState } from '../scada/atom/scadaAtom';
import { EditSectionContext } from './EditSectionContext';
import EditViewport from './EditViewport/EditViewport';
import PropertyWindow from './PropertyWindow/PropertyWindow';

const EditSection = () => {
  const setIsEquipmentPanelOpen = useSetRecoilState(isEquipmentPanelOpenState);

  useEffect(() => {
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
    </EditSectionContext.Provider>
  );
};

export default EditSection;
