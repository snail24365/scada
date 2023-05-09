import { darkBlue2 } from '@/assets/color';
import { EquipmentsType } from '@/features/scada/components/equipments/equipmentComponents';
import { flexCenter } from '@/style/style';
import { ChildrenWithProp } from '@/types/type';
import React from 'react';
import { DragDropProp } from '../DragDrop/DragDrop';

type EquipmentDragDrops = ChildrenWithProp<DragDropProp & { type: EquipmentsType }>;

const EquipmentSection = ({ title, children }: { title: string; children: EquipmentDragDrops }) => {
  return (
    <div>
      <div css={{ color: '#fff' }}>{title}</div>
      <hr />
      <div
        css={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gridTemplateRows: 'repeat(auto-fill, 130px)',
          gap: 15,
          cursor: 'pointer'
        }}
      >
        {React.Children.map(children, (child, i) => {
          return <div css={[flexCenter, { backgroundColor: darkBlue2, borderRadius: 12, marginTop: 15 }]}>{child}</div>;
        })}
      </div>
    </div>
  );
};

export default EquipmentSection;
