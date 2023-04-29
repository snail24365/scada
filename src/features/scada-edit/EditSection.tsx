import EditMenu from '@/features/scada-edit/Menu/EditMenu';
import { useEffect } from 'react';
import { useSetRecoilState } from 'recoil';
import { isEquipmentPanelOpenState, resolutionState } from '../scada/atom/scadaAtom';
import { EditSectionContext } from './EditSectionContext';
import EditViewport from './EditViewport/EditViewport';

type Props = {};

const EditSection = (props: Props) => {
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
        <EditViewport />
      </div>
    </EditSectionContext.Provider>
  );
};

export default EditSection;
