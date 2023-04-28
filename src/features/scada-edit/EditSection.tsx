import EditMenu from '@/features/scada-edit/Menu/EditMenu';
import EditViewport from './EditViewport/EditViewport';
import EquipmentPanel from './EquipmentPanel';
import { EditSectionContext } from './EditSectionContext';
import { useSetRecoilState } from 'recoil';
import { isEquipmentPanelOpenState } from '../scada/atom/scadaAtom';
import { useEffect } from 'react';

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
        <EditViewport resolutionX={800} resolutionY={600} />
      </div>
    </EditSectionContext.Provider>
  );
};

export default EditSection;
