import { isEquipmentPanelOpenState } from '@/features/scada/atom/scadaAtom';
import { MdOutlineFolderDelete } from 'react-icons/md';
import { useRecoilState } from 'recoil';

const EquipmentButton = () => {
  const [isPanelOpen, setPanelOpen] = useRecoilState(isEquipmentPanelOpenState);
  return (
    <div
      onClick={() => {
        setPanelOpen(!isPanelOpen);
      }}
      css={{ color: '#fff', display: 'flex', alignItems: 'center', cursor: 'pointer' }}
    >
      <MdOutlineFolderDelete />
      <span>Equipment</span>
    </div>
  );
};

export default EquipmentButton;
