import { darkBlue } from '@/assets/color';
import { flexCenter } from '@/style/style';
import React from 'react';
import { useRecoilState } from 'recoil';
import { isEquipmentPanelOpenState } from '../../scada/atom/scadaAtom';
import Pump1 from '../../scada/components/equipments/Pump1';
import Pump2 from '../../scada/components/equipments/Pump2';
import Panel from '../Panel';
import DragDrop, { DragDropProp } from '../DragDrop/DragDrop';
import Watertank1 from '../../scada/components/equipments/Watertank1';
import Watertank2 from '../../scada/components/equipments/Watertank2';
import HeatExchanger from '../../scada/components/equipments/HeatExchanger';
import Gastank from '../../scada/components/equipments/Gastank';
import Converter from '../../scada/components/equipments/Converter';
import EquipmentSection from './EquipmentSection';

type Props = {};

const EquipmentPanel = (props: Props) => {
  const [isOpen, setOpen] = useRecoilState(isEquipmentPanelOpenState);
  const panelWidth = 500;

  const thumbnailSize = 100;

  const stickerSize = 150;
  const contents = (
    <div css={{ display: 'flex', flexDirection: 'column', gap: 30 }}>
      <EquipmentSection title="Pump">
        <DragDrop
          type="Pump1"
          component={<Pump1 width={thumbnailSize} height={thumbnailSize} />}
          stickerSize={stickerSize}
        />
        <DragDrop
          type="Pump2"
          component={<Pump2 width={thumbnailSize} height={thumbnailSize} />}
          stickerSize={stickerSize}
        />
      </EquipmentSection>
      <EquipmentSection title="Watertank">
        <DragDrop
          type="Watertank1"
          component={<Watertank1 width={thumbnailSize} height={thumbnailSize} />}
          stickerSize={stickerSize}
        />
        <DragDrop
          type="Watertank2"
          component={<Watertank2 width={thumbnailSize} height={thumbnailSize} />}
          stickerSize={stickerSize}
        />
      </EquipmentSection>
      <EquipmentSection title="Heat Exchanger">
        <DragDrop
          type="HeatExchanger"
          component={<HeatExchanger speed={2} width={thumbnailSize} height={thumbnailSize} />}
          stickerSize={stickerSize}
        />
      </EquipmentSection>
      <EquipmentSection title="Gastank">
        <DragDrop
          type="Gastank"
          component={<Gastank width={thumbnailSize} height={thumbnailSize} />}
          stickerSize={stickerSize}
        />
      </EquipmentSection>
      <EquipmentSection title="Converter">
        <DragDrop
          type="Converter"
          component={<Converter width={thumbnailSize} height={thumbnailSize} />}
          stickerSize={stickerSize}
        />
      </EquipmentSection>
    </div>
  );
  return <Panel isOpen={isOpen} panelWidth={panelWidth} setOpen={setOpen} contents={contents} />;
};

export default EquipmentPanel;
