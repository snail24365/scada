import EditMenu from '@/features/scada-edit/Menu/EditMenu';
import EditViewport from './EditViewport/EditViewport';
import EquipmentPanel from './EquipmentPanel';

type Props = {};

const EditSection = (props: Props) => {
  return (
    <div style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      <EditMenu />
      <EditViewport resolutionX={1200} resolutionY={900} />
      <EquipmentPanel />
    </div>
  );
};

export default EditSection;
