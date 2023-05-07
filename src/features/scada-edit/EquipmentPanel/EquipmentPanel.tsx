import { useRecoilState } from 'recoil';
import { isEquipmentPanelOpenState } from '../../scada/atom/scadaAtom';
import Converter from '../../scada/components/equipments/Converter';
import Gastank from '../../scada/components/equipments/Gastank';
import HeatExchanger from '../../scada/components/equipments/HeatExchanger';
import Pump1 from '../../scada/components/equipments/Pump1';
import Pump2 from '../../scada/components/equipments/Pump2';
import Watertank1 from '../../scada/components/equipments/Watertank1';
import Watertank2 from '../../scada/components/equipments/Watertank2';
import DragDrop from '../DragDrop/DragDrop';
import Panel from '../Panel';
import EquipmentSection from './EquipmentSection';

type Props = {};

const EquipmentPanel = (props: Props) => {
  const [isOpen, setOpen] = useRecoilState(isEquipmentPanelOpenState);
  const thumbnailSize = 100;
  const stickerSize = 150;
  const bbox = { x: 0, y: 0, width: thumbnailSize, height: thumbnailSize };
  const contents = (
    <div css={{ display: 'flex', flexDirection: 'column', gap: 30 }}>
      <EquipmentSection title="Pump">
        <DragDrop type="Pump1" component={<Pump1 {...bbox} />} stickerSize={stickerSize} />
        <DragDrop type="Pump2" component={<Pump2 {...bbox} />} stickerSize={stickerSize} />
      </EquipmentSection>
      <EquipmentSection title="Watertank">
        <DragDrop type="Watertank1" component={<Watertank1 {...bbox} />} stickerSize={stickerSize} />
        <DragDrop
          type="Watertank2"
          component={<Watertank2 {...bbox} percentage={0} value={0} />}
          stickerSize={stickerSize}
        />
      </EquipmentSection>
      <EquipmentSection title="Heat Exchanger">
        <DragDrop type="HeatExchanger" component={<HeatExchanger {...bbox} />} stickerSize={stickerSize} />
      </EquipmentSection>
      <EquipmentSection title="Gastank">
        <DragDrop type="Gastank" component={<Gastank {...bbox} />} stickerSize={stickerSize} />
      </EquipmentSection>
      <EquipmentSection title="Converter">
        <DragDrop type="Converter" component={<Converter {...bbox} />} stickerSize={stickerSize} />
      </EquipmentSection>
    </div>
  );
  return <Panel width={'max(min(400px, 20vw), 320px)'} isOpen={isOpen} setOpen={setOpen} contents={contents} />;
};

export default EquipmentPanel;
