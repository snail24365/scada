import React from 'react';
import { flexCenter } from '@/style/style';
import { DragDropProp } from '../DragDrop/DragDrop';
import { darkBlue } from '@/assets/color';
import { ChildrenWithProp } from '@/types/type';
import equipmentsMap from '@/features/scada/components/equipments/equipmentsMap';

type EquipmentDragDrops = ChildrenWithProp<DragDropProp & { type: keyof typeof equipmentsMap }>;

const EquipmentSection = ({ title, children }: { title: string; children: EquipmentDragDrops }) => {
  return (
    <div>
      <div css={{ color: '#fff' }}>{title}</div>
      <hr />
      <div
        css={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gridTemplateRows: 'repeat(auto-fill, 200px)',
          gap: 15,
          cursor: 'pointer'
        }}
      >
        {React.Children.map(children, (child, i) => {
          return <div css={[flexCenter, { backgroundColor: darkBlue, borderRadius: 12, marginTop: 15 }]}>{child}</div>;
        })}
      </div>
    </div>
  );
};

export default EquipmentSection;
